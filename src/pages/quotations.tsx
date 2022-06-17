import {
  CloseOutlined,
  DeleteOutlined,
  MailOutlined,
  PlusOutlined,
  SendOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { Button, Divider, List, notification, PageHeader, Space, Table, Tag } from 'antd';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../app-constants';
import MainLayout from '../layouts/main.layout';
import { useNavigate } from 'react-router-dom';
import { formatToMoneyWithCurrency } from '../utils/formatters';

const QuotationsPage = () => {
  const [quotations, setQuotations] = useState<any>([]);

  const navigate = useNavigate();

  const getQuotations = () => {
    axios.get(`${BASE_URL}/api/quotation`).then((result: any) => {
      console.log('result :>> ', result);
      let data = result.data.map((item: any) => ({
        key: item._id,
        id: item._id,
        clientId: item.clientId,
        clientName: item.clientName,
        quoteNumber: item.quoteNumber,
        status: item.status,
        description: item.description,
        total: item.total,
        items: item.items,
        createdAt: item.created_at,
      }));
      data.reverse();
      setQuotations(data);
    });
  };

  useEffect(() => {
    getQuotations();
    return () => {};
  }, []);

  const handleDeleteItem = async (item: any) => {
    let itemId = item._id;

    let updatedList = [...quotations];

    let index = updatedList.findIndex((e: any) => e._id === itemId);

    updatedList.splice(index, 1);

    await axios.delete(`${BASE_URL}/api/quotation/${itemId}`).then((response) => {
      if (response.status === 200) setQuotations(updatedList);
    });
  };

  const handleConvertToInvoice = async (quote: any) => {
    let payload = {
      clientId: quote.clientId,
      clientName: quote.clientName,
      quoteId: quote._id,
      quoteNumber: quote.quoteNumber,
      amountDue: quote.total,
      amountPaid: 0,
      balance: quote.total,
      items: quote.items,
      createFromQuotation: true,
    };

    const response = await axios.post(`${BASE_URL}/api/invoice`, payload);

    console.log(response);

    if (response.status === 200 || response.status === 201) {
      navigate('/invoices');
    } else {
    }
  };

  const columns = [
    {
      title: 'Client',
      dataIndex: 'clientName',
      key: 'clientName',
    },
    {
      title: 'Quotation Number',
      dataIndex: 'quoteNumber',
      key: 'quoteNumber',
    },
    {
      title: 'Quoted Items',
      key: 'quotedItems',
      render: (text: string, record: any, index: number) => {
        let items = record.items;
        return (
          <Space>
            {items.map((item: any) => (
              <Tag color={'blue'}>
                {item.quantity} {item.name} @ {formatToMoneyWithCurrency(item.subtotal)}
              </Tag>
            ))}
          </Space>
        );
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      render: (text: string, record: any, index: number) => <span>{formatToMoneyWithCurrency(record.total)}</span>,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: string, record: any, index: number) => (
        <Space>
          {/* <Button danger type='default' size='small' onClick={() => handleDeleteItem(record)}>
            <CloseOutlined /> Delete
          </Button> */}
          {record.status !== 'Invoiced' && (
            <>
              <Button type='link' size='small' onClick={() => {}}>
                <MailOutlined /> Resend
              </Button>
              <Divider type='vertical' />
              <Button type='link' size='small' onClick={() => handleConvertToInvoice(record)}>
                <SyncOutlined /> Convert to Invoice
              </Button>
            </>
          )}
        </Space>
      ),
    },
  ];

  return (
    <MainLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <div className='page quotations-page'>
          <PageHeader
            title='Quotations'
            subTitle='Manage your quotations'
            extra={
              <Space>
                <Button onClick={() => navigate('/quotations/create')}>
                  <PlusOutlined /> New Quotation
                </Button>
              </Space>
            }
          />
          <Divider />
          <Table size='small' dataSource={quotations} columns={columns} />
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default QuotationsPage;
