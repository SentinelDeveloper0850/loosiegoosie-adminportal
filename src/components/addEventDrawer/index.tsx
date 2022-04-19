import { Button, Col, DatePicker, Drawer, Form, Input, Row, Space } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { BASE_URL } from '../../constants';
import IAddEventDrawerProps from '../../interfaces/IAddEventDrawer';
import './style.scss';

const FormItem = Form.Item;

const AddEventDrawer = ({ isDrawerOpen, closeDrawer, updateEvents }: IAddEventDrawerProps) => {
  const [newEvent, setNewEvent] = useState({});

  const handleSaveEvent = async () => {
    await axios.post(`${BASE_URL}/api/events`, newEvent).then(response => {
      updateEvents(response.data.data);
    })
  };

  const handleNameChange = (e: any) => {
    let updatedEvent = { ...newEvent, name: e.target.value };
    setNewEvent(updatedEvent);
  };

  const handleDescriptionChange = (e: any) => {
    let updatedEvent = { ...newEvent, description: e.target.value };
    setNewEvent(updatedEvent);
  };

  const handlePriceChange = (e: any) => {
    let updatedEvent = { ...newEvent, price: Number(e.target.value) };
    setNewEvent(updatedEvent);
  };

  const handleDateChange = (_date: any, dateString: string) => {
    let updatedEvent = { ...newEvent, date: dateString };
    setNewEvent(updatedEvent);
  };

  return (
    <Drawer
      className='add-event-drawer'
      title='Add Event'
      contentWrapperStyle={{ width: '25%' }}
      visible={isDrawerOpen}
      destroyOnClose
      footer={
        <Space>
          <Button type='default' danger onClick={() => closeDrawer()}>
            Cancel
          </Button>
          <Button type='primary' onClick={handleSaveEvent}>
            Save
          </Button>
        </Space>
      }
      onClose={() => closeDrawer()}>
      <Form layout='vertical'>
        <FormItem label='Name'>
          <Input onChange={handleNameChange} />
        </FormItem>
        <FormItem label='Description'>
          <Input onChange={handleDescriptionChange} />
        </FormItem>
        <Row>
          <Col span={12}>
            <FormItem label='Price' style={{ display: 'inline-block' }}>
              <Input onChange={handlePriceChange} />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label='Date' style={{ display: 'inline-block' }}>
              <DatePicker onChange={handleDateChange} style={{ width: '100%' }} />
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

export default AddEventDrawer;
