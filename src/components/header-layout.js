import { useState } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import DashboardSidebar from './dashboard-sidebar';

const DashboardLayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  paddingTop: 20,
  [theme.breakpoints.up('lg')]: {
  paddingLeft: 280
  }
}));

export const DashboardLayout = (props) => {
  const { children } = props;
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <>
     <DashboardSidebar
      />
      {/* <DashboardLayoutRoot> */}
        <Box>
          {children}
        </Box>
      {/* </DashboardLayoutRoot> */}
    </>
  );
};
