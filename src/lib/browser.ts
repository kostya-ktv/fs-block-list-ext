export type NetRule = chrome.declarativeNetRequest.Rule;
export const NetRuleActionType = chrome.declarativeNetRequest.RuleActionType;
export const NetRuleResourceType = chrome.declarativeNetRequest.ResourceType;

export const createBrowserTab = (URL?: string) => {
  chrome.tabs.create({ url: URL });
};

export const setNetRules = async (rules: NetRule[]) => {
  const oldRules = await chrome.declarativeNetRequest.getDynamicRules();
  const oldRulesIDs = oldRules.map((el) => el.id);

  await chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: oldRulesIDs,
    addRules: rules,
  });
};

export const setBrowserInterval = async (
  name: string,
  bg: () => void,
  timeout: number,
) => {
  await chrome.alarms.create(name, {
    delayInMinutes: timeout / (1000 * 60),
    periodInMinutes: timeout / (1000 * 60),
  });

  chrome.alarms.onAlarm.addListener((alarm) => {
    if (name === alarm.name) {
      bg();
    }
  });
};

export const AddInstallListener = (callback: () => Promise<any>) => {
  chrome.runtime.onInstalled.addListener(async ({ reason }) => {
    console.log("reason", reason);
    //TODO
    // if (reason !== "install") {
    //   return;
    // }
    await callback();
  });
};
