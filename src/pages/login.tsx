import { Alert, Button, Col, Form, Image, Input, Row } from 'antd';
import { motion } from 'framer-motion';
import logo from '../assets/images/logo.jpg';
import { useNavigate } from 'react-router-dom';
import OfflineLayout from '../layouts/offline.layout';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { loginUser } from '../redux/features/auth/auth.slice';
import { useEffect } from 'react';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { notify, status, signInRequired, user } = useAppSelector((state) => state.auth);

  const onFinish = (data: any) => {
    dispatch(
      loginUser({
        username: data.username,
        password: data.password,
      })
    );
  };

  useEffect(() => {
    if (!signInRequired && user._id) {
      navigate('/');
    }

    return () => {};
  }, [signInRequired, navigate]);

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <OfflineLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <div className='page login-page'>
          <div className='form-container'>
            <Image preview={false} src={logo} height={150} style={{ borderRadius: '50rem' }} />
            <h1 className='heading'>Administration Portal</h1>
            <h2 className='subheading'>Sign in to your account</h2>
            {notify && (
              <Alert type={notify.type} message={notify.message} banner style={{ width: '80%', margin: 'auto' }} />
            )}
            <Form
              // layout='vertical'
              name='basic'
              // labelCol={{ span: 8 }}
              // wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete='off'
              style={{}}>
              <Form.Item
                label='Username'
                name='username'
                rules={[{ required: true, message: 'Please input your username!' }]}>
                <Input />
              </Form.Item>

              <Form.Item
                label='Password'
                name='password'
                rules={[{ required: true, message: 'Please input your password!' }]}>
                <Input.Password />
              </Form.Item>

              <Form.Item>
                <Button type='primary' htmlType='submit' loading={status === 'Authenticating'}>
                  {status === 'Authenticating' ? 'Authenticating' : 'Submit'}
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
