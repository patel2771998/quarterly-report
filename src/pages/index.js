
import Head from 'next/head';
import {
  Box,
  Button,
  CardContent,
  Typography,
  TextField,
  InputAdornment,
  SvgIcon,
} from '@mui/material';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { Search as SearchIcon } from '../icons/search';
import { useRouter } from 'next/router';
import { DashboardLayout } from '../components/header-layout';
import ApiServices from 'src/config/ApiServices';
import { toast } from 'react-toastify';
import ApiEndpoint from 'src/config/ApiEndpoint';
import Report from './report';

const Dashboard = (props) => {

  const [entervalue, setEnterValue] = useState()
  const [profile, setProfile] = useState(props.profile);
  const [result, setResult] = useState(false)
  const [data, setData] = useState(false);
  const [resultData, setResultData] = useState(false);

  const router = useRouter();

  const capitalizeFirstLetter = (string) => {
    return string.toUpperCase();
  }
  const findReports = async (symbol1) => {
    var obj = {
      "symbol": capitalizeFirstLetter(symbol1)
    }
    var headers = {
      "Content-Type": "application/json",
    }
    props.loaderRef(true)
    var reportDetail = await ApiServices.PostApiCall(ApiEndpoint.GET_REPORT, JSON.stringify(obj), headers)
    props.loaderRef(false)
    if (!!reportDetail && reportDetail.status == true) {
      setResult(false)
      setData(reportDetail.data)
      setResultData(true)

    }
    else {
      setResultData(false)
      setResult(true)
    }
  }
  useEffect(() => {
    setProfile(props.profile)
  }, [props.profile])


  return (
    <>
      <Box {...props}>
        <Box>
          <Box sx={{ flexDirection: 'row', display: 'flex', flex: 1, mt: 4, width: '50%', m: 'auto' }}>
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
                <form onSubmit={(event) => {
                  findReports(entervalue);
                  event.preventDefault();
                  return false;
                }}>
                  <CardContent>
                    <Box sx={{
                      width: 400
                    }}>
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
                </form>
              </Box>
              <Box sx={{ flex: 1, mt: 5 }}>
                <Button
                  color="primary"
                  type="submit"
                  onClick={() => {
                    findReports(entervalue)
                  }}
                  variant="contained"
                >
                  Search
                </Button>
              </Box>
            </Box>
          </Box>
          <Box sx={{
            alignItems: 'center',
            display: 'flex',
            ml: '40%'
          }}>
            {result == true ? <Typography>
              Result Not Found
            </Typography> : ''}
          </Box>
          {resultData == true ? <Report sx={{ height: '100vh' }} reportdata={data} props={props}
          /> : ''}
        </Box>
      </Box>
    </>
  )
}


Dashboard.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);


const mapStateToProps = (state) => ({
  profile: state.user.profile
});

const mapDispatchToProps = (dispatch) => ({
  save_user_data: (data) =>
    dispatch({ type: Types.LOGIN, payload: data }),
});
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
