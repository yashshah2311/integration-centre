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

import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export type RouteMeta = {
    label: string;
    icon: IconDefinition;
};

export const ROUTE_META: Record<string, RouteMeta> = {
    // settigs - organisation
    "/settings/manage": { label: "Manage", icon: faHouse },
    "/settings/users": { label: "Users", icon: faUsers },
    "/settings/tags": { label: "Tags", icon: faTag },
    "/settings/integrations": { label: "Integrations", icon: faPlug },
    // settigs - utilities
    "/settings/configuration": { label: "Configuration", icon: faGear },
    "/settings/hierarchy": { label: "Hierarchy", icon: faSitemap },
    "/settings/assets": { label: "Assets", icon: faBuilding },
    // carbon
    "/carbon/configuration": { label: "Configuration", icon: faGear },
    "/carbon/hierarchy": { label: "Hierarchy", icon: faSitemap },
    "/carbon/inventory-items": { label: "Inventory Items", icon: faBoxesStacked },
    "/carbon/emission-factors": { label: "Emission Factors", icon: faCloud },
    "/carbon/snapshots": { label: "Snapshots", icon: faCamera },
    // displays
    "/displays/manage": { label: "Manage", icon: faDesktop },
};