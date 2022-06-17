import { Divider, Image, Layout } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import IMainLayoutProps from '../interfaces/IMainLayout';
import './main.layout.scss';
import logo from '../assets/images/logo.jpg';
import { APP_NAME } from '../app-constants';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { signOut } from '../redux/features/auth/auth.slice';
import { useEffect } from 'react';

const Sider = Layout.Sider;
const Header = Layout.Header;
const Content = Layout.Content;

const MainLayout = ({ children }: IMainLayoutProps) => {
  const { signInRequired, user, isAdmin } = useAppSelector((state) => state.auth);
  const { pathname: path } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (navigate) if (signInRequired) navigate('/login');

    return () => {};
  }, [signInRequired, navigate]);

  const handleSignOut = () => {
    dispatch(signOut());
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
              <Link to='/clients'>
                <li style={{ borderTop: '1px solid #3d3d3d' }} className={path === '/clients' ? 'active' : ''}>
                  Clients
                </li>
              </Link>
              <Link to='/orders'>
                <li className={path === '/orders' ? 'active' : ''}>Orders</li>
              </Link>
              <Link to='/quotations'>
                <li className={path === '/quotations' ? 'active' : ''}>Quotations</li>
              </Link>
              <Link to='/invoices'>
                <li className={path === '/invoices' ? 'active' : ''}>Invoices</li>
              </Link>
            </ul>
            <ul>
              {isAdmin && (
                <Link to='/settings'>
                  <li className={path === '/settings' ? 'active' : ''}>Settings</li>
                </Link>
              )}
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
