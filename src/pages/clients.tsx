import { DeleteOutlined, PlusOutlined, SendOutlined } from '@ant-design/icons';
import { Button, Divider, PageHeader, Space, Table } from 'antd';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../app-constants';
import MainLayout from '../layouts/main.layout';
import CreateClientDrawer from '../components/createClientDrawer';

const ClientsPage = () => {
  const [clients, setClients] = useState<any>([]);
  const [showDrawer, setShowDrawer] = useState(false);

  const getClients = () => {
    axios.get(`${BASE_URL}/api/client`).then((result: any) => {
      setClients(result.data);
    });
  };

  useEffect(() => {
    getClients();
    return () => {};
  }, []);

  const closeAddDrawer = () => setShowDrawer(false);

  const updateList = (item: any = null) => {
    if (item) {
      let updatedList = [...clients, item];
      setClients(updatedList);
    } else {
      getClients();
    }

    closeAddDrawer();
  };

  const handleDeleteItem = async (item: any) => {
    let itemId = item._id;

    let updatedList = [...clients];

    let index = updatedList.findIndex((e: any) => e._id === itemId);

    updatedList.splice(index, 1);

    await axios.delete(`${BASE_URL}/api/client/${itemId}`).then((response) => {
      if (response.status === 200) setClients(updatedList);
    });
  };

  const columns = [
    {
      title: 'Client Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Contact Person',
      dataIndex: 'contact',
      key: 'contact',
    },
    {
      title: 'Physical Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Email Address',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Actions',
      render: (text: string, record: any, index: number) => (
        <Space>
          <Button type='default' danger onClick={() => handleDeleteItem(record)}>
            <DeleteOutlined /> Delete
          </Button>
          <Button type='default' onClick={() => {}}>
            <SendOutlined /> Resend
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <MainLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <div className='page clients-page'>
          <PageHeader
            title='Clients'
            subTitle='Manage your clients'
            extra={
              <Space>
                <Button onClick={() => setShowDrawer(true)}>
                  <PlusOutlined /> New Client
                </Button>
              </Space>
            }
          />
          <Divider />
          <Table dataSource={clients} columns={columns} />
          <CreateClientDrawer isDrawerOpen={showDrawer} closeDrawer={closeAddDrawer} updateList={updateList} />
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default ClientsPage;
