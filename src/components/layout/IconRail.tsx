import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolderOpen,
  faThumbsUp,
  faFileLines,
} from "@fortawesome/free-regular-svg-icons";
import {
  faGear,
  faGauge,
  faTree,
  faWrench,
  faClipboardCheck,
} from "@fortawesome/free-solid-svg-icons";

type RailItem = {
  key: string;
  label: string;
  icon: import("@fortawesome/fontawesome-svg-core").IconDefinition;
};

const ITEMS: RailItem[] = [
  { key: "insights", label: "Insights", icon: faGauge },
  { key: "collect", label: "Collect", icon: faFolderOpen },
  { key: "reviews", label: "Reviews", icon: faThumbsUp },
  { key: "carbon", label: "Carbon", icon: faTree },
  { key: "utilities", label: "Utilities", icon: faWrench },
  { key: "reports", label: "Reports", icon: faFileLines },
  { key: "actions", label: "Actions", icon: faClipboardCheck },
];

export function IconRail() {
  const activeKey = "settings";

  return (
    <aside
      className={[
        "w-[92px] min-w-[92px] h-screen",
        "bg-gradient-to-b from-[#111B2B] to-[#0B1220]",
        "border-r border-white/10",
        "flex flex-col items-center",
        "py-5",
        "shrink-0",
      ].join(" ")}
    >
      {/* Logo */}
      <div className="pt-2 pb-6">
        <img
          src="/vite.svg"
          alt="Brand Logo"
          className="w-10 h-10 object-contain opacity-95"
          draggable={false}
        />
      </div>

      {/* Rail items */}
      <div className="flex flex-col items-center gap-6">
        {ITEMS.map((item) => (
          <button
            key={item.key}
            type="button"
            className={[
              "group",
              "w-full",
              "flex flex-col items-center justify-center",
              "gap-1.5",
              "text-[#C9D2E3]",
              "opacity-90 hover:opacity-100",
              "select-none",
            ].join(" ")}
            aria-label={item.label}
          >
            <div
              className={[
                "h-8 w-8",
                "flex items-center justify-center",
                "rounded-full",
                "group-hover:bg-white/5",
              ].join(" ")}
            >
              <FontAwesomeIcon icon={item.icon} className="text-[22px]" />
            </div>

            <div className="text-[12px] leading-none tracking-wide">
              {item.label}
            </div>
          </button>
        ))}
      </div>

      {/* Settings */}
      <div className="mt-auto pb-3 w-full flex flex-col items-center gap-1.5">
        <button
          type="button"
          className="group w-full flex flex-col items-center justify-center gap-1.5 select-none"
          aria-label="Settings"
        >
          <div
            className={[
              "h-9 w-9",
              "flex items-center justify-center",
              "rounded-full",
              activeKey === "settings" ? "text-lime-400" : "text-[#C9D2E3]",
              "group-hover:bg-white/5",
            ].join(" ")}
          >
            <FontAwesomeIcon icon={faGear} className="text-[22px]" />
          </div>

          <div
            className={[
              "text-[12px] leading-none tracking-wide",
              activeKey === "settings" ? "text-lime-400" : "text-[#C9D2E3]",
            ].join(" ")}
          >
            Settings
          </div>
        </button>
      </div>
    </aside>
  );
}
