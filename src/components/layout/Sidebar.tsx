import { NavLink } from "react-router-dom";

const nav = [
  { section: "Organisation", items: [
    { label: "Manage", to: "/settings/manage" },
    { label: "Users", to: "/settings/users" },
    { label: "Tags", to: "/settings/tags" },
    { label: "Integrations", to: "/settings/integrations" },
  ]},
  { section: "Utilities", items: [
    { label: "Configuration", to: "/settings/configuration" },
    { label: "Hierarchy", to: "/settings/hierarchy" },
    { label: "Assets", to: "/settings/assets" },
  ]},
  { section: "Carbon", items: [
    { label: "Configuration", to: "/carbon/configuration" },
    { label: "Hierarchy", to: "/carbon/hierarchy" },
    { label: "Inventory Items", to: "/carbon/inventory-items" },
    { label: "Emission Factors", to: "/carbon/emission-factors" },
    { label: "Snapshots", to: "/carbon/snapshots" },
]},
  { section: "Displays", items: [
    { label: "Manage", to: "/displays/manage" },    
  ]},
];

export function Sidebar() {
  return (
    <aside className="w-64 border-r bg-white hidden md:block">
      <div className="h-16 px-4 flex items-center border-b">
        <div className="font-semibold">App</div>
      </div>

      <nav className="p-3 space-y-5">
        {nav.map((group) => (
          <div key={group.section}>
            <div className="text-xs font-medium text-gray-500 px-2 mb-2">
              {group.section}
            </div>

            <div className="space-y-1">
              {group.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    [
                      "block rounded px-3 py-2 text-sm",
                      isActive
                        ? "bg-green-100 text-green-800 font-medium"
                        : "text-gray-700 hover:bg-gray-100",
                    ].join(" ")
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}