// policy-settings-updater.ts

// Types for the GraphQL operations
interface GetPolicySettingsInput {
  appIds: string[];
}

interface PolicySetting {
  policyId: string;
  policyName: string;
}

interface PolicySettingGroup {
  settings: PolicySetting[];
}

interface GetPolicySettingsResponse {
  getPolicySettings: PolicySettingGroup[];
}

interface PolicySettingInput {
  newOptionId?: string;
  oldOptionId?: string;
  policyId: string;
}

interface SetPolicySettingsInput {
  appIds: string[];
  policySettings: PolicySettingInput[];
}

interface SetPolicySettingsResponse {
  setPolicySettings: {
    hasModifiedSettings: boolean;
  };
}

async function promptForToken(): Promise<string> {
  const token = prompt("Please enter your authorization token:") ?? '';
  if (!token) {
    throw new Error("Authorization token is required");
  }
  return token;
}

async function getPolicySettings(appIds: string[], authToken: string): Promise<PolicySetting[]> {
  const query = `
    query GetPolicySettings($getPolicySettingsInput: GetPolicySettingsInput) {
      getPolicySettings(getPolicySettingsInput: $getPolicySettingsInput) {
        settings {
          policyId
          policyName
        }
      }
    }
  `;

  const variables = {
    getPolicySettingsInput: {
      appIds
    }
  };

  try {
    console.log('Making request with variables:', JSON.stringify(variables, null, 2));
    
    const response = await fetch('https://api.cloud.ox.security/api/policy-service', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({
        query,
        variables
      })
    });

    const jsonResponse = await response.json();
    console.log('Raw GraphQL Response:', JSON.stringify(jsonResponse, null, 2));

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    if (jsonResponse.errors) {
      throw new Error(`GraphQL Errors: ${JSON.stringify(jsonResponse.errors)}`);
    }

    // Check if the response has the expected structure
    if (!jsonResponse.data?.getPolicySettings) {
      throw new Error('Response missing getPolicySettings array');
    }

    // Flatten all settings arrays into a single array of policy settings
    const allSettings = jsonResponse.data.getPolicySettings.reduce((acc: PolicySetting[], group: PolicySettingGroup) => {
      return acc.concat(group.settings);
    }, []);

    console.log(`Found ${allSettings.length} total policy settings`);
    return allSettings;
  } catch (error) {
    console.error('Error fetching policy settings:', error);
    throw error;
  }
}

async function setPolicySettings(input: SetPolicySettingsInput, authToken: string): Promise<boolean> {
  const mutation = `
    mutation SetPolicySettings($policySettingsInput: PolicySettingsInput) {
      setPolicySettings(policySettingsInput: $policySettingsInput) {
        hasModifiedSettings
      }
    }
  `;

  try {
    const response = await fetch('https://api.cloud.ox.security/api/policy-service', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({
        query: mutation,
        variables: {
          policySettingsInput: input
        }
      })
    });

    const jsonResponse = await response.json();
    console.log('Raw GraphQL Mutation Response:', JSON.stringify(jsonResponse, null, 2));

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    if (jsonResponse.errors) {
      throw new Error(`GraphQL Errors: ${JSON.stringify(jsonResponse.errors)}`);
    }

    return jsonResponse.data.setPolicySettings.hasModifiedSettings;
  } catch (error) {
    console.error('Error setting policy settings:', error);
    throw error;
  }
}

function promptForAppId(): Promise<string[]> {
  const appId = prompt("Please enter the App ID:") ?? '';
  if (!appId) {
    throw new Error("App ID is required");
  }
  // Validate that the input contains only digits
  if (!/^\d+$/.test(appId)) {
    throw new Error("App ID must contain only numbers");
  }
  return [appId];
}

async function main() {
  try {
    // Prompt for authorization token
    console.log('Authentication required');
    const authToken = await promptForToken();
    
    const appIdArray = await promptForAppId();
    
    // Get policy settings
    console.log('Fetching policy settings...');
    const policySettings = await getPolicySettings(appIdArray, authToken);
    
    if (!policySettings || policySettings.length === 0) {
      throw new Error('No policy settings returned from the API');
    }

    console.log(`Retrieved ${policySettings.length} policy settings`);
    
    // Create policy settings input array
    // block: 1, monitor: 2, disable: 3
    const policySettingsInput: PolicySettingInput[] = policySettings.map(setting => ({
      newOptionId: '2',
      oldOptionId: '2',
      policyId: setting.policyId
    }));
    
    // Set policy settings for each policy ID
    console.log('Setting policy settings...');
    console.log(`Preparing to update ${policySettingsInput.length} policy settings`);
    
    const result = await setPolicySettings({
      appIds: appIdArray,
      policySettings: policySettingsInput
    }, authToken);
    
    console.log('Policy settings update complete.');
    console.log('Modified settings:', result);
  } catch (error) {
    console.error('Error in main process:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message);
      console.error('Stack trace:', error.stack);
    }
  }
}

// Run the program
if (import.meta.main) {
  main();
}