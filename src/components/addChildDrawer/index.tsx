import { Button, Col, DatePicker, Divider, Drawer, Form, Input, Row, Select, Space } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { BASE_URL, LANGUAGES } from '../../app-constants';
import IAddChildDrawerProps from '../../interfaces/IAddChildDrawer';
import './style.scss';

const FormItem = Form.Item;
const Option = Select.Option;

const AddChildDrawer = ({ isDrawerOpen, closeDrawer, updateList, classDetails }: IAddChildDrawerProps) => {
  const [newChild, setNewChild] = useState<any>({});
  const [father, setFather] = useState<any>({});
  const [mother, setMother] = useState<any>({});

  const handleSave = async () => {
    let _parents = [];

    if (father.firstname) _parents.push(father);

    if (mother.firstname) _parents.push(mother);

    let child = { ...newChild, classId: classDetails._id, parents: _parents };

    await axios.post(`${BASE_URL}/api/children`, child).then((response) => {
      updateList(response.data.data);
    });
  };

  const handleInputChange = (key: string, value: any, parent?: string) => {
    if (parent && parent.length > 0) {
      if (parent === 'father') {
        let updatedFather = { ...father, [key]: value };
        setFather(updatedFather);
      } else {
        let updatedMother = { ...mother, [key]: value };
        setMother(updatedMother);
      }
    } else {
      let updatedChild = { ...newChild, [key]: value };
      setNewChild(updatedChild);
    }
  };

  return (
    <Drawer
      className='add-child-drawer'
      title={`Add Child to ${classDetails?.name}`}
      contentWrapperStyle={{ width: '70%' }}
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
        <h4>Child Details</h4>
        <Divider style={{ marginTop: 0 }} />
        <Row gutter={12}>
          <Col span={10}>
            <FormItem label='Fullnames'>
              <Input onChange={(e: any) => handleInputChange('fullnames', e.target.value)} />
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label='Known As'>
              <Input onChange={(e: any) => handleInputChange('knownAs', e.target.value)} />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label='Lastname'>
              <Input onChange={(e: any) => handleInputChange('lastname', e.target.value)} />
            </FormItem>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={10}>
            <FormItem label='Physical Address'>
              <Input onChange={(e: any) => handleInputChange('physicalAddress', e.target.value)} />
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label='Home Language'>
              <Select defaultValue={LANGUAGES[0]} onChange={(value: any) => handleInputChange('homeLanguage', value)}>
                {LANGUAGES.map((item) => (
                  <Option key={item}>{item}</Option>
                ))}
              </Select>
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label='Date of Birth'>
              <DatePicker
                style={{ width: '100%' }}
                onChange={(_date: any, dateString: string) => handleInputChange('dateOfBirth', dateString)}
              />
            </FormItem>
          </Col>
        </Row>
        <h4>Parent Details (Father)</h4>
        <Divider style={{ marginTop: 0 }} />
        <Row gutter={12}>
          <Col span={10}>
            <FormItem label='First Name'>
              <Input onChange={(e: any) => handleInputChange('firstname', e.target.value, 'father')} />
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label='Lastname'>
              <Input onChange={(e: any) => handleInputChange('lastname', e.target.value, 'father')} />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label='ID Number'>
              <Input onChange={(e: any) => handleInputChange('idNumber', e.target.value, 'father')} />
            </FormItem>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={10}>
            <FormItem label='Physical Address'>
              <Input
                value={father.physicalAddress}
                onChange={(e: any) => handleInputChange('physicalAddress', e.target.value, 'father')}
                suffix={
                  <Button
                    type='primary'
                    size='small'
                    onClick={() => handleInputChange('physicalAddress', newChild.physicalAddress, 'father')}>
                    Same as Child
                  </Button>
                }
              />
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label='Occupation'>
              <Input onChange={(e: any) => handleInputChange('occupation', e.target.value, 'father')} />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label='Email Address'>
              <Input onChange={(e: any) => handleInputChange('emailAddress', e.target.value, 'father')} />
            </FormItem>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={10}>
            <FormItem label='Phone Number (Home)'>
              <Input onChange={(e: any) => handleInputChange('phoneNumberHome', e.target.value, 'father')} />
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label='Phone Number (Work)'>
              <Input onChange={(e: any) => handleInputChange('phoneNumberWork', e.target.value, 'father')} />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label='Cellphone Number'>
              <Input onChange={(e: any) => handleInputChange('mobileNumber', e.target.value, 'father')} />
            </FormItem>
          </Col>
        </Row>
        <h4>Parent Details (Mother)</h4>
        <Divider style={{ marginTop: 0 }} />
        <Row gutter={12}>
          <Col span={10}>
            <FormItem label='First Name'>
              <Input onChange={(e: any) => handleInputChange('firstname', e.target.value, 'mother')} />
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label='Lastname'>
              <Input onChange={(e: any) => handleInputChange('lastname', e.target.value, 'mother')} />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label='ID Number'>
              <Input onChange={(e: any) => handleInputChange('idNumber', e.target.value, 'mother')} />
            </FormItem>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={10}>
            <FormItem label='Physical Address'>
              <Input
                value={mother.physicalAddress}
                onChange={(e: any) => handleInputChange('physicalAddress', e.target.value, 'mother')}
                suffix={
                  <Button
                    type='primary'
                    size='small'
                    onClick={() => handleInputChange('physicalAddress', newChild.physicalAddress, 'mother')}>
                    Same as Child
                  </Button>
                }
              />
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label='Occupation'>
              <Input onChange={(e: any) => handleInputChange('occupation', e.target.value, 'mother')} />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label='Email Address'>
              <Input onChange={(e: any) => handleInputChange('emailAddress', e.target.value, 'mother')} />
            </FormItem>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={10}>
            <FormItem label='Phone Number (Home)'>
              <Input onChange={(e: any) => handleInputChange('phoneNumberHome', e.target.value, 'mother')} />
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label='Phone Number (Work)'>
              <Input onChange={(e: any) => handleInputChange('phoneNumberWork', e.target.value, 'mother')} />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label='Cellphone Number'>
              <Input onChange={(e: any) => handleInputChange('mobileNumber', e.target.value, 'mother')} />
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

export default AddChildDrawer;
