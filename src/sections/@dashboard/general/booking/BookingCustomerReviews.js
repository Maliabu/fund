import axios from "axios";

import Slider from 'react-slick';
import { useTheme } from '@mui/material/styles'; // Correct import location
import { useState, useEffect, useRef} from 'react';
import { Card, Stack, Typography, Button, CardHeader } from '@mui/material'; // Correct import location
import useAuth from '../../../../hooks/useAuth';
import { portfolioUrl } from '../../../../components/Url';
import { fCurrency } from '../../../../utils/formatNumber';

import Iconify from '../../../../components/Iconify';
import { CarouselArrows } from '../../../../components/carousel';
import WithdrawModal from '../../../../components/modals/Withdraw';
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function BookingCustomerReviews() {
  const theme = useTheme();
  const carouselRef = useRef(null);
const { user } = useAuth();
  const { email: userEmail, currency } = user.user;
   const [Portfolio, setPortfolio] = useState([]);

   const [openModal, setOpenModal] = useState(false);
  const settings = {
    dots: false,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    adaptiveHeight: true,
  };

  const handlePrevious = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };


useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(portfolioUrl, {
          email: userEmail,
        });
        
 
        setPortfolio(response.data.fundusers)
     
localStorage.setItem('portfolioData', JSON.stringify(response.data.fundusers));

      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, [userEmail]);
  
const handleOpenModal = (id) => {
  // Store the ID in localStorage
  localStorage.setItem('selectedOption', id);
  
  // Open the modal
  setOpenModal(true);
};

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  return (
    <Card>
      <CardHeader
        title="My portfolio"
        subheader={"5 clases"}
        action={
          <CarouselArrows
            customIcon={'ic:round-keyboard-arrow-right'}
            onNext={handleNext}
            onPrevious={handlePrevious}
            sx={{ '& .arrow': { width: 28, height: 28, p: 0 } }}
          />
        }
        sx={{
          '& .MuiCardHeader-action': {
            alignSelf: 'center',
          },
        }}
      />

      <WithdrawModal open={openModal} onClose={handleCloseModal} />
   
      <Slider ref={carouselRef} {...settings}>
        {Portfolio.map((item, index) => (
             <Stack key={index} spacing={2} sx={{ minHeight: 60, position: 'relative', p: 3 }}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <div>
          <Typography variant="h3">
          {item.name}</Typography>
          <Typography variant="h4">
        {currency} {fCurrency(item.totalNetworth)}
         </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary', mt: 0.5, display: 'block' }}>
            Deposit {currency} {fCurrency(item.totalDeposit)}
          </Typography>
        </div>
      </Stack>
      <Stack direction="row" spacing={2} alignItems="flex-end" sx={{ flexGrow: 1 }}>
        <Button onClick={()=>handleOpenModal(item.option_id)} fullWidth variant="contained" endIcon={<Iconify icon={'eva:checkmark-circle-2-fill'} />}>
          Withdraw
        </Button>
      </Stack>
    </Stack>
        ))}
      </Slider>
    </Card>
  );
}

// ----------------------------------------------------------------------


