import { Helmet } from 'react-helmet-async';

import { ProductsView } from '../../sections/@dashboard/products/view';

// ----------------------------------------------------------------------

export default function Products() {
  return (
    <>
      <Helmet>
        <title> Products | Cyanase </title>
      </Helmet>

      <ProductsView />
    </>
  );
}
