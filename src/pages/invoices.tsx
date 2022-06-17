import { CreditCardOutlined, DeleteOutlined, PayCircleOutlined, PlusOutlined, SendOutlined } from '@ant-design/icons';
import { Button, Divider, List, PageHeader, Space, Table, Tag } from 'antd';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../app-constants';
import MainLayout from '../layouts/main.layout';
import { useNavigate } from 'react-router-dom';
import { formatToMoneyWithCurrency } from '../utils/formatters';

const InvoicesPage = () => {
  const [invoices, setInvoices] = useState<any>([]);

  const navigate = useNavigate();

  const getInvoices = () => {
    axios.get(`${BASE_URL}/api/invoice`).then((result: any) => {
      let data = result.data.reverse();
      setInvoices(data);
    });
  };

  useEffect(() => {
    getInvoices();
    return () => {};
  }, []);

  const handleDeleteItem = async (item: any) => {
    let itemId = item._id;

    let updatedList = [...invoices];

    let index = updatedList.findIndex((e: any) => e._id === itemId);

    updatedList.splice(index, 1);

    await axios.delete(`${BASE_URL}/api/invoices/${itemId}`).then((response) => {
      if (response.status === 200) setInvoices(updatedList);
    });
  };

  const columns = [
    {
      title: 'Client',
      dataIndex: 'clientName',
      key: 'clientName',
    },
    {
      title: 'Invoice Number',
      dataIndex: 'invoiceNumber',
      key: 'invoiceNumber',
    },
    {
      title: 'Invoice Items',
      key: 'items',
      render: (text: string, record: any, index: number) => {
        let items = record.items;
        return (
          <Space>
            {items.map((item: any) => (
              <Tag>
                {item.quantity} units of {item.name} @ {formatToMoneyWithCurrency(item.subtotal)}
              </Tag>
            ))}
          </Space>
        );
      },
    },
    {
      title: 'Total Due',
      dataIndex: 'amountDue',
      key: 'amountDue',
      render: (text: string, record: any, index: number) => <span>{formatToMoneyWithCurrency(record.amountDue)}</span>,
    },
    {
      title: 'Amount Paid',
      dataIndex: 'amountPaid',
      key: 'amountPaid',
      render: (text: string, record: any, index: number) => <span>{formatToMoneyWithCurrency(record.amountPaid)}</span>,
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      key: 'balance',
      render: (text: string, record: any, index: number) => <span>{formatToMoneyWithCurrency(record.balance)}</span>,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: string, record: any, index: number) => (
        <Space>
          <Button type='link' size='small' onClick={() => {}}>
            <CreditCardOutlined /> Receipt
          </Button>
          {/* <Button danger type='default' size='small' onClick={() => handleDeleteItem(record)}>
            <CloseOutlined /> Delete
          </Button> */}
          {/* <Button type='link' size='small' onClick={() => {}}>
            <MailOutlined /> Resend
          </Button>
          <Divider type='vertical' />
           */}
        </Space>
      ),
    },
  ];

  return (
    <MainLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <div className='page invoices-page'>
          <PageHeader
            title='Invoices'
            subTitle='Manage your invoices'
            extra={
              <Space>
                <Button onClick={() => navigate('/invoices/create')}>
                  <PlusOutlined /> New Invoice
                </Button>
              </Space>
            }
          />
          <Divider />
          <Table size='small' dataSource={invoices} columns={columns} />
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default InvoicesPage;
