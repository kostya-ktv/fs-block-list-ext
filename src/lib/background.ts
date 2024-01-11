import { startUpdateBlockRules } from "@/lib/add-block-rules";
import { AddInstallListener } from "@/lib/browser";

console.log("background worker run");
AddInstallListener(async () => {
  console.log("AddInstallListener");
  startUpdateBlockRules();
});
