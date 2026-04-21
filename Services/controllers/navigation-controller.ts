import { getNavigationItems, getNavigationSections } from "@/Services/services/navigation-service";

export function getNavigationPayload() {
  return {
    sections: getNavigationSections(),
    items: getNavigationItems(),
  };
}
