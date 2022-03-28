import { useState } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import DashboardSidebar from './dashboard-sidebar';

// const DashboardLayoutRoot = styled('div')(({ theme }) => ({
//   display: 'flex',
//   flex: '1 1 auto',
//   maxWidth: '100%',
//   paddingTop: 20,
//   [theme.breakpoints.up('lg')]: {
//   paddingLeft: 280
//   }
// }));

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
      <Box sx={{
        color: 'inherit',
        fontWeight: 600,
        fontSize: "0.70em",
        backgroundColor: 'rgb(255 255 255)',
        borderTop: "1px solid #E7E7E7",
        textAlign: "center",
        //padding: "10px",
        //position: "fixed",
        left: "0",
        paddingTop: "10px",
        bottom: "0",
        height: "40px",
        width: "100%",
      }}>
        Design and Developed by @Think Info Services
      </Box>
    </>
  );
};
