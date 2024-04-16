
import Iconify from '../components/Iconify';
//
import _mock from './_mock';
// ----------------------------------------------------------------------



export const AnalyticPost = () => {
  
   const storedData = JSON.parse(localStorage.getItem('fundUsers'));

  
  const analyticPost = storedData.map((fund) => ({
    id: fund.id,
    title: fund.title,
    description: fund.description,
    image: fund.image,
    postedAt: fund.postedAt,
  }));

  return {analyticPost};
};

export const _analyticOrderTimeline = [...Array(5)].map((_, index) => ({
  id: _mock.id(index),
  title: [
    '1983, orders, $4220',
    '12 Invoices have been paid',
    'Order #37745 from September',
    'New order placed #XF-2356',
    'New order placed #XF-2346',
  ][index],
  type: `order${index + 1}`,
  time: _mock.time(index),
}));

export const _analyticTraffic = [
  {
    name: 'Update fund',
    value:2,
    text: 'Update users on fund performance, Intrest rate and value',
    icon: <Iconify icon={'eva:alt-arrow-up-broken'} color="#252859" width={32} height={32} />,
  },
  {
    name: 'Email Updates',
    value:1,
    text: 'Send email updates to investors',
    icon: <Iconify icon={'eva: envelope-fill'} color="#006097" width={32} height={32} />,
  },

];
