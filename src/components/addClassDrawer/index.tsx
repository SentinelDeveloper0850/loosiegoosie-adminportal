import { Button, Drawer, Form, Input, Space } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { BASE_URL } from '../../app-constants';
import IAddClassDrawerProps from '../../interfaces/IAddClassDrawer';
import './style.scss';

const FormItem = Form.Item;

const AddClassDrawer = ({ isDrawerOpen, closeDrawer, updateList }: IAddClassDrawerProps) => {
  const [newClass, setNewClass] = useState({});

  const handleSave = async () => {
    await axios.post(`${BASE_URL}/api/classes`, newClass).then(response => {
      updateList(response.data.data);
    })
  };

  const handleNameChange = (e: any) => {
    let updatedClass = { ...newClass, name: e.target.value };
    setNewClass(updatedClass);
  };

  return (
    <Drawer
      className='add-class-drawer'
      title='Add Class'
      contentWrapperStyle={{ width: '25%' }}
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
          <Input onChange={handleNameChange} />
        </FormItem>
      </Form>
    </Drawer>
  );
};

export default AddClassDrawer;
