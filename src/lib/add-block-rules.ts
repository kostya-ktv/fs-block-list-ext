import {
  BlockItemType,
  accountControllerGetAccount,
  authControllerGetSession,
  blockListControllerGetBlockList,
} from "@/lib/api/generated";
import {
  NetRule,
  NetRuleActionType,
  NetRuleResourceType,
  setBrowserInterval,
  setNetRules,
} from "@/lib/browser";

export const startUpdateBlockRules = () => {
  setBrowserInterval(
    "update-block-rules",
    async () => {
      const isAuth = await authControllerGetSession().then(
        () => true,
        () => false,
      );
      if (isAuth) {
        await setNetRules([]);
      }
      const isBlockingEnabled = await accountControllerGetAccount().then(
        (r) => r.isBlockingEnabled,
      );
      if (!isBlockingEnabled) {
        return await setNetRules([]);
      }

      setNetRules([]);
    },
    5000,
  );
};

const getBlockListNetRules = async () => {
  const blocklist = await blockListControllerGetBlockList();
  return blocklist.items
    .filter((item) => item.type === BlockItemType.Website)
    .map(
      (item): NetRule => ({
        id: item.id,
        action: { type: NetRuleActionType.BLOCK },
        condition: item.data.startsWith("regexp:")
          ? {
              regexFilter: item.data.replace("regexp:", ""),
              resourceTypes: [NetRuleResourceType.MAIN_FRAME],
            }
          : {
              urlFilter: item.data,
              resourceTypes: [NetRuleResourceType.MAIN_FRAME],
            },
      }),
    );
};
