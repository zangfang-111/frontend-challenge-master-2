type MenuItem = {
  url: string;
  label: string;
};

export type NavigationPropsType = {
  mainMenu: Array<MenuItem>;
  isPipelineFeature: boolean;
};

export type HamburgerButtonPropsType = {
  handleMobileMenuClick: () => void;
};