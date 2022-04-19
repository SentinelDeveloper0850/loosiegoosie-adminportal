import { Button, Drawer, Form, Input, Space } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { BASE_URL } from '../../constants';
import IAddClassDrawerProps from '../../interfaces/IAddClassDrawer';
import './style.scss';

const FormItem = Form.Item;

const AddBroadcastDrawer = ({ isDrawerOpen, closeDrawer, updateList }: IAddClassDrawerProps) => {
  const [newBroadcastMessage, setNewBroadcastMessage] = useState<any>({});

  const handleSave = async () => {
    await axios.post(`${BASE_URL}/api/broadcasts`, newBroadcastMessage).then((response) => {
      updateList(response.data.data);
    });
  };

  const handleInputChange = (key: string, value: string) => {
    let updatedBroadcastMessage = { ...newBroadcastMessage, [key]: value };
    setNewBroadcastMessage(updatedBroadcastMessage);
  };

  return (
    <Drawer
      className='add-class-drawer'
      title='Add Class'
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
        <FormItem label='Title'>
          <Input value={newBroadcastMessage.title} onChange={(e) => handleInputChange('title', e.target.value)} />
        </FormItem>
        <FormItem label='Body'>
          <Input.TextArea
            value={newBroadcastMessage.body}
            onChange={(e) => handleInputChange('body', e.target.value)}
          />
        </FormItem>
      </Form>
    </Drawer>
  );
};

export default AddBroadcastDrawer;
