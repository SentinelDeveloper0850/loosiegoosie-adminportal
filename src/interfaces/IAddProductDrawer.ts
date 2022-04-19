export default interface IAddProductDrawerProps {
  isDrawerOpen: boolean;
  closeDrawer: () => void;
  updateList: (item: any) => void;
  categories?: any;
  catalogues?: any;
}