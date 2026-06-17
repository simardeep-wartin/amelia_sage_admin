import type { NavigationItem, NavigationSection } from "@/types";

export interface INavigationService {
  getNavigationSections(): NavigationSection[];
  getNavigationItems(): NavigationItem[];
  getNavigationPayload(): { sections: NavigationSection[]; items: NavigationItem[] };
}
