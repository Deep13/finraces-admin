// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import { ProductProvider } from '../../../context/Ecommercecontext';
import BreadcrumbComp from '../../../layouts/full/shared/breadcrumb/BreadcrumbComp';
import ProductTableList from '../../../components/apps/ecommerce/productTableList/ProductTableList';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Demo Race Management',
  },
];

const EcomProductList = () => {
  return (
    <>
      <BreadcrumbComp title="Demo Race Management" items={BCrumb} />
      <ProductTableList />
    </>
  );
};

export default EcomProductList;
