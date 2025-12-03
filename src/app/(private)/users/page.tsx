'use client';

import { useEffect, useMemo, useState } from 'react';

import SearchIcon from '@mui/icons-material/Search';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
  CircularProgress,
} from '@mui/material';

import MuiButton from '@/components/UI/MuiButton';
import MuiTable from '@/components/UI/MuiTable';
import { useUsersStore } from '@/store/users';
import { IUser } from '@/store/users/type';

import { PageTitle, UsersRoot, ControlsRow, SearchField, TableWrapper } from './styled';

interface TableRow {
  id: number;
  name: string;
  email: string;
  phone: string;
  city: string;
  company: string;
  user: IUser;
  handleDetails: (user: IUser) => void;
}

const columns = [
  { id: 'name', label: 'Name' },
  { id: 'email', label: 'Email' },
  { id: 'phone', label: 'Phone', sortable: false },
  { id: 'city', label: 'City' },
  { id: 'company', label: 'Company', sortable: false },
  {
    id: 'action',
    label: 'Details',
    align: 'center' as const,
    sortable: false,
    render: (_: any, row: TableRow) => (
      <MuiButton color='secondary' variant='outlined' size='small' onClick={() => row.handleDetails(row.user)}>
        View
      </MuiButton>
    ),
  },
];
const UsersPage = () => {
  const theme = useTheme();
  const fullScreenDialog = useMediaQuery(theme.breakpoints.down('sm'));

  const users = useUsersStore((state) => state.users);
  const loading = useUsersStore((state) => state.loading);
  const error = useUsersStore((state) => state.error);
  const fetchUsers = useUsersStore((state) => state.fetchUsers);

  const [query, setQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const normalizedQuery = query.trim().toLowerCase();

  const visibleUsers = useMemo(() => {
    if (!normalizedQuery) return users;

    return users.filter((user) => {
      const searchFields = [user.name, user.email, user.phone];
      return searchFields.some((field) => field.toLowerCase().includes(normalizedQuery));
    });
  }, [normalizedQuery, users]);

  const tableData = useMemo<TableRow[]>(() => {
    return visibleUsers.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      city: user.address.city,
      company: user.company.name,
      user,
      handleDetails: setSelectedUser,
    }));
  }, [visibleUsers]);

  const handleCloseDialog = () => setSelectedUser(null);

  return (
    <UsersRoot>
      <PageTitle>
        <Typography component='h5' fontWeight='600'>
          Users
        </Typography>
        <Typography color='text.secondary' variant='body2'>
          {loading ? 'Loading latest users...' : `${users.length} users available`}
        </Typography>
      </PageTitle>

      <ControlsRow>
        <SearchField
          placeholder='Search by name, email or phone'
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon fontSize='small' />
              </InputAdornment>
            ),
          }}
        />
        <Button variant='contained' onClick={() => fetchUsers()} disabled={loading}>
          Refresh
        </Button>
      </ControlsRow>

      {error && (
        <Typography color='error' variant='body2'>
          {error}
        </Typography>
      )}

      <TableWrapper>
        {loading && users.length === 0 ? (
          <Stack direction='row' alignItems='center' justifyContent='center' sx={{ py: theme.spacing(6) }}>
            <CircularProgress size={24} />
          </Stack>
        ) : (
          <MuiTable
            columns={columns}
            data={tableData}
            pagination
            defaultRowsPerPage={5}
            rowsPerPageOptions={[5, 10, 25]}
            onRowClick={(row) => setSelectedUser(row.user)}
          />
        )}
      </TableWrapper>

      <Dialog
        open={Boolean(selectedUser)}
        onClose={handleCloseDialog}
        fullScreen={fullScreenDialog}
        fullWidth
        maxWidth='sm'
      >
        <DialogTitle>جزئیات کاربر</DialogTitle>
        <DialogContent dividers>
          {selectedUser && (
            <Stack spacing={1.5}>
              <Typography variant='subtitle2'>Name</Typography>
              <Typography>{selectedUser.name}</Typography>

              <Typography variant='subtitle2'>Email</Typography>
              <Typography>{selectedUser.email}</Typography>

              <Typography variant='subtitle2'>Phone</Typography>
              <Typography>{selectedUser.phone}</Typography>

              <Typography variant='subtitle2'>Website</Typography>
              <Typography>{selectedUser.website}</Typography>

              <Typography variant='subtitle2'>Company</Typography>
              <Typography>{selectedUser.company.name}</Typography>

              <Typography variant='subtitle2'>Address</Typography>
              <Typography>
                {selectedUser.address.suite}, {selectedUser.address.street}, {selectedUser.address.city} (
                {selectedUser.address.zipcode})
              </Typography>
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </UsersRoot>
  );
};

export default UsersPage;
