export default interface IProps {
  isDrawerOpen: boolean;
  closeDrawer: () => void;
  updateList: (item?: any) => void;
}