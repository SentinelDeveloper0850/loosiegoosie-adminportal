import { Button, Col, Drawer, Form, Input, Row, Select, Space } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { BASE_URL } from '../../app-constants';
import IProps from './props';
import './style.scss';

const FormItem = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea;

const CreateModelDrawer = ({ modelName, model, isDrawerOpen, closeDrawer, updateList }: IProps) => {
  const [modelInstance, setModelInstance] = useState<any>({
    colours: [],
  });

  const handleSave = async () => {
    await axios.post(`${BASE_URL}/api/${modelName.toLowerCase()}`, modelInstance).then((response) => {
      console.log('response :>> ', response);
      updateList();
    });
  };

  const handleInputChange = (key: string, value: any, parent?: string) => {
    let updatedChild = { ...model, [key]: value };
    setModelInstance(updatedChild);
  };

  const getFormControls = () => {
    let jsx: JSX.Element[] = [];

    const keys = Object.keys(model);

    keys.forEach((key: string, index: number) => {
      let type = model[key];

      if (type === 'input') {
        jsx.push(
          <FormItem label={key.toUpperCase()}>
            <Input onChange={(e: any) => handleInputChange(key.toLowerCase(), e.target.value)} />
          </FormItem>
        );
      }

      if (type === 'text') {
        jsx.push(
          <FormItem label={key.toUpperCase()}>
            <TextArea onChange={(e: any) => handleInputChange(key.toLowerCase(), e.target.value)} />
          </FormItem>
        );
      }
    });

    return jsx;
  };

  return (
    <Drawer
      className='add-model-drawer'
      title={`Add ${modelName}`}
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
        {getFormControls()}
      </Form>
    </Drawer>
  );
};

export default CreateModelDrawer;
