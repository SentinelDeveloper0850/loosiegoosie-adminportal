import { Button, Drawer, Form, Input, Space } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { BASE_URL } from '../../app-constants';
import IAddClassDrawerProps from '../../interfaces/IAddClassDrawer';
import './style.scss';

const FormItem = Form.Item;

const AddActivityDrawer = ({ isDrawerOpen, closeDrawer, updateList }: IAddClassDrawerProps) => {
  const [newActivity, setNewActivity] = useState({});

  const handleSave = async () => {
    await axios.post(`${BASE_URL}/api/activities`, newActivity).then((response) => {
      updateList(response.data.data);
    });
  };

  const handleInputChange = (key: string, value: any, parent?: string) => {
    let updatedActivity = { ...newActivity, [key]: value };
    setNewActivity(updatedActivity);
  };

  return (
    <Drawer
      className='add-activity-drawer'
      title='Add Activity'
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
          <Input onChange={(e: any) => handleInputChange('name', e.target.value)} />
        </FormItem>
        <FormItem label='Description'>
          <Input onChange={(e: any) => handleInputChange('description', e.target.value)} />
        </FormItem>
        <FormItem label='Instructor'>
          <Input onChange={(e: any) => handleInputChange('instructor', e.target.value)} />
        </FormItem>
        <FormItem label='Organisation'>
          <Input onChange={(e: any) => handleInputChange('organisation', e.target.value)} />
        </FormItem>
        <FormItem label='Venue'>
          <Input onChange={(e: any) => handleInputChange('venue', e.target.value)} />
        </FormItem>
        <FormItem label='Price'>
          <Input onChange={(e: any) => handleInputChange('price', Number(e.target.value))} />
        </FormItem>
      </Form>
    </Drawer>
  );
};

export default AddActivityDrawer;
