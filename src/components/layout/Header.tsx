import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
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

export function Header({ onOpenSidebar }: { onOpenSidebar?: () => void }) {
  const { pathname } = useLocation();

  const routeMeta = useMemo(() => getRouteMeta(pathname), [pathname]);

  return (
    <header className="sticky top-0 z-20 bg-white border-b border-gray-200">
      {/* MOBILE */}
      <div className="px-3 py-2 sm:hidden">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <button
              type="button"
              onClick={onOpenSidebar}
              className="h-10 w-10 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center justify-center"
              aria-label="Open sidebar"
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
            {routeMeta && (
              <div className="flex items-center gap-2 min-w-0">
                <FontAwesomeIcon
                  icon={routeMeta.icon}
                  className="text-[#6CB100]"
                />
                <span className="font-semibold text-gray-900 truncate">
                  {routeMeta.label}
                </span>
              </div>
            )}
          </div>
          <UserMenu />
        </div>

        <div className="mt-2 flex items-center gap-2">
          <div className="flex-1 min-w-[160px]">
            <TenantSwitcher />
          </div>
          <IconButton icon={faMagnifyingGlass} ariaLabel="Search" />
          <div className="relative">
            <IconButton icon={faBell} ariaLabel="Notifications" />
            <span className="absolute -top-1 -right-1 h-5 min-w-5 px-1 rounded-full bg-red-500 text-white text-[11px] flex items-center justify-center leading-none">
              3
            </span>
          </div>
          <IconButton icon={faCircleQuestion} ariaLabel="Help" />
        </div>
      </div>

      {/* DESKTOP */}
      <div className="hidden sm:flex h-16 px-4 md:px-6 items-center justify-between">
        <div className="flex items-center gap-4 md:gap-6 min-w-0">
          <button
            type="button"
            onClick={onOpenSidebar}
            className="md:hidden h-10 w-10 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center justify-center"
            aria-label="Open sidebar"
          >
            <FontAwesomeIcon icon={faBars} />
          </button>

          <TenantSwitcher />

          {routeMeta && (
            <div className="flex items-center gap-2 text-gray-800 font-semibold text-lg min-w-0">
              <FontAwesomeIcon icon={routeMeta.icon} className="text-[#6CB100]" />
              <span className="truncate">{routeMeta.label}</span>
            </div>
          )}
        </div>

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