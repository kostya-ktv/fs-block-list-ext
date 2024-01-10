import { startUpdateBlockRules } from "@/lib/add-block-rules";
import { AddInstallListener } from "@/lib/browser";

AddInstallListener(async () => {
  startUpdateBlockRules();
});
