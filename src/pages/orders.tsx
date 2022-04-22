import { Button, Divider, List, PageHeader, Image, Space, Col, Form, Table, Tag } from 'antd';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL, MARKUP, VAT } from '../constants';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/main.layout';
import { formatToMoneyWithCurrency, formatUCTtoISO } from '../utils/formatters';

const FormItem = Form.Item;

const OrdersPage = () => {
  const [orders, setOrders] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${BASE_URL}/api/order`).then((result) => {
      if (result.data) setOrders(result.data.orders);
    });

    return () => {};
  }, []);

  const handleViewDetails = (id: string) => {};

  const updateList = (item: any) => {
    let updatedList = [...orders, item];
    setOrders(updatedList);
  };

  const handleDelete = async (index: number) => {
    let updatedList = [...orders];
    let itemToDelete: any = updatedList.splice(index, 1)[0];

    await axios.delete(`${BASE_URL}/api/order/${itemToDelete._id}`).then((response) => {
      if (response.status === 200) setOrders(updatedList);
    });
  };

  const columns = [
    {
      title: 'Order Number',
      dataIndex: '_id',
    },
    {
      title: 'Customer Name',
      render: (_order: any) => (
        <span>
          {_order.firstnames} {_order.lastname}
        </span>
      ),
    },
    {
      title: 'Email Address',
      dataIndex: 'emailAddress',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
    },
    {
      title: 'Shipping Address',
      dataIndex: 'shippingAddress',
    },
    {
      title: 'Items Ordered',
      render: (_order: any) => {
        let itemCodes: any[] = [];

        _order.items.forEach((item: any) => {
          itemCodes.push(<Tag color='blue'>{item.code}</Tag>);
        });

        return <Space>{itemCodes}</Space>;
      },
    },
    {
      title: 'Order Amount',
      dataIndex: 'amount',
      render: (text: any) => <span>{formatToMoneyWithCurrency(text)}</span>,
    },
    {
      title: 'Order Date',
      dataIndex: 'created_at',
      render: (text: any) => <span>{formatUCTtoISO(text)}</span>,
    },
    {
      title: 'Actions',
      render: (_value: any, _record: object, index: number) => (
        <Space>
          <Button type='link' danger onClick={() => handleDelete(index)}>
            <DeleteOutlined /> Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <MainLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <div className='page orders-page'>
          <PageHeader onBack={() => navigate(-1)} title={`Orders`} subTitle='Manage orders received from clients' />
          <Divider />
          <Table columns={columns} dataSource={orders} />
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default OrdersPage;
