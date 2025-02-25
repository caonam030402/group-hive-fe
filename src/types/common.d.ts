export interface IItemDropDown {
  id: string;
  name: string;
  icon: React.JSX.Element;
  shortcut?: string;
  action: () => void;
}
