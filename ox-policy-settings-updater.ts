// policy-settings-updater.ts

// Types for the GraphQL operations and policy settings
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

interface DefaultPolicySetting {
  policyName: string;
  options: {
    new: Array<{ optionId: string; optionName: string }>;
    old: Array<{ optionId: string; optionName: string }>;
  };
}

// Default policy settings
const DEFAULT_POLICY_SETTINGS: DefaultPolicySetting[] = [
  {
    "policyName": "Appoxalypse severity SAST issue",
    "options": {
      "new": [{ "optionId": "2", "optionName": "Monitor" }],
      "old": [{ "optionId": "3", "optionName": "Disable" }],
    },
  },
  {
    "policyName": "Critical severity SAST issue",
    "options": {
      "new": [{ "optionId": "2", "optionName": "Monitor" }],
      "old": [{ "optionId": "3", "optionName": "Disable" }],
    },
  },
  {
    "policyName": "High severity SAST issue",
    "options": {
      "new": [{ "optionId": "2", "optionName": "Monitor" }],
      "old": [{ "optionId": "3", "optionName": "Disable" }],
    },
  },
  {
    "policyName": "Medium severity SAST issue",
    "options": {
      "new": [{ "optionId": "2", "optionName": "Monitor" }],
      "old": [{ "optionId": "3", "optionName": "Disable" }],
    },
  },
  {
    "policyName": "Low severity SAST issue",
    "options": {
      "new": [{ "optionId": "2", "optionName": "Monitor" }],
      "old": [{ "optionId": "3", "optionName": "Disable" }],
    },
  },
  {
    "policyName": "Info severity SAST issue",
    "options": {
      "new": [{ "optionId": "3", "optionName": "Disable" }],
      "old": [{ "optionId": "3", "optionName": "Disable" }],
    },
  },
  {
    "policyName": "Appoxalypse severity secret in code",
    "options": {
      "new": [{ "optionId": "2", "optionName": "Monitor" }],
      "old": [{ "optionId": "3", "optionName": "Disable" }],
    },
  },
  {
    "policyName": "Critical severity secret in code",
    "options": {
      "new": [{ "optionId": "2", "optionName": "Monitor" }],
      "old": [{ "optionId": "3", "optionName": "Disable" }],
    },
  },
  {
    "policyName": "High severity secret in code",
    "options": {
      "new": [{ "optionId": "2", "optionName": "Monitor" }],
      "old": [{ "optionId": "3", "optionName": "Disable" }],
    },
  },
  {
    "policyName": "Medium severity secret in code",
    "options": {
      "new": [{ "optionId": "2", "optionName": "Monitor" }],
      "old": [{ "optionId": "3", "optionName": "Disable" }],
    },
  },
  {
    "policyName": "Low severity secret in code",
    "options": {
      "new": [{ "optionId": "2", "optionName": "Monitor" }],
      "old": [{ "optionId": "3", "optionName": "Disable" }],
    },
  },
  {
    "policyName": "Info severity secret in code",
    "options": {
      "new": [{ "optionId": "3", "optionName": "Disable" }],
      "old": [{ "optionId": "3", "optionName": "Disable" }],
    },
  },
  {
    "policyName": "Secret logging in code",
    "options": {
      "new": [{ "optionId": "2", "optionName": "Monitor" }],
      "old": [{ "optionId": "3", "optionName": "Disable" }],
    },
  },
  {
    "policyName": "PII logging in code",
    "options": {
      "new": [{ "optionId": "2", "optionName": "Monitor" }],
      "old": [{ "optionId": "3", "optionName": "Disable" }],
    },
  },
  {
    "policyName": "PII embedded in code",
    "options": {
      "new": [{ "optionId": "2", "optionName": "Monitor" }],
      "old": [{ "optionId": "3", "optionName": "Disable" }],
    },
  },
  {
    "policyName": "Appoxalypse severity vulnerable dependency (CVE) in code",
    "options": {
      "new": [{ "optionId": "2", "optionName": "Monitor" }],
      "old": [{ "optionId": "3", "optionName": "Disable" }],
    },
  },
  {
    "policyName": "Critical severity vulnerable dependency (CVE) in code",
    "options": {
      "new": [{ "optionId": "2", "optionName": "Monitor" }],
      "old": [{ "optionId": "3", "optionName": "Disable" }],
    },
  },
  {
    "policyName": "High severity vulnerable dependency (CVE) in code",
    "options": {
      "new": [{ "optionId": "2", "optionName": "Monitor" }],
      "old": [{ "optionId": "3", "optionName": "Disable" }],
    },
  },
  {
    "policyName": "Medium severity vulnerable dependency (CVE) in code",
    "options": {
      "new": [{ "optionId": "2", "optionName": "Monitor" }],
      "old": [{ "optionId": "3", "optionName": "Disable" }],
    },
  },
  {
    "policyName": "Low severity vulnerable dependency (CVE) in code",
    "options": {
      "new": [{ "optionId": "2", "optionName": "Monitor" }],
      "old": [{ "optionId": "3", "optionName": "Disable" }],
    },
  },
  {
    "policyName": "Info severity vulnerable dependency (CVE) in code",
    "options": {
      "new": [{ "optionId": "3", "optionName": "Disable" }],
      "old": [{ "optionId": "3", "optionName": "Disable" }],
    },
  },
  {
    "policyName":
      "Appoxalypse severity vulnerable dependency (CVE) in DockerFile base image",
    "options": {
      "new": [{ "optionId": "2", "optionName": "Monitor" }],
      "old": [{ "optionId": "3", "optionName": "Disable" }],
    },
  },
  {
    "policyName":
      "Critical severity vulnerable dependency (CVE) in DockerFile base image",
    "options": {
      "new": [{ "optionId": "2", "optionName": "Monitor" }],
      "old": [{ "optionId": "3", "optionName": "Disable" }],
    },
  },
  {
    "policyName":
      "High severity vulnerable dependency (CVE) in DockerFile base image",
    "options": {
      "new": [{ "optionId": "2", "optionName": "Monitor" }],
      "old": [{ "optionId": "3", "optionName": "Disable" }],
    },
  },
  {
    "policyName":
      "Medium severity vulnerable dependency (CVE) in DockerFile base image",
    "options": {
      "new": [{ "optionId": "2", "optionName": "Monitor" }],
      "old": [{ "optionId": "3", "optionName": "Disable" }],
    },
  },
  {
    "policyName":
      "Low severity vulnerable dependency (CVE) in DockerFile base image",
    "options": {
      "new": [{ "optionId": "2", "optionName": "Monitor" }],
      "old": [{ "optionId": "3", "optionName": "Disable" }],
    },
  },
  {
    "policyName":
      "Info severity vulnerable dependency (CVE) in DockerFile base image",
    "options": {
      "new": [{ "optionId": "3", "optionName": "Disable" }],
      "old": [{ "optionId": "3", "optionName": "Disable" }],
    },
  },
  {
    "policyName": "Typosquatting dependency in code",
    "options": {
      "new": [{ "optionId": "2", "optionName": "Monitor" }],
      "old": [{ "optionId": "3", "optionName": "Disable" }],
    },
  },
  {
    "policyName": "Dependency Confusion: Organization scope in code",
    "options": {
      "new": [{ "optionId": "2", "optionName": "Monitor" }],
      "old": [{ "optionId": "3", "optionName": "Disable" }],
    },
  },
  {
    "policyName": "Dependency Confusion: Private package in code",
    "options": {
      "new": [{ "optionId": "2", "optionName": "Monitor" }],
      "old": [{ "optionId": "3", "optionName": "Disable" }],
    },
  },
  {
    "policyName": "Unapproved license used by direct dependency in code",
    "options": {
      "new": [{ "optionId": "2", "optionName": "Monitor" }],
      "old": [{ "optionId": "3", "optionName": "Disable" }],
    },
  },
  {
    "policyName": "Deprecated direct dependency in code",
    "options": {
      "new": [{ "optionId": "2", "optionName": "Monitor" }],
      "old": [{ "optionId": "3", "optionName": "Disable" }],
    },
  },
  {
    "policyName": "Outdated direct dependency in code",
    "options": {
      "new": [{ "optionId": "3", "optionName": "Disable" }],
      "old": [{ "optionId": "3", "optionName": "Disable" }],
    },
  },
  {
    "policyName": "Unpopular direct dependency in code",
    "options": {
      "new": [{ "optionId": "3", "optionName": "Disable" }],
      "old": [{ "optionId": "3", "optionName": "Disable" }],
    },
  },
  {
    "policyName": "Unapproved license used by indirect dependency in code",
    "options": {
      "new": [{ "optionId": "3", "optionName": "Disable" }],
      "old": [{ "optionId": "3", "optionName": "Disable" }],
    },
  },
  {
    "policyName": "Deprecated indirect dependency in code",
    "options": {
      "new": [{ "optionId": "3", "optionName": "Disable" }],
      "old": [{ "optionId": "3", "optionName": "Disable" }],
    },
  },
  {
    "policyName": "Outdated indirect dependency in code",
    "options": {
      "new": [{ "optionId": "3", "optionName": "Disable" }],
      "old": [{ "optionId": "3", "optionName": "Disable" }],
    },
  },
  {
    "policyName": "Unpopular indirect dependency in code",
    "options": {
      "new": [{ "optionId": "3", "optionName": "Disable" }],
      "old": [{ "optionId": "3", "optionName": "Disable" }],
    },
  },
  {
    "policyName": "Appoxalypse severity IaC issue",
    "options": {
      "new": [{ "optionId": "2", "optionName": "Monitor" }],
      "old": [{ "optionId": "3", "optionName": "Disable" }],
    },
  },
  {
    "policyName": "Critical severity IaC issue",
    "options": {
      "new": [{ "optionId": "2", "optionName": "Monitor" }],
      "old": [{ "optionId": "3", "optionName": "Disable" }],
    },
  },
  {
    "policyName": "High severity IaC issue",
    "options": {
      "new": [{ "optionId": "2", "optionName": "Monitor" }],
      "old": [{ "optionId": "3", "optionName": "Disable" }],
    },
  },
  {
    "policyName": "Medium severity IaC issue",
    "options": {
      "new": [{ "optionId": "2", "optionName": "Monitor" }],
      "old": [{ "optionId": "3", "optionName": "Disable" }],
    },
  },
  {
    "policyName": "Low severity IaC issue",
    "options": {
      "new": [{ "optionId": "2", "optionName": "Monitor" }],
      "old": [{ "optionId": "3", "optionName": "Disable" }],
    },
  },
  {
    "policyName": "Info severity IaC issue",
    "options": {
      "new": [{ "optionId": "3", "optionName": "Disable" }],
      "old": [{ "optionId": "3", "optionName": "Disable" }],
    },
  },
  {
    "policyName": "Appoxalypse severity workflow security issue",
    "options": {
      "new": [{ "optionId": "2", "optionName": "Monitor" }],
      "old": [{ "optionId": "3", "optionName": "Disable" }],
    },
  },
  {
    "policyName": "Critical severity workflow security issue",
    "options": {
      "new": [{ "optionId": "2", "optionName": "Monitor" }],
      "old": [{ "optionId": "3", "optionName": "Disable" }],
    },
  },
  {
    "policyName": "High severity workflow security issue",
    "options": {
      "new": [{ "optionId": "2", "optionName": "Monitor" }],
      "old": [{ "optionId": "3", "optionName": "Disable" }],
    },
  },
  {
    "policyName": "Medium severity workflow security issue",
    "options": {
      "new": [{ "optionId": "2", "optionName": "Monitor" }],
      "old": [{ "optionId": "3", "optionName": "Disable" }],
    },
  },
  {
    "policyName": "Low severity workflow security issue",
    "options": {
      "new": [{ "optionId": "2", "optionName": "Monitor" }],
      "old": [{ "optionId": "3", "optionName": "Disable" }],
    },
  },
  {
    "policyName": "Info severity workflow security issue",
    "options": {
      "new": [{ "optionId": "2", "optionName": "Monitor" }],
      "old": [{ "optionId": "3", "optionName": "Disable" }],
    },
  },
  {
    "policyName": "Secret echoed in workflow console",
    "options": {
      "new": [{ "optionId": "2", "optionName": "Monitor" }],
      "old": [{ "optionId": "3", "optionName": "Disable" }],
    },
  },
  {
    "policyName": "Deprecated command in workflow",
    "options": {
      "new": [{ "optionId": "2", "optionName": "Monitor" }],
      "old": [{ "optionId": "3", "optionName": "Disable" }],
    },
  },
  {
    "policyName": "CI/CD context values in workflow",
    "options": {
      "new": [{ "optionId": "2", "optionName": "Monitor" }],
      "old": [{ "optionId": "3", "optionName": "Disable" }],
    },
  },
  {
    "policyName": "Incorrect storage of secret in GitHub Action ",
    "options": {
      "new": [{ "optionId": "2", "optionName": "Monitor" }],
      "old": [{ "optionId": "3", "optionName": "Disable" }],
    },
  },
  {
    "policyName": "Excessive permissions in workflow file",
    "options": {
      "new": [{ "optionId": "2", "optionName": "Monitor" }],
      "old": [{ "optionId": "3", "optionName": "Disable" }],
    },
  },
  {
    "policyName": "Unpinned (SHA) Third-Party Actions in GitHub",
    "options": {
      "new": [{ "optionId": "2", "optionName": "Monitor" }],
      "old": [{ "optionId": "3", "optionName": "Disable" }],
    },
  },
];

type PolicyOption = "block" | "monitor" | "disable";

const POLICY_OPTION_IDS: Record<PolicyOption, string> = {
  block: "1",
  monitor: "2",
  disable: "3",
};

function promptForToken(): Promise<string> {
  const token = prompt("Please enter your authorization token:") ?? "";
  if (!token) {
    throw new Error("Authorization token is required");
  }
  return token;
}

async function getPolicySettings(
  appIds: string[],
  authToken: string,
): Promise<PolicySetting[]> {
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
      appIds,
    },
  };

  try {
    /*    console.log(
      "Making request with variables:",
      JSON.stringify(variables, null, 2),
    );
    */
    const response = await fetch(
      "https://api.cloud.ox.security/api/policy-service",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          query,
          variables,
        }),
      },
    );

    const jsonResponse = await response.json();
    //    console.log("Raw GraphQL Response:", JSON.stringify(jsonResponse, null, 2));

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    if (jsonResponse.errors) {
      throw new Error(`GraphQL Errors: ${JSON.stringify(jsonResponse.errors)}`);
    }

    if (!jsonResponse.data?.getPolicySettings) {
      throw new Error("Response missing getPolicySettings array");
    }

    const allSettings = jsonResponse.data.getPolicySettings.reduce(
      (acc: PolicySetting[], group: PolicySettingGroup) => {
        return acc.concat(group.settings);
      },
      [],
    );

    console.log(`Found ${allSettings.length} total policy settings`);
    return allSettings;
  } catch (error) {
    console.error("Error fetching policy settings:", error);
    throw error;
  }
}

async function setPolicySettings(
  input: SetPolicySettingsInput,
  authToken: string,
): Promise<boolean> {
  const mutation = `
    mutation SetPolicySettings($policySettingsInput: PolicySettingsInput) {
      setPolicySettings(policySettingsInput: $policySettingsInput) {
        hasModifiedSettings
      }
    }
  `;

  try {
    const response = await fetch(
      "https://api.cloud.ox.security/api/policy-service",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          query: mutation,
          variables: {
            policySettingsInput: input,
          },
        }),
      },
    );

    const jsonResponse = await response.json();
    /*    console.log(
      "Raw GraphQL Mutation Response:",
      JSON.stringify(jsonResponse, null, 2),
    );
    */
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    if (jsonResponse.errors) {
      throw new Error(`GraphQL Errors: ${JSON.stringify(jsonResponse.errors)}`);
    }

    return jsonResponse.data.setPolicySettings.hasModifiedSettings;
  } catch (error) {
    console.error("Error setting policy settings:", error);
    throw error;
  }
}

function promptForAppId(): Promise<string[]> {
  const appId = prompt("Please enter the App ID:") ?? "";
  if (!appId) {
    throw new Error("App ID is required");
  }
  // Validate that the input contains only digits
  if (!/^\d+$/.test(appId)) {
    throw new Error("App ID must contain only numbers");
  }
  return [appId];
}

function promptForPolicyOption(
  promptMessage: string,
): Promise<PolicyOption> {
  const userInput = prompt(promptMessage)?.toLowerCase();

  if (!userInput) {
    throw new Error("Policy setting is required");
  }

  if (!["block", "monitor", "disable"].includes(userInput)) {
    throw new Error(
      "Invalid policy setting. Please choose 'block', 'monitor', or 'disable'",
    );
  }

  return userInput as PolicyOption;
}

function promptForAction(): Promise<"custom" | "reset"> {
  const userInput = prompt(
    "Would you like to (1) set custom policy settings or (2) reset to defaults? Enter 1 or 2:",
  );

  if (!userInput) {
    throw new Error("Action selection is required");
  }

  if (!["1", "2"].includes(userInput)) {
    throw new Error(
      "Please enter either '1' for custom settings or '2' for reset to defaults",
    );
  }

  return userInput === "1" ? "custom" : "reset";
}

async function main() {
  try {
    // Prompt for authorization token
    console.log("Authentication required");
    const authToken = await promptForToken();

    const appIdArray = await promptForAppId();

    // Get current policy settings
    console.log("Fetching policy settings...");
    const policySettings = await getPolicySettings(appIdArray, authToken);

    if (!policySettings || policySettings.length === 0) {
      throw new Error("No policy settings returned from the API");
    }

    console.log(`Retrieved ${policySettings.length} policy settings`);

    // Prompt for action (custom or reset)
    const action = await promptForAction();

    let policySettingsInput: PolicySettingInput[];

    if (action === "custom") {
      // Prompt for new policy options
      console.log("Choose policy settings for new and existing issues");
      const newIssuesOption = await promptForPolicyOption(
        "Please choose a policy setting for NEW issues (block/monitor/disable):",
      );
      const oldIssuesOption = await promptForPolicyOption(
        "Please choose a policy setting for EXISTING issues (block/monitor/disable):",
      );

      policySettingsInput = policySettings.map((setting) => ({
        newOptionId: POLICY_OPTION_IDS[newIssuesOption],
        oldOptionId: POLICY_OPTION_IDS[oldIssuesOption],
        policyId: setting.policyId,
      }));

      console.log("Setting custom policy settings...");
      console.log(`- New issues: "${newIssuesOption}" mode`);
      console.log(`- Existing issues: "${oldIssuesOption}" mode`);
    } else {
      // Reset to defaults
      console.log("Resetting to default policy settings...");
      policySettingsInput = policySettings.map((setting) => {
        const defaultSetting = DEFAULT_POLICY_SETTINGS.find(
          (def) => def.policyName === setting.policyName,
        );

        if (!defaultSetting) {
          console.warn(
            `No default setting found for policy: ${setting.policyName}`,
          );
          return {
            newOptionId: "2", // Default to "monitor" if no default found
            oldOptionId: "3", // Default to "disable" if no default found
            policyId: setting.policyId,
          };
        }

        return {
          newOptionId: defaultSetting.options.new[0].optionId,
          oldOptionId: defaultSetting.options.old[0].optionId,
          policyId: setting.policyId,
        };
      });
    }

    // Set policy settings
    const result = await setPolicySettings({
      appIds: appIdArray,
      policySettings: policySettingsInput,
    }, authToken);

    console.log("Policy settings update complete.");
    console.log("Modified settings:", result);
  } catch (error) {
    console.error("Error in main process:", error);
    if (error instanceof Error) {
      console.error("Error details:", error.message);
      console.error("Stack trace:", error.stack);
    }
  }
}

// Run the program
if (import.meta.main) {
  main();
}
