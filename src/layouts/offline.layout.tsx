import { Layout } from 'antd';
import IMainLayoutProps from '../interfaces/IMainLayout';
import './main.layout.scss';

const Content = Layout.Content;

const OfflineLayout = ({ children }: IMainLayoutProps) => {
  return (
    <Layout className="offline-layout">
      <Content>{children}</Content>
    </Layout>
  );
};

export default OfflineLayout;
