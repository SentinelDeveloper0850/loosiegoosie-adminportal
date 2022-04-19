import { Button, Form, Image, Input } from 'antd';
import { motion } from 'framer-motion';
import logo from '../assets/images/logo-dark.jpg';
import { useNavigate } from 'react-router-dom';
import OfflineLayout from '../layouts/offline.layout';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/');
  };

  return (
    <OfflineLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <div className='page login-page'>
          <div className='form-container'>
            <Image preview={false} src={logo} height={150} style={{ borderRadius: '50rem' }} />
            <h1 className='heading'>Administration Portal</h1>
            <h2 className='subheading'>Sign in to your account</h2>
            <Form action='#' layout='vertical'>
              <Form.Item label='Username'>
                <Input placeholder='user@domain.com' />
              </Form.Item>
              <Form.Item label='Password'>
                <Input placeholder='*****' />
              </Form.Item>
              <Form.Item>
                <Button type='primary' block onClick={handleSignIn}>
                  Sign in
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </motion.div>
    </OfflineLayout>
  );
};

export default LoginPage;
