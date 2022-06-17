import { Card, Col, Divider, PageHeader, Row, Skeleton, Space, Spin, Statistic } from 'antd';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../app-constants';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/main.layout';

const HomePage = () => {
  const [stats, setStats] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    axios.get(`${BASE_URL}/api/dashboard`).then((result: any) => {
      setStats(result.data);
      setLoading(false);
    });

    return () => {};
  }, []);

  return (
    <MainLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <div className='page home-page'>
          <PageHeader title='Dashboard' subTitle='An overview of all system metrics' />
          <Divider />
          <Skeleton loading={loading}>
            <Space direction='vertical' style={{ width: '100%' }}>
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
                      value={stats.cataloguesCount}
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
                      value={stats.categoriesCount}
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
                    <Statistic
                      style={{ display: 'block', width: '100%' }}
                      title='Products'
                      value={stats.productsCount}
                    />
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
                    <Statistic style={{ display: 'block', width: '100%' }} title='Orders' value={stats.ordersCount} />
                  </Card>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={6}>
                  <Card
                    onClick={() => navigate('/clients')}
                    bodyStyle={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      alignContent: 'flex-end',
                    }}>
                    <Statistic style={{ display: 'block', width: '100%' }} title='Clients' value={stats.clientsCount} />
                  </Card>
                </Col>
                <Col span={6}>
                  <Card
                    onClick={() => navigate('/quotations')}
                    bodyStyle={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      alignContent: 'flex-end',
                    }}>
                    <Statistic
                      style={{ display: 'block', width: '100%' }}
                      title='Quotations'
                      value={stats.quotationsCount}
                    />
                  </Card>
                </Col>
                <Col span={6}>
                  <Card
                    onClick={() => navigate('/invoices')}
                    bodyStyle={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      alignContent: 'flex-end',
                    }}>
                    <Statistic
                      style={{ display: 'block', width: '100%' }}
                      title='Invoices'
                      value={stats.invoicesCount}
                    />
                  </Card>
                </Col>
              </Row>
            </Space>
          </Skeleton>
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default HomePage;
