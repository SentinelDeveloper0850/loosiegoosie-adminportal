import { MailOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, Divider, Form, Input, InputNumber, PageHeader, Row, Space, Tabs } from 'antd';
import { motion } from 'framer-motion';
import MainLayout from '../layouts/main.layout';
import { useAppDispatch } from '../redux/hook';

const { TabPane } = Tabs;

const SettingsPage = () => {
  const dispatch = useAppDispatch();

  const onFinish = (data: any) => {
    console.log('Form data :>> ', data);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <MainLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <div className='page settings-page'>
          <PageHeader
            title='Settings'
            extra={[
              <Space>
                <Button type='primary' htmlType='submit'>
                  Save Changes
                </Button>
              </Space>,
            ]}
            subTitle='Configure all settings regarding your company'
          />
          <Divider />
          <Form
            layout='vertical'
            name='basic'
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete='off'
            style={{}}>
            <Tabs defaultActiveKey='2'>
              <TabPane tab={<span></span>} key='1'>
                <Divider />
                <h3>General Settings</h3>
                <GeneralSettings />
                <Divider />
                <h3>Quirc Settings</h3>
                <QuircSettings />
              </TabPane>
            </Tabs>
          </Form>
        </div>
      </motion.div>
    </MainLayout>
  );
};

const GeneralSettings = () => (
  <Row gutter={16}>
    <Col span={3}>
      <Form.Item label='Default Markup' name='markup'>
        <InputNumber step={5} defaultValue={30} min={30} addonAfter='%' style={{ width: '100%' }} />
      </Form.Item>
    </Col>
    <Col span={3}>
      <Form.Item label='VAT Rate' name='vat'>
        <InputNumber step={1} defaultValue={15} min={0} addonAfter='%' style={{ width: '100%' }} />
      </Form.Item>
    </Col>
  </Row>
);

const handleChange = (key: string, value: any) => {
  console.log(key, value);
};

const QuircSettings = () => (
  <Row gutter={16}>
    <Col span={6}>
      <Form.Item label='Quotation Notification Subject' name='quotation_email_subject'>
        <Input addonAfter={<MailOutlined />} />
      </Form.Item>
      <Checkbox defaultChecked onChange={({ target }) => handleChange('send_quotation_email_oncreate', target.checked)}>
        Automatically send email when quotation is created
      </Checkbox>
    </Col>
    <Col span={6}>
      <Form.Item label='Invoice Notification Subject' name='invoice_email_subject'>
        <Input addonAfter={<MailOutlined />} />
      </Form.Item>
      <Checkbox defaultChecked onChange={({ target }) => handleChange('send_invoice_email_oncreate', target.checked)}>
        Automatically send email when invoice is created
      </Checkbox>
    </Col>
    <Col span={6}>
      <Form.Item label='Receipt Notification Subject' name='receipt_email_subject'>
        <Input addonAfter={<MailOutlined />} />
      </Form.Item>
      <Checkbox defaultChecked onChange={({ target }) => handleChange('send_receipt_email_oncreate', target.checked)}>
        Automatically send email when receipt is created
      </Checkbox>
    </Col>
    <Col span={6}>
      <Form.Item label='Credit Note Notification Subject' name='credit_note_email_subject'>
        <Input addonAfter={<MailOutlined />} />
      </Form.Item>
      <Checkbox
        defaultChecked
        onChange={({ target }) => handleChange('send_credit_note_email_oncreate', target.checked)}>
        Automatically send email when credit note is created
      </Checkbox>
    </Col>
  </Row>
);

export default SettingsPage;
