import { DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Form, Input, notification, PageHeader, Row, Select, Space, Table } from 'antd';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../app-constants';
import MainLayout from '../layouts/main.layout';
import { formatToMoneyWithCurrency } from '../utils/formatters';

const Option = Select.Option;

const CreateQuotationPage = () => {
  const [clients, setClients] = useState<any>([]);
  const [selectedClient, setSelectedClient] = useState<any>({});
  const [items, setItems] = useState<any>([]);
  const [item, setItem] = useState<any>({
    name: '',
    description: '',
    price: 1.0,
    quantity: 1,
    subtotal: 1.0,
  });

  const navigate = useNavigate();

  const columns = [
    {
      title: 'Item Name',
      dataIndex: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      render: (text: string) => <span>{formatToMoneyWithCurrency(text)}</span>,
    },
    {
      title: 'Amount',
      dataIndex: 'subtotal',
      render: (text: string) => <span>{formatToMoneyWithCurrency(text)}</span>,
    },
  ];

  const getQuotationTotal = () => {
    let total = 0.0;

    if (items.length > 0) {
      items.forEach((item: any) => {
        total += item.subtotal;
      });
    }

    return total;
  };

  const handleSave = async () => {
    const payload = {
      client: selectedClient,
      items: items,
      total: getQuotationTotal(),
    };

    const response = await axios.post(`${BASE_URL}/api/quotation`, payload);

    if (response.status === 200 || response.status === 201) {
      navigate('/quotations');
    } else {
      notification.error({
        message: 'Payload Error',
        description: 'Please ensure you have selected a client and added items to your quotation',
      });
    }
  }

  const handleCancel = async () => {
    navigate('/quotations');
  };

  const getClients = () => {
    axios.get(`${BASE_URL}/api/client`).then((result: any) => {
      setClients(result.data);
    });
  };

  useEffect(() => {
    getClients();
    return () => {};
  }, []);

  function isNumber(str: string): boolean {
    if (typeof str !== 'string') {
      return false;
    }

    if (str.trim() === '') {
      return false;
    }

    return !Number.isNaN(Number(str));
  }

  const handleInputChange = (key: string, value: any) => {
    let updatedChild = { ...item, [key]: value };
    if (key === 'quantity') {
      if (isNumber(value)) {
        updatedChild = { ...updatedChild, subtotal: updatedChild.quantity * updatedChild.price };
        setItem(updatedChild);
      }
    } else if (key === 'price') {
      if (isNumber(value)) {
        updatedChild = { ...updatedChild, subtotal: updatedChild.quantity * updatedChild.price };
        setItem(updatedChild);
      }
    } else {
      setItem(updatedChild);
    }
  };

  const handleAddItem = () => {
    if (item.name !== '' && item.description !== '') {
      let updatedItems = [...items, item];
      setItems(updatedItems);
      setItem({
        name: '',
        description: '',
        price: 1.0,
        quantity: 1,
        subtotal: 1.0,
      });
    } else {
      notification.error({
        message: 'Input Error',
        description: 'Please fill all required fields',
      });
    }
  };

  const selectClientById = (clientId: string) => {
    if (clientId && clientId.length > 0) {
      console.log('clientId :>> ', clientId);
      let client = clients.find((e: any) => e._id === clientId);

      if (client) {
        console.log('client :>> ', client);
        setSelectedClient(client);
      }
    }
  };

  return (
    <MainLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <div className='page quotations-page'>
          <PageHeader
            title='New Quotation'
            extra={
              <Space>
                <Button onClick={handleSave}>
                  <SaveOutlined /> Save
                </Button>
                <Button danger onClick={handleCancel}>
                  <DeleteOutlined /> Cancel
                </Button>
              </Space>
            }
          />
          <Divider />
          <Form layout='vertical'>
            <Row gutter={16}>
              <Col span={6}>
                <Form.Item label='Client'>
                  <Select onSelect={(value: any) => selectClientById(value)}>
                    {clients.map((client: any) => (
                      <Option key={client._id} value={client._id}>
                        {client.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label='Quotation Total'>
                  <h3>{formatToMoneyWithCurrency(getQuotationTotal())}</h3>
                </Form.Item>
              </Col>
            </Row>
            <Divider />
            <Row gutter={16}>
              <Col span={6}>
                <Form.Item label='Item Name'>
                  <Input value={item.name} onChange={(event: any) => handleInputChange('name', event.target.value)} />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label='Description'>
                  <Input
                    value={item.description}
                    onChange={(event: any) => handleInputChange('description', event.target.value)}
                  />
                </Form.Item>
              </Col>
              <Col span={3}>
                <Form.Item label='Quantity'>
                  <Input
                    value={item.quantity}
                    onChange={(event: any) => handleInputChange('quantity', event.target.value)}
                  />
                </Form.Item>
              </Col>
              <Col span={3}>
                <Form.Item label='Unit Price'>
                  <Input
                    prefix={<span>R </span>}
                    value={item.price}
                    onChange={(event: any) => handleInputChange('price', event.target.value)}
                  />
                </Form.Item>
              </Col>
              <Col span={3}>
                <Form.Item label='Subtotal'>
                  <p>{formatToMoneyWithCurrency(item.subtotal)}</p>
                </Form.Item>
              </Col>
              <Col span={3}>
                <Form.Item label=' '>
                  <Button type='primary' block onClick={handleAddItem}>
                    Add Item
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <Divider />
          <Table dataSource={items} columns={columns} size='small' />
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default CreateQuotationPage;