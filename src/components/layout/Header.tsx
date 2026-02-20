import { TenantSwitcher } from "../overlays/TenantSwitcher";
import { UserMenu } from "../overlays/UserMenu";

export function Header() {
  return (
    <header className="h-16 border-b bg-white px-6 flex items-center justify-between">
      <div className="text-sm text-gray-600">
        Settings /{" "}
        <span className="text-gray-900 font-medium">Integrations</span>
      </div>

      <div className="flex items-center gap-3">
        <TenantSwitcher />
        <UserMenu />
      </div>
    </header>
  );
}
