import { Button, Divider, List, PageHeader, Space, Image, Table } from 'antd';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL, MARKUP, VAT } from '../constants';
import icon from '../assets/images/package.png';
import { DeleteOutlined, MessageOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import MainLayout from '../layouts/main.layout';
import AddProductDrawer from '../components/addProductDrawer';
import { formatToMoneyWithCurrency } from '../utils/formatters';

const ProductsPage = () => {
  const [products, setProducts] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showDrawer, setShowDrawer] = useState(false);
  const [categories, setCategories] = useState<any>([]);
  const [catalogues, setCatalogues] = useState<any>([]);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${BASE_URL}/api/category`).then((result) => {
      if (result.data) setCategories(result.data.categories);
    });

    axios.get(`${BASE_URL}/api/catalogue`).then((result: any) => {
      setCatalogues(result.data.catalogues);
    });

    return () => {};
  }, []);

  useEffect(() => {
    const id = location.pathname.split('/').pop();

    const getData = () => {
      if (id && id.length > 0) {
        axios.get(`${BASE_URL}/api/product`).then((result) => {
          setProducts(result.data.products);
          setIsLoading(false);
        });
      }
    };

    setTimeout(getData, 500);

    return () => {};
  }, [location]);

  const handleViewDetails = (id: string) => {};

  const updateList = (item: any) => {
    let updatedList = [...products, item];
    setProducts(updatedList);
    closeAddDrawer();
  };

  const closeAddDrawer = () => setShowDrawer(false);

  const handleDelete = async (index: number) => {
    let updatedList = [...products];
    let itemToDelete: any = updatedList.splice(index, 1)[0];

    await axios.delete(`${BASE_URL}/api/product/${itemToDelete._id}`).then((response) => {
      if (response.status === 200) setProducts(updatedList);
    });
  };

  return (
    <MainLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <div className='page products-page'>
          <PageHeader
            onBack={() => navigate(-1)}
            title={`Products`}
            subTitle='Manage products available on the website'
            extra={
              <Space>
                <Button onClick={() => setShowDrawer(true)}>
                  <PlusOutlined /> Add Product
                </Button>
              </Space>
            }
          />
          <Divider />
          <List
            itemLayout='horizontal'
            dataSource={products}
            renderItem={(item: any, index: number) => {
              const price = item.price;
              const markup = price * MARKUP;
              const totalExVat = price + markup;
              const vat = totalExVat * VAT;
              const total = totalExVat + vat;
              return (
                <List.Item
                  actions={[
                    // <Button type='link' onClick={() => handleViewDetails(item._id)}>
                    //   <SearchOutlined /> View
                    // </Button>,
                    <Button type='link' danger onClick={() => handleDelete(item._id)}>
                      <DeleteOutlined /> Delete
                    </Button>,
                  ]}>
                  <List.Item.Meta
                    title={item.name}
                    description={
                      <>
                        <p>{item.description}</p>
                        <div>
                          <b>Cost = </b>
                          {formatToMoneyWithCurrency(price)} <Divider type='vertical' />
                          <b>Markup = </b>
                          {formatToMoneyWithCurrency(markup)} <Divider type='vertical' />
                          <b>VAT = </b>
                          {formatToMoneyWithCurrency(vat)} <Divider type='vertical' />
                          <b>Unit Price = </b>
                          {formatToMoneyWithCurrency(total)} <Divider type='vertical' />
                          <b>Rounded Unit Price = </b>
                          {formatToMoneyWithCurrency(Math.ceil(total))}
                        </div>
                      </>
                    }
                    style={{ alignItems: 'center' }}
                    avatar={<Image preview={false} src={`${BASE_URL}/${item.productImage}`} width={90} style={{ padding: '1rem' }} />}
                  />
                </List.Item>
              );
            }}
          />
        </div>
      </motion.div>
      <AddProductDrawer
        isDrawerOpen={showDrawer}
        closeDrawer={closeAddDrawer}
        updateList={updateList}
        categories={categories}
        catalogues={catalogues}
      />
    </MainLayout>
  );
};

export default ProductsPage;
