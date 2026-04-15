export type NavigationItem = {
  label: string;
  href: string;
};

export type NavigationSection = {
  title: string;
  items: NavigationItem[];
};
