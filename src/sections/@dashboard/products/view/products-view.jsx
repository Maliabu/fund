import axios from "axios";
import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { sample } from 'lodash';
import useAuth from '../../../../hooks/useAuth';
import { optionsUrl } from "../../../../components/Url";
import ProductCard from '../product-card';
import AddProductButton from '../add_product';

const PRODUCT_COLORS = [
  '#00AB55',
  '#000000',
  '#FFFFFF',
  '#FFC0CB',
  '#FF4842',
  '#1890FF',
  '#94D82D',
  '#FFC107',
];

export default function ProductsView() {
  const { user } = useAuth();
  const userEmail = user.user.email;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(optionsUrl, {
          email: userEmail,
        });
      
        const options = response.data.myclasses;
        localStorage.setItem("productData", JSON.stringify(response.data.totalClasses));
        
        const mappedProducts = options.map((option, index) => {
          const setIndex = index + 1;
          return {
            cover: `/covers/cover_${setIndex}.jpg`,
            name: option.oname,
            types: option.cname,
            price: option.minimum,
            colors:
              (setIndex === 1 && PRODUCT_COLORS.slice(0, 2)) ||
              (setIndex === 2 && PRODUCT_COLORS.slice(1, 3)) ||
              (setIndex === 3 && PRODUCT_COLORS.slice(2, 4)) ||
              (setIndex === 4 && PRODUCT_COLORS.slice(3, 6)) ||
              (setIndex === 23 && PRODUCT_COLORS.slice(4, 6)) ||
              (setIndex === 24 && PRODUCT_COLORS.slice(5, 6)) ||
              PRODUCT_COLORS,
            status: sample(['sale', 'new', '', '']),
          };
        });
        setProducts(mappedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, [userEmail]);

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Products
      </Typography>
      <AddProductButton/>
      <Grid container spacing={3}>
        {products.map((product, index) => (
          <Grid key={index} item xs={12} sm={6} md={3}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}