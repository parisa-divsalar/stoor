import { Box, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

export const UsersRoot = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  backgroundColor: theme.palette.background.default,
}));

export const PageTitle = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.5),
}));

export const ControlsRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  flexWrap: 'wrap',
  justifyContent: 'space-between',
}));

export const SearchField = styled(TextField)(({ theme }) => ({
  minWidth: 220,
  maxWidth: 420,
  flex: 1,
  '& .MuiOutlinedInput-root': {
    backgroundColor: theme.palette.background.paper,
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));

export const TableWrapper = styled(Box)(() => ({
  width: '100%',
}));
