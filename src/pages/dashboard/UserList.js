import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
// import { useTheme } from '@mui/material/styles';
import {
  Card,
  Table,
  Avatar,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// _mock_
import { useUserListed } from '../../_mock/_user';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import { UserListHead, UserListToolbar } from '../../sections/@dashboard/user/list';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'Phone', label: 'Phone number', alignRight: false },

  { id: '' },
];

// ----------------------------------------------------------------------

export default function UserList() {
  // const theme = useTheme();
  const { themeStretch } = useSettings();
  const userListed = useUserListed();
  const [userList, setUserList] = useState(userListed);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (checked) => {
    if (checked) {
      const newSelecteds = userList.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  /* const handleClick = (name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  }; */

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (filterName) => {
    setFilterName(filterName);
    setPage(0);
  };

 /*  const handleDeleteUser = (userId) => {
    const deleteUser = userList.filter((user) => user.id !== userId);
    setSelected([]);
    setUserList(deleteUser);
  }; */

  const handleDeleteMultiUser = (selected) => {
    const deleteUsers = userList.filter((user) => !selected.includes(user.name));
    setSelected([]);
    setUserList(deleteUsers);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userList.length) : 0;

  useEffect(() => {
    const filteredData = applySortFilter(userListed, getComparator(order, orderBy), filterName);
    setFilteredUsers(filteredData);
    setIsDataLoaded(true);
  }, [userListed, filterName, orderBy, order]);

  const isNotFound = !filteredUsers.length && Boolean(filterName);
  
 const seeUser = (id) => {
   
   localStorage.setItem('userid', id);
   window.location.href="/dashboard/user/profile";
   
 }
  return (
    <Page title="User: List">
      <Container maxWidth={themeStretch ? false : 'lg'}>

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
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={userList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                {isDataLoaded && (
                  <TableBody>
                    {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                      const isItemSelected = selected.indexOf(row.last_name) !== -1;

                      return (
                      
                        <TableRow
                          hover
                          key={index}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                          onClick={() => seeUser(row.user_id)} // Attach click event handler here
  style={{ cursor: 'pointer' }}
                        >
                       
                          <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar alt={row.name} src={row.avatarUrl} sx={{ mr: 2 }} />
                            <Typography variant="subtitle2" noWrap>
      {row.first_name}    {row.last_name} 
                            </Typography>
                          </TableCell>
                          <TableCell align="left">{row.phoneno}</TableCell>
                          <TableCell align="left">
                         { row.email}
</TableCell>

                        </TableRow>
                      );
                    })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                )}
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
}

// ----------------------------------------------------------------------

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
    return array.filter((_user) => _user.last_name && _user.last_name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}