import { Button, Drawer, Form, Input, Space } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { BASE_URL } from '../../app-constants';
import IProps from './props';
import './style.scss';

const FormItem = Form.Item;

const CreateClientDrawer = ({ isDrawerOpen, closeDrawer, updateList }: IProps) => {
  const [modelInstance, setModelInstance] = useState<any>({});

  const handleSave = async () => {
    await axios.post(`${BASE_URL}/api/client`, modelInstance).then((response) => {
      console.log('response :>> ', response);
      updateList();
    });
  };

  const handleInputChange = (key: string, value: any, parent?: string) => {
    let updatedChild = { ...modelInstance, [key]: value };
    setModelInstance(updatedChild);
  };

  return (
    <Drawer
      className='add-model-drawer'
      title={`Add Client`}
      contentWrapperStyle={{ width: '40%' }}
      visible={isDrawerOpen}
      destroyOnClose
      footer={
        <Space>
          <Button type='default' danger onClick={() => closeDrawer()}>
            Cancel
          </Button>
          <Button type='primary' onClick={handleSave}>
            Save
          </Button>
        </Space>
      }
      onClose={() => closeDrawer()}>
      <Form layout='vertical'>
        <FormItem label='Name'>
          <Input onChange={(e: any) => handleInputChange('name', e.target.value)} />
        </FormItem>
        <FormItem label='Physical Address'>
          <Input onChange={(e: any) => handleInputChange('address', e.target.value)} />
        </FormItem>
        <FormItem label='Email Address'>
          <Input onChange={(e: any) => handleInputChange('email', e.target.value)} />
        </FormItem>
        <FormItem label='Phone Number'>
          <Input onChange={(e: any) => handleInputChange('phone', e.target.value)} />
        </FormItem>
        <FormItem label='Contact Name'>
          <Input onChange={(e: any) => handleInputChange('contact', e.target.value)} />
        </FormItem>
      </Form>
    </Drawer>
  );
};

export default CreateClientDrawer;
