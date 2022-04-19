export default interface IAddChildDrawerProps {
  isDrawerOpen: boolean;
  closeDrawer: () => void;
  updateList: (item: any) => void;
  classDetails: any;
}