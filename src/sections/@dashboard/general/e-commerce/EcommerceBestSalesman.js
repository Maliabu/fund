

import {
  Box,
  Card,
  Table,
  Avatar,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  CardHeader,
  Typography,
  TableContainer,
} from '@mui/material';
// utils
import { fCurrency } from '../../../../utils/formatNumber';

// components

import Scrollbar from '../../../../components/Scrollbar';
import useAuth from '../../../../hooks/useAuth';
// ----------------------------------------------------------------------

export default function EcommerceBestSalesman() {

  const { user } = useAuth();
  const fund = user.fundV.fundusers;
  const {currency} = user;
  

  const handleRowClick = (row) => {
    // Store the clicked row in local storage

    localStorage.setItem('selectedRow', JSON.stringify(row));
    // Redirect to analytics page
    window.location.href="./analytics"
  };

  return (
    <Card>
      <CardHeader title="Fund manager" sx={{ mb: 3 }} />
      <Scrollbar>
        <TableContainer sx={{ minWidth: 120 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>List of your funds under managment</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fund && fund.map((row, index) => (
                <TableRow key={row.name}>
                  <TableCell onClick={() => {
                  
                  handleRowClick(row.investment_option_id)
                    
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                       <Avatar alt={row.name} src={`/covers/cover_${index % 24 + 1}.jpg`} />
                      <Box sx={{ ml: 2 }}>
                        <Typography variant="subtitle2"> {row.name}</Typography>
                        <Typography variantm="body2" sx={{ color: 'text.secondary' }}>
                       {currency} {fCurrency(row.totalWorth)}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>
    </Card>
  );
}
