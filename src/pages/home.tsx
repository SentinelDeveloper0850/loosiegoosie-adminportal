import { Card, Col, Divider, Image, PageHeader, Row, Statistic } from 'antd';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../constants';
import childrenIcon from '../assets/images/students.png';
import classIcon from '../assets/images/classIcon.png';
import eventIcon from '../assets/images/eventIcon.png';
import broadcasterIcon from '../assets/images/broadcaster.png';
import activitiesIcon from '../assets/images/activities.png';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/main.layout';

const HomePage = () => {
  const [stats, setStats] = useState<any>({});

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${BASE_URL}/api/dashboard`).then((result: any) => {
      setStats(result.data);
    });

    return () => {};
  }, []);

  return (
    <MainLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <div className='page home-page'>
          <PageHeader title='Dashboard' subTitle='An overview of all system metrics' />
          <Divider />
          <Row gutter={16}>
            <Col span={6}>
              <Card
                onClick={() => navigate('/catalogues')}
                bodyStyle={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  alignContent: 'flex-end',
                }}>
                <Statistic
                  style={{ display: 'block', width: '100%' }}
                  title='Catalogues'
                  value={stats.numberOfClasses}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card
                onClick={() => navigate('/categories')}
                bodyStyle={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  alignContent: 'flex-end',
                }}>
                <Statistic
                  style={{ display: 'block', width: '100%' }}
                  title='Categories'
                  value={stats.numberOfChildren}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card
                onClick={() => navigate('/products')}
                bodyStyle={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  alignContent: 'flex-end',
                }}>
                <Statistic style={{ display: 'block', width: '100%' }} title='Products' value={stats.numberOfEvents} />
              </Card>
            </Col>
            <Col span={6}>
              <Card
                onClick={() => navigate('/orders')}
                bodyStyle={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  alignContent: 'flex-end',
                }}>
                <Statistic
                  style={{ display: 'block', width: '100%' }}
                  title='Orders'
                  value={stats.numberOfBroadcasts}
                />
              </Card>
            </Col>
          </Row>
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default HomePage;
