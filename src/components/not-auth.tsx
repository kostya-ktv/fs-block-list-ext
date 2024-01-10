import { Button } from "@/components/ui/button";
import { createBrowserTab } from "@/lib/browser";
import { CONSTANTS } from "@/lib/constants";
import { EnterIcon } from "@radix-ui/react-icons";

export const NotAuth = () => {
  const openTab = () => createBrowserTab(CONSTANTS.ADMIN_FE_URL_SIGN_IN);
  return (
    <div className="flex flex-col gap-y-2">
      <p>You are not authenticated</p>
      <Button variant="outline" onClick={() => openTab()}>
        <EnterIcon />
        Login
      </Button>
    </div>
  );
};
