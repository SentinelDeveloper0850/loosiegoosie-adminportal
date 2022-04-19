import { Button, Divider, List, PageHeader, Space, Image } from 'antd';
import MainLayout from '../layouts/main.layout';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../constants';
import activitiesIcon from '../assets/images/activities.png';
import { PlusOutlined } from '@ant-design/icons';
import { formatToMoneyWithCurrency } from '../utils/formatters';
import AddActivityDrawer from '../components/addActivityDrawer';

const ActivitiesPage = () => {
  const [activityList, setActivityList] = useState<any>([]);
  const [showDrawer, setShowDrawer] = useState(false);

  useEffect(() => {
    axios.get(`${BASE_URL}/api/activities`).then((result) => {
      if (result.data) setActivityList(result.data.activities);
    });

    return () => {};
  }, []);

  const closeAddDrawer = () => setShowDrawer(false);

  const updateList = (item: any) => {
    let updatedList = [...activityList, item];
    setActivityList(updatedList);
    closeAddDrawer();
  };

  const handleDeleteItem = async (index: number) => {
    let updatedList = [...activityList];
    let itemToDelete: any = updatedList.splice(index, 1)[0];

    await axios.delete(`${BASE_URL}/api/activities/${itemToDelete._id}`).then((response) => {
      if (response.status === 200) setActivityList(updatedList);
    });
  };

  return (
    <MainLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <div className='page activities-page'>
          <PageHeader
            title='Activities'
            subTitle='Manage activities available for children'
            extra={
              <Space>
                <Button onClick={() => setShowDrawer(true)}>
                  <PlusOutlined /> Add Activity
                </Button>
              </Space>
            }
          />
          <Divider />
          <List
            itemLayout='horizontal'
            dataSource={activityList}
            renderItem={(item: any, index: number) => (
              <List.Item
                extra={
                  <div style={{ display: 'flex', justifyItems: 'flex-end', alignItems: 'center' }}>
                    <Space>
                      <span>{item.price ? `${formatToMoneyWithCurrency(item.price)} per child` : ''}</span>
                      <Button type='default' danger onClick={() => handleDeleteItem(index)}>
                        Delete
                      </Button>
                    </Space>
                  </div>
                }>
                <List.Item.Meta
                  avatar={<Image preview={false} src={activitiesIcon} height={40} />}
                  title={<span>{item.name}</span>}
                  description={item.description}
                />
              </List.Item>
            )}
          />
        </div>
        <AddActivityDrawer isDrawerOpen={showDrawer} closeDrawer={closeAddDrawer} updateList={updateList} />
      </motion.div>
    </MainLayout>
  );
};

export default ActivitiesPage;
