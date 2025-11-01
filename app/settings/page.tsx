import { dalRequireAuthRedirect } from "@/dal/helpers";
import SettingsPage from "./SettingsPage";

export default async function Settings () {
   await dalRequireAuthRedirect();
   return <SettingsPage />;
}