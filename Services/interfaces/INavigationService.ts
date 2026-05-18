import type { NavigationItem, NavigationSection } from "@/Services/navigationService";

export interface INavigationService {
  getNavigationSections(): NavigationSection[];
  getNavigationItems(): NavigationItem[];
  getNavigationPayload(): { sections: NavigationSection[]; items: NavigationItem[] };
}
