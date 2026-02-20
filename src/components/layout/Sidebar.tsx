import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faUsers,
  faTag,
  faPlug,
  faGear,
  faSitemap,
  faBuilding,
  faBoxesStacked,
  faCloud,
  faCamera,
  faDesktop,
} from "@fortawesome/free-solid-svg-icons";

const nav = [
  {
    section: "Organisation",
    items: [
      { label: "Manage", to: "/settings/manage", icon: faHouse },
      { label: "Users", to: "/settings/users", icon: faUsers },
      { label: "Tags", to: "/settings/tags", icon: faTag },
      { label: "Integrations", to: "/settings/integrations", icon: faPlug },
    ],
  },
  {
    section: "Utilities",
    items: [
      { label: "Configuration", to: "/settings/configuration", icon: faGear },
      { label: "Hierarchy", to: "/settings/hierarchy", icon: faSitemap },
      { label: "Assets", to: "/settings/assets", icon: faBuilding },
    ],
  },
  {
    section: "Carbon",
    items: [
      { label: "Configuration", to: "/carbon/configuration", icon: faGear },
      { label: "Hierarchy", to: "/carbon/hierarchy", icon: faSitemap },
      { label: "Inventory Items", to: "/carbon/inventory-items", icon: faBoxesStacked },
      { label: "Emission Factors", to: "/carbon/emission-factors", icon: faCloud },
      { label: "Snapshots", to: "/carbon/snapshots", icon: faCamera },
    ],
  },
  { section: "Displays", items: [{ label: "Manage", to: "/displays/manage", icon: faDesktop }] },
];

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <aside className="w-64 border-r border-gray-200 bg-white">
      <nav className="p-4 space-y-6">
        {nav.map((group) => (
          <div key={group.section}>
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-2 mb-2">
              {group.section}
            </div>

            <div className="space-y-1">
              {group.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={onNavigate}
                  className={({ isActive }) =>
                    [
                      "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                      isActive
                        ? "bg-[#6CB100] text-white font-medium"
                        : "text-gray-700 hover:bg-gray-100",
                    ].join(" ")
                  }
                >
                  {({ isActive }) => (
                    <>
                      <FontAwesomeIcon
                        icon={item.icon}
                        className={isActive ? "text-white text-base" : "text-[#6CB100] text-base"}
                      />
                      <span>{item.label}</span>
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}