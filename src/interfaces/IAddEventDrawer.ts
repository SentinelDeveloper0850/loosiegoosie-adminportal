export default interface IAddEventDrawerProps {
  isDrawerOpen: boolean;
  closeDrawer: () => void;
  updateEvents: (event: any) => void;
}