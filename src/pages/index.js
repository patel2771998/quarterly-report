// import Head from 'next/head';
// import NextLink from 'next/link';
// import { useRouter } from 'next/router';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import { Facebook as FacebookIcon } from '../icons/facebook';
// import { Google as GoogleIcon } from '../icons/google';
// import ApiServices from 'src/config/ApiServices';
// import ApiEndpoint from 'src/config/ApiEndpoint';
// import { toast } from 'react-toastify';
// import { connect } from 'react-redux';
// import { Types } from '../constants/actionTypes';
// import { useEffect } from 'react';
// import Constants from 'src/config/Constants';
// const Login = (props) => {
//   useEffect(() => {
//     console.log('props....', props)
//     console.log('BASE_API_URL', Constants.BASE_API_URL);
//   }, [])
//   const router = useRouter();
//   const formik = useFormik({
//     initialValues: {
//       email: '',
//       password: ''
//     },
//     validationSchema: Yup.object({
//       email: Yup
//         .string()
//         .max(255)
//         .required(
//           'email is required'),
//       password: Yup
//         .string()
//         .max(255)
//         .required(
//           'Password is required')
//     }),
//     onSubmit: () => {
//       onLoginPress()
//     }
//   });

//   const onLoginPress = async () => {
//     props.loaderRef(true)
//     var body = {
//       'email': formik.values.email,
//       'password': formik.values.password
//     }
//     var headers = {
//       "Content-Type": "application/json",
//     }
//     var data = await ApiServices.PostApiCall(ApiEndpoint.LOGIN_USER, JSON.stringify(body), headers);
//     props.loaderRef(false)
//     if (!!data) {
//       if (data.status) {
//         data.userData.token = data.token
//         props.save_user_data({ user: data.userData });
//         router.push('/account');
//         toast.success(data.message)
//       } else {
//         toast.error(data.message)
//       }
//     } else {
//       toast.error('Something went wrong.')
//     }

//   }

//   return (
//     <>
//       <Head>
//         <title>Login | TISTrading</title>
//       </Head>
//       <Box
//         component="main"
//         sx={{
//           alignItems: 'center',
//           display: 'flex',
//           flexGrow: 1,
//           minHeight: '100%'
//         }}
//       >
//         <Container maxWidth="sm">
//           <form onSubmit={formik.handleSubmit}>
//             <Box sx={{ my: 3 }}>
//               <Box
//                 sx={{
//                   justifyContent: 'center',
//                   display: 'flex',
//                   flexGrow: 1
//                 }}
//               >
//                 <img
//                   style={{
//                     height: 100,
//                     width: 100,
//                   }}
//                   src="/static/images//logo.png" />
//               </Box>
//               <Typography
//                 color="textPrimary"
//                 variant="h4"
//               >
//                 Sign in
//               </Typography>
//               <Typography
//                 color="textSecondary"
//                 gutterBottom
//                 variant="body2"
//               >
//                 Sign in  with email
//               </Typography>
//             </Box>
//             <TextField
//               error={Boolean(formik.touched.email && formik.errors.email)}
//               fullWidth
//               helperText={formik.touched.email && formik.errors.email}
//               label="email"
//               margin="normal"
//               name="email"
//               onBlur={formik.handleBlur}
//               onChange={formik.handleChange}
//               value={formik.values.email}
//               variant="outlined"
//             />
//             <TextField
//               error={Boolean(formik.touched.password && formik.errors.password)}
//               fullWidth
//               helperText={formik.touched.password && formik.errors.password}
//               label="Password"
//               margin="normal"
//               name="password"
//               onBlur={formik.handleBlur}
//               onChange={formik.handleChange}
//               type="password"
//               value={formik.values.password}
//               variant="outlined"
//             />
//             <Box sx={{ py: 2 }}>
//               <Button
//                 color="primary"
//                 fullWidth
//                 size="large"
//                 type="submit"
//                 variant="contained"
//               >
//                 Sign In Now
//               </Button>
//             </Box>
//             <Typography
//               color="textSecondary"
//               variant="body2"
//             >
//               Don&apos;t have an account?
//               {' '}
//               <NextLink
//                 href="/register"
//               >
//                 <Link
//                   to="/register"
//                   variant="subtitle2"
//                   underline="hover"
//                   sx={{
//                     cursor: 'pointer'
//                   }}
//                 >
//                   Sign Up
//                 </Link>
//               </NextLink>
//             </Typography>
//           </form>
//         </Container>
//       </Box>
//     </>
//   );
// };

// const mapStateToProps = (state) => ({
//   profile: state.user.profile
// });

// const mapDispatchToProps = (dispatch) => ({
//   save_user_data: (data) =>
//     dispatch({ type: Types.LOGIN, payload: data }),
// });
// export default connect(mapStateToProps, mapDispatchToProps)(Login);


import Head from 'next/head';
import {
  Box,
  Button,
  Card,
  AppBar,
  CardContent,
  Toolbar,
  Typography,
  TextField,
  InputAdornment,
  SvgIcon,
} from '@mui/material';
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { NavItem } from '../components/nav-item';
import { useEffect, useState } from 'react';
import { Search as SearchIcon } from '../icons/search';
import { UserAdd as UserAddIcon } from '../icons/user-add';
import { Users as UsersIcon } from '../icons/users';
import { Lock as LockIcon } from '../icons/lock';
import { Selector as SelectorIcon } from '../icons/selector';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import ApiServices from 'src/config/ApiServices';
import ApiEndpoint from 'src/config/ApiEndpoint';


const Dashboard = (props) => {


  const [entervalue, setEnterValue] = useState()
  const get = localStorage.getItem('reduxState')
  const getV = JSON.parse(get)
  const router = useRouter();


  return (
    <>
      <AppBar position="static">
        <Toolbar>
          {/*Inside the IconButton, we 
           can render various icons*/}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            {/*This is a simple Menu 
             Icon wrapped in Icon */}
            <MenuIcon />
          </IconButton>
          <Typography variant="h6"
            component="div" sx={{ flexGrow: 1 }}>
            Reports web
          </Typography>
          <Button color="inherit"
            onClick={() => {
              router.push('/');
            }}>Home</Button>
          <Button color="inherit"
            onClick={() => {
              router.push('/login');
            }}>Login/Register</Button>
        </Toolbar>
      </AppBar>
      <Box {...props}>
        <Box sx={{ flexDirection: 'row', display: 'flex', flex: 1, m: 5 }}>
          <Box sx={{ flex: 1, flexDirection: 'row', display: 'flex' }}>
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                m: -1
              }}
            >
              <Typography
                sx={{ m: 1 }}
                variant="h4"
              >
                Ticker
              </Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <CardContent>
                <Box sx={{ maxWidth: 500 }}>
                  <TextField
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SvgIcon
                            fontSize="small"
                            color="action"
                          >
                            <SearchIcon />
                          </SvgIcon>
                        </InputAdornment>
                      )
                    }}
                    onChange={(event) => {
                      let value = event.target.value;
                      setEnterValue(value)
                    }}
                  />
                </Box>
              </CardContent>
            </Box>
            <Box sx={{ flex: 1, mt: 5 }}>
              <Button
                color="primary"
                type="submit"
                onClick={() => {
                  router.push({
                    pathname: '/report',
                    query: { data: entervalue },
                  });
                }}
                //onClick={ findReports()}
                variant="contained"
              >
                Search
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default Dashboard;
