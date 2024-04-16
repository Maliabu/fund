import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  Modal,
  Table,
  Button,
  TableRow,
  TableHead,
  Box,
  CircularProgress,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
import { withdrawDataUrl, sendWithdrawUrl } from '../../components/Url';
import { useUserListed } from '../../_mock';
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import { FundHead, UserListToolbar } from '../../sections/@dashboard/user/list';

const TABLE_HEAD = [
  { id: 'name', label: 'Fund Name', alignRight: false },
  { id: 'company', label: 'Total withdraw requests', alignRight: false },
  { id: 'role', label: 'Number of units', alignRight: false },
  { id: 'isVerified', label: 'Allow withdraw', alignRight: false },
  { id: 'isVe', label: 'Details', alignRight: false },
];

const WithdrawList = () => {
  const { user } = useAuth();
  const { themeStretch } = useSettings();
  const userListed = useUserListed();
  
  const [userList, setUserList] = useState(userListed);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [authorizeStates, setAuthorizeStates] = useState({});
  const [Option, setOption] = useState([]);
  const [OptionUsers, setOptionUsers] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(withdrawDataUrl, {
          email: user.user.email,
        });
        setOptionUsers(response.data.withdrawData);
        setOption(response.data.fundData);
      } catch (error) {
        console.error('Error making POST request:', error.message);
      }
    };
    fetchData();
  }, [user.user.email]);

  const handleOpenModalz = (rowId) => {
    const filteredData = OptionUsers.filter(item => item.investment_option_id === rowId);
    setOptionUsers(filteredData);
    setOpen(!open);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (filterName) => {
    setFilterName(filterName);
    setPage(0);
  };

  const handleDeleteMultiUser = (selected) => {
    const deleteUsers = userList.filter((user) => !selected.includes(user.name));
    setSelected([]);
    setUserList(deleteUsers);
  };

  const handleWithdraw = (itemId) => {
    setAuthorizeStates(prevState => ({
      ...prevState,
      [itemId]: true,
    }));

    axios.post(sendWithdrawUrl, {
      option: itemId,
    })
    .then(response => {
      console.log(response);
      setAuthorizeStates(prevState => ({
        ...prevState,
        [itemId]: false,
      }));
      window.location.reload();
    })
    .catch(error => {
      console.error('Error:', error);
      setAuthorizeStates(prevState => ({
        ...prevState,
        [itemId]: false,
      }));
    });
  };

  const isNotFound = !Option.length && Boolean(filterName);

  const filteredUsers = applySortFilter(
    Option.filter((item) =>
      item.investment_class.toLowerCase().includes(filterName.toLowerCase())
    ),
    getComparator(order, orderBy),
    ''
  );


  const PopupModal = () => (
    <Modal
      open={open}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: '600px',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          maxHeight: '90vh',
          overflow: 'auto',
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Users
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Withdraw Amount</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {OptionUsers ? (
                OptionUsers.map((user, index) => (
                  <TableRow key={index}>
                    <TableCell>{user.first_name}</TableCell>
                    <TableCell>{user.last_name}</TableCell>
                    <TableCell>{user.withdraw_amount}</TableCell>
                    <TableCell>{user.created}</TableCell>
                    <TableCell>
                      <Button variant="contained" color="primary">
                        Authorize
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Modal>
  );
  
  return (
    <Page title="Funds: withdraw list">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Typography variant="h5" component="h1" gutterBottom>
          Available withdraw requests
        </Typography>
        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            onDeleteUsers={() => handleDeleteMultiUser(selected)}
          />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <FundHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={userList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {filteredUsers.map((item, index) => (
                    <TableRow hover key={index}>
                      <TableCell align="left">{item.investment_class}</TableCell>
                      <TableCell align="left">{item.total_withdraw_amount}</TableCell>
                      <TableCell align="left">{item.total_units}</TableCell>
                      <TableCell align="left">
                        <Button
                          onClick={() => handleWithdraw(item.id)}
                          variant="contained"
                          color="primary"
                          disabled={authorizeStates[item.id] || false}
                        >
                          {authorizeStates[item.id] ? "Processing..." : "Authorize"}
                        </Button>
                      </TableCell>
                      <TableCell align="right">
                        <Button onClick={() => handleOpenModalz(item.id)} variant="outlined">
                          Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>
          <PopupModal />
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={userList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(e, page) => setPage(page)}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
};



function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return array.filter((_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default WithdrawList;
