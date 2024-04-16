import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Typography, CardHeader, CardContent, Button } from '@mui/material';
import { Timeline, TimelineItem, TimelineSeparator, TimelineDot, TimelineConnector, TimelineContent } from '@mui/lab';

import { fDateTime} from '../../../../utils/formatTime';
import {fCurrency } from '../../../../utils/formatNumber';
import useAuth from '../../../../hooks/useAuth';

export default function AnalyticsOrderTimeline() {
  const { user } = useAuth();

  const organizedWithdrawData = user.withdrawData.reduce((acc, item) => {
    const key = `${item.investment_option_id}-${item.created.split(' ')[0]}`;
    if (!acc[key]) {
      acc[key] = {
        name: item.name,
        investment_option_id: item.investment_option_id,
        date: item.created.split(' ')[0],
        totalWithdraw: parseFloat(item.withdraw_amount)
      };
    } else {
      acc[key].totalWithdraw += parseFloat(item.withdraw_amount);
    }
    return acc;
  }, {});

  const resultz = Object.values(organizedWithdrawData);

  return (
    <Card
      sx={{
        '& .MuiTimelineItem-missingOppositeContent:before': {
          display: 'none',
        },
      }}
    >
      <CardHeader title="withdraw requests " />
      <CardContent>
        <Timeline>
          {resultz.map((item, index) => (
            <OrderItem key={index} item={item} isLast={index === resultz.length - 1} />
          ))}
        </Timeline>
                  <Link to= "/dashboard/withdrawlist">
            <Button variant="contained" color="primary">
              Authourize withdraws
            </Button>
            </Link>
      </CardContent>
    </Card>
  );
}

OrderItem.propTypes = {
  isLast: PropTypes.bool,
  item: PropTypes.shape({
    name: PropTypes.string,
    investment_option_id: PropTypes.string,
    date: PropTypes.string,
    totalWithdraw: PropTypes.number
  }),
};

function OrderItem({ item, isLast }) {
  const { name, date, totalWithdraw } = item;
  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot color={getColorByType()} />
        {!isLast && <TimelineConnector />}
      </TimelineSeparator>
      <TimelineContent>
        <Typography variant="subtitle1">{name}</Typography>
        <Typography variant="subtitle2">{fCurrency(totalWithdraw.toFixed(2))}</Typography>
        <Typography variant="caption" sx={{ color: 'text.disabled' }}>
          {fDateTime(date)}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
}

function getColorByType() {
  const colors = ['primary', 'success', 'info', 'warning', 'error'];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}