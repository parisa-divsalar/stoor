import { FunctionComponent } from 'react';

import { Chip, ChipProps } from '@mui/material';

const MuiChips: FunctionComponent<ChipProps> = (props) => {
  const { sx, ...rest } = props;

  return <Chip {...rest} sx={{ textTransform: 'none', ...sx }} />;
};

export default MuiChips;


