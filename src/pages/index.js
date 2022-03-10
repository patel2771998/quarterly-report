
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


const Dashboard = (props) => {

  const [entervalue, setEnterValue] = useState()
  const [profile, setProfile] = useState(props.profile);

  const router = useRouter();

  useEffect(() => {
    setProfile(props.profile)
  }, [props.profile])
  return (
    <>
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
