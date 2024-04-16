import React, { useState, useEffect } from "react";
import axios from "axios";

import { Card, Typography, CardHeader, CardContent } from '@mui/material';
import { Timeline, TimelineItem, TimelineSeparator, TimelineDot, TimelineContent } from '@mui/lab';

import { fDateTime} from '../../../../utils/formatTime';
import {fCurrency } from '../../../../utils/formatNumber';
import useAuth from '../../../../hooks/useAuth';
import {portfolioUrl} from '../../../../components/Url';



export default function Withdrawlist() {
  const { user } = useAuth();
   const { email: userEmail, currency } = user.user;
  const [Withdraws, setWithdraws] = useState([]);
  
useEffect(() => {
  const fetchData = async () => {
    try {

  
      const response = await axios.post(portfolioUrl, {
        email: userEmail,
      });
setWithdraws(response.data.withdraw);
      
    } catch (error) {
      console.error(error);
    }
  };

  fetchData();
}, [userEmail]);

  return (
    <Card
      sx={{
        '& .MuiTimelineItem-missingOppositeContent:before': {
          display: 'none',
        },
      }}
    >
      <CardHeader title="Pending withdraws" />
      <CardContent>
        <Timeline>
          {Withdraws.map((item, index) => (
    <TimelineItem key = {index}>
      <TimelineSeparator>
        <TimelineDot color={getColorByType()} />
      </TimelineSeparator>
      <TimelineContent>
        <Typography variant="subtitle1">{currency}{fCurrency(item.withdraw_amount)}</Typography>

        <Typography variant="caption" sx={{ color: 'text.disabled' }}>
          {fDateTime(item.created)}
        </Typography>
      </TimelineContent>
    </TimelineItem>
          ))}
        </Timeline>

      </CardContent>
    </Card>
  );
}



function getColorByType() {
  const colors = ['primary', 'success', 'info', 'warning', 'error'];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}