import { Image, Layout } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import IMainLayoutProps from '../interfaces/IMainLayout';
import './main.layout.scss';
import logo from '../assets/images/logo.jpg';
import { APP_NAME } from '../constants';

const Sider = Layout.Sider;
const Header = Layout.Header;
const Content = Layout.Content;

const MainLayout = ({ children }: IMainLayoutProps) => {
  const { pathname: path } = useLocation();
  const navigate = useNavigate();

  const handleSignOut = () => {
    navigate('/login');
  };

  return (
    <Layout className='online-layout'>
      <Header>
        <span>{APP_NAME}</span>
      </Header>
      <Layout>
        <Sider>
          <nav>
            <ul>
              <div className='user-account-holder'>
                <Image preview={false} src={logo} height={120} />
                <div className='user-content'>
                  <span className='username'>Given Somdaka</span>
                  <span className='status'>online</span>
                </div>
              </div>
              <Link to='/'>
                <li className={path === '/' ? 'active' : ''}>Dashboard</li>
              </Link>
              <Link to='/catalogues'>
                <li className={path === '/catalogues' ? 'active' : ''}>Catalogues</li>
              </Link>
              <Link to='/categories'>
                <li className={path === '/categories' ? 'active' : ''}>Categories</li>
              </Link>
              <Link to='/products'>
                <li className={path === '/products' ? 'active' : ''}>Products</li>
              </Link>
              <Link to='/orders'>
                <li className={path === '/orders' ? 'active' : ''}>Orders</li>
              </Link>
            </ul>
            <ul>
              <li className='action-danger' onClick={handleSignOut}>
                Sign Out
              </li>
            </ul>
          </nav>
        </Sider>
        <Content>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
