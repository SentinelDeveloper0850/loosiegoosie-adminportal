export default interface IProps {
  modelName: string;
  model: any;
  isDrawerOpen: boolean;
  closeDrawer: () => void;
  updateList: (item?: any) => void;
}