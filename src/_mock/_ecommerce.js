import axios from "axios";
import { useState, useEffect } from 'react';
import _mock from './_mock';
import {investorUrl} from "../components/Url";
import useAuth from '../hooks/useAuth';

export const useRequests = () => {
  const { user } = useAuth();
  console.log(user.investmentPerformance)
  const userEmail = user.user.email;

  const [Mdata, setData] = useState([]);

    useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(investorUrl, {
          email: userEmail,
        });
        setData(response.data.request);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [userEmail]);// Include userEmail in dependency array to re-run effect when it changes

  return Mdata;
};

// ----------------------------------------------------------------------

const COUNTRY = ['de', 'en', 'fr', 'kr', 'us'];

const CATEGORY = ['CAP', 'Branded Shoes', 'Headphone', 'Cell Phone', 'Earings'];

const PRODUCT_NAME = [
  'Send investor updates',
  'send emails',
  'Track fund performance',
  
];

export const _ecommerceSalesOverview = [...Array(3)].map((_, index) => ({
  label: ['Total Profit', 'Total Income', 'Total Expenses'][index],
  amount: _mock.number.price(index) * 100,
  value: _mock.number.percent(index),
}));

export const _ecommerceBestSalesman = [...Array(5)].map((_, index) => ({
  id: _mock.id(index),
  name: _mock.name.fullName(index),
  email: _mock.email(index),
  avatar: _mock.image.avatar(index + 8),
  category: CATEGORY[index],
  flag: `https://minimal-assets-api.vercel.app/assets/icons/ic_flag_${COUNTRY[index]}.svg`,
  total: _mock.number.price(index),
  rank: `Top ${index + 1}`,
}));

export const _ecommerceLatestProducts = [...Array(5)].map((_, index) => ({
  id: _mock.id(index),
  name: PRODUCT_NAME[index],
  image: _mock.image.product(index),
  price: _mock.number.price(index),
  priceSale: index === 0 || index === 3 ? 0 : _mock.number.price(index),
  colors: (index === 0 && ['#2EC4B6', '#E71D36', '#FF9F1C', '#011627']) ||
    (index === 1 && ['#92140C', '#FFCF99']) ||
    (index === 2 && ['#0CECDD', '#FFF338', '#FF67E7', '#C400FF', '#52006A', '#046582']) ||
    (index === 3 && ['#845EC2', '#E4007C', '#2A1A5E']) || ['#090088'],
}));

export const _ecommerceNewProducts = [...Array(5)].map((_, index) => ({
  id: _mock.id(index),
  name: [
    'Send Updates',
    'Send Emails',
    'Track performance',
    'Update fund',
    
  ][index],
  image: _mock.image.product(index),
}));
