import { Button, Divider, List, PageHeader, Space, Table, TablePaginationConfig } from 'antd';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL, FORM_CONTROL } from '../app-constants';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import MainLayout from '../layouts/main.layout';
import CreateModelDrawer from '../components/createModelDrawer';

const CategoriesPage = () => {
  const [categories, setCategories] = useState<any>([]);
  const [showDrawer, setShowDrawer] = useState(false);

  const getCategories = () => {
    axios.get(`${BASE_URL}/api/category`).then((result) => {
      if (result.data) setCategories(result.data.categories);
    });
  }

  useEffect(() => {
    getCategories();
    return () => {};
  }, []);

  const closeAddDrawer = () => setShowDrawer(false);

  const updateList = (item: any = null) => {
    if (item) {
      let updatedList = [...categories, item];
      setCategories(updatedList);
    } else {
      getCategories();
    }
    closeAddDrawer();
  };

  const handleDeleteItem = async (item: any) => {
    let itemId = item._id;

    let updatedList = [...categories];

    let index = updatedList.findIndex((e: any) => e._id === itemId);

    updatedList.splice(index, 1);

    await axios.delete(`${BASE_URL}/api/category/${itemId}`).then((response) => {
      if (response.status === 200) setCategories(updatedList);
    });
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Actions',
      render: (_item: any, _row: any, _index: number) => {
        return (
        <Space>
          <Button danger onClick={() => handleDeleteItem(_item)}>
            <DeleteOutlined /> Delete
          </Button>
        </Space>
      )},
    },
  ];

  const paginationConfig: TablePaginationConfig = {
    defaultPageSize: 10,
    position: ['topRight'],
    showTotal: (total: number, range: [number, number]) => `${range[0]}-${range[1]} of ${total} items`,
  };

  return (
    <MainLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <div className='page categories-page'>
          <PageHeader
            title='Categories'
            subTitle='Manage categories available for product classification'
            extra={
              <Space>
                <Button onClick={() => setShowDrawer(true)}>
                  <PlusOutlined /> Add Category
                </Button>
              </Space>
            }
          />
          <Divider />
          <Table columns={columns} dataSource={categories} pagination={paginationConfig} />
        </div>
        <CreateModelDrawer modelName='Category' model={{ name: FORM_CONTROL.INPUT }} isDrawerOpen={showDrawer} closeDrawer={closeAddDrawer} updateList={updateList} />
      </motion.div>
    </MainLayout>
  );
};

export default CategoriesPage;
