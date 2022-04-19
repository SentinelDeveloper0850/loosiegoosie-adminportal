import { DeleteOutlined, PlusOutlined, SendOutlined } from '@ant-design/icons';
import { Button, Divider, List, PageHeader, Space } from 'antd';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL, FORM_CONTROL } from '../constants';
import MainLayout from '../layouts/main.layout';
import AddBroadcastDrawer from '../components/addBroadcastDrawer';
import CreateModelDrawer from '../components/createModelDrawer';

const CataloguesPage = () => {
  const [catalogues, setCatalogues] = useState<any>([]);
  const [showDrawer, setShowDrawer] = useState(false);

  const getCatalogues = () => {
    axios.get(`${BASE_URL}/api/catalogue`).then((result: any) => {
      setCatalogues(result.data.catalogues);
    });
  };

  useEffect(() => {
    getCatalogues();
    return () => {};
  }, []);

  const closeAddDrawer = () => setShowDrawer(false);

  const updateList = (item: any = null) => {
    if (item) {
      let updatedList = [...catalogues, item];
      setCatalogues(updatedList);
    } else {
      getCatalogues();
    }

    closeAddDrawer();
  };

  const handleDeleteItem = async (item: any) => {
    let itemId = item._id;

    let updatedList = [...catalogues];

    let index = updatedList.findIndex((e: any) => e._id === itemId);

    updatedList.splice(index, 1);

    await axios.delete(`${BASE_URL}/api/catalogue/${itemId}`).then((response) => {
      if (response.status === 200) setCatalogues(updatedList);
    });
  };

  return (
    <MainLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <div className='page catalogues-page'>
          <PageHeader
            title='Catalogues'
            subTitle='Manage the catalogues available on the website'
            extra={
              <Space>
                <Button onClick={() => setShowDrawer(true)}>
                  <PlusOutlined /> New Catalogue
                </Button>
              </Space>
            }
          />
          <Divider />
          <List
            itemLayout='horizontal'
            dataSource={catalogues}
            renderItem={(item: any, index: number) => {
              return (
                <List.Item
                  extra={
                    <div style={{ display: 'flex', justifyItems: 'flex-end', alignItems: 'center' }}>
                      <Space>
                        <Button type='default' danger onClick={() => handleDeleteItem(item)}>
                          <DeleteOutlined /> Delete
                        </Button>
                        <Button type='default' onClick={() => {}}>
                          <SendOutlined /> Resend
                        </Button>
                      </Space>
                    </div>
                  }>
                  <List.Item.Meta style={{ alignItems: 'center' }} title={<b>{item.name}</b>} />
                </List.Item>
              );
            }}
          />
          <CreateModelDrawer
            modelName='Catalogue'
            model={{ name: FORM_CONTROL.INPUT }}
            isDrawerOpen={showDrawer}
            closeDrawer={closeAddDrawer}
            updateList={updateList}
          />
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default CataloguesPage;
