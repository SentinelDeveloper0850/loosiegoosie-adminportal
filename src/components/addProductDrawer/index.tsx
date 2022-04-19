import { Button, Col, DatePicker, Divider, Drawer, Form, Input, InputNumber, Row, Select, Space } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { BASE_URL, LANGUAGES } from '../../constants';
import IAddProductDrawerProps from '../../interfaces/IAddProductDrawer';
import './style.scss';

const FormItem = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea;

const AddProductDrawer = ({
  isDrawerOpen,
  closeDrawer,
  updateList,
  categories = [],
  catalogues = [],
}: IAddProductDrawerProps) => {
  const [product, setProduct] = useState<any>({
    colours: [],
  });

  const handleSave = async () => {
    await axios.post(`${BASE_URL}/api/product`, product).then((response) => {
      updateList(response.data.product);
    });
  };

  const handleInputChange = (key: string, value: any, parent?: string) => {
    let updatedChild = { ...product, [key]: value };
    setProduct(updatedChild);
  };

  const handleColourChange = (value: any) => {
    let updatedChild = { ...product, colours: value };
    setProduct(updatedChild);
  };

  return (
    <Drawer
      className='add-product-drawer'
      title='Add Product'
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
        <Row gutter={12}>
          <Col span={12}>
            <FormItem label='Name'>
              <Input name='name' onChange={(e: any) => handleInputChange('name', e.target.value)} />
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label='Code'>
              <Input name='name' onChange={(e: any) => handleInputChange('code', e.target.value)} />
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label='Price'>
              <Input
                prefix='R'
                name='name'
                value={product.price}
                onChange={(e: any) => {
                  if (isNaN(e.target.value) === false) handleInputChange('price', e.target.value);
                }}
              />
            </FormItem>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={24}>
            <FormItem label='Description'>
              <TextArea
                name='name'
                placeholder='Enter the description...'
                onChange={(e: any) => handleInputChange('description', e.target.value)}></TextArea>
            </FormItem>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>
            <FormItem label='Material'>
              <Input name='name' onChange={(e: any) => handleInputChange('material', e.target.value)} />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label='Dimensions'>
              <Input name='name' onChange={(e: any) => handleInputChange('dimensions', e.target.value)} />
            </FormItem>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>
            <FormItem label='Catalogue'>
              <Select onChange={(value: any) => handleInputChange('catalogueID', value)}>
                {catalogues.map((item: any) => (
                  <Option key={item._id}>{item.name}</Option>
                ))}
              </Select>
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label='Category'>
              <Select onChange={(value: any) => handleInputChange('categoryID', value)}>
                {categories.map((item: any) => (
                  <Option key={item._id}>{item.name}</Option>
                ))}
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={24}>
            <FormItem label='Available Colours'>
              <Select mode='tags' style={{ width: '100%' }} placeholder='Tags Mode' onChange={handleColourChange}>
                {product.colours.forEach((item: any) => {
                  <Option key={item}>{item}</Option>;
                })}
              </Select>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

export default AddProductDrawer;
