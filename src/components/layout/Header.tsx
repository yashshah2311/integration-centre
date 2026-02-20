import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faBell,
  faCircleQuestion,
} from "@fortawesome/free-solid-svg-icons";

import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { ROUTE_META } from "../../app/nav";
import { TenantSwitcher } from "../overlays/TenantSwitcher";
import { UserMenu } from "../overlays/UserMenu";

function getRouteMeta(pathname: string) {
  if (ROUTE_META[pathname]) return ROUTE_META[pathname];

  const hit = Object.keys(ROUTE_META)
    .sort((a, b) => b.length - a.length)
    .find((p) => pathname.startsWith(p));

  return hit ? ROUTE_META[hit] : null;
}

export function Header() {
  const { pathname } = useLocation();

  const routeMeta = useMemo(() => getRouteMeta(pathname), [pathname]);

  return (
    <header className="sticky top-0 z-20 h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
      {/* Left */}
      <div className="flex items-center gap-6 min-w-0">
        <TenantSwitcher />

        {routeMeta && (
          <div className="flex items-center gap-2 text-gray-800 font-semibold text-lg min-w-0">
            <FontAwesomeIcon icon={routeMeta.icon} className="text-[#6CB100]" />
            <span className="truncate">{routeMeta.label}</span>
          </div>
        )}
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <IconButton icon={faMagnifyingGlass} ariaLabel="Search" />

        <div className="relative">
          <IconButton icon={faBell} ariaLabel="Notifications" />
          <span className="absolute -top-1 -right-1 h-5 min-w-5 px-1 rounded-full bg-red-500 text-white text-[11px] flex items-center justify-center leading-none">
            3
          </span>
        </div>

        <IconButton icon={faCircleQuestion} ariaLabel="Help" />
        <UserMenu />
      </div>
    </header>
  );
}

function IconButton({
  icon,
  ariaLabel,
}: {
  icon: IconDefinition;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className="h-10 w-10 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 flex items-center justify-center"
    >
      <FontAwesomeIcon icon={icon} />
    </button>
  );
}