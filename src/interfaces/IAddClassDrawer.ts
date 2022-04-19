export default interface IAddClassDrawerProps {
  isDrawerOpen: boolean;
  closeDrawer: () => void;
  updateList: (item: any) => void;
}