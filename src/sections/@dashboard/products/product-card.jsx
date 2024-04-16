import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Label from '../../../components/Label';
import useAuth from '../../../hooks/useAuth';
import { ColorPreview } from '../../../components/color-utils';
import { fCurrency } from '../../../utils/formatNumber';

export default function ShopProductCard({ product }) {
  
  const { user } = useAuth();
 
  const Currency = user.currency;
  const renderStatus = (
    <Label
      variant="filled"
      color={(product.status === 'active' && 'error') || 'info'}
      sx={{
        zIndex: 9,
        top: 16,
        right: 16,
        position: 'absolute',
        textTransform: 'uppercase',
      }}
    >
      {product.status}
    </Label>
  );

  const renderImg = (
    <Box
      component="img"
      alt={product.name}
      src={product.cover}
      sx={{
        top: 0,
        width: '100%',
        height: '100%', // Adjust the height to fill the card
        objectFit: 'cover',
        position: 'absolute',
      }}
    />
  );

  const renderPrice = (
    <Typography variant="subtitle1">
      <Typography
        component="span"
        variant="body1"
        sx={{
          color: 'text.disabled',
          textDecoration: 'line-through',
        }}
      >
        {product.priceSale && fCurrency(product.priceSale)}
      </Typography>
      &nbsp;
      {Currency} {fCurrency(product.price)}
    </Typography>
  );

  return (
    <Card sx={{ margin: '10px' }}> {/* Add margin */}
      <Box sx={{ height: '150px', position: 'relative' }}>
        {product.status && renderStatus}
        {renderImg}
      </Box>

      <Stack spacing={1} sx={{ p: 1 }}> {/* Adjust padding */}
        <Link color="inherit" underline="hover" variant="h4" noWrap>
          {product.name}
        </Link>
        <Link color="inherit" underline="hover" variant="subtitle" noWrap>
          {product.types}
        </Link>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <ColorPreview colors={product.colors} />
          {renderPrice}
        </Stack>
      </Stack>
    </Card>
  );
}

ShopProductCard.propTypes = {
  product: PropTypes.object,
};