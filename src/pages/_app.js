import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { CssBaseline, CircularProgress, Box } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { createEmotionCache } from '../utils/create-emotion-cache';
import { theme } from '../theme';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import configureStore from '../store/configureStore';
import { Provider } from 'react-redux';
import { useEffect, useState } from 'react';

const clientSideEmotionCache = createEmotionCache();
const store = configureStore()
const App = (props) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isProgress, setIsProgress] = useState(false)
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => page);
  store.subscribe(() => {
    localStorage.setItem('reduxState', JSON.stringify(store.getState()))
  })

  useEffect(() => {
    var persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {};
    if (!!persistedState && !!persistedState.user && !!persistedState.user.profile.token) {
      setIsLoaded(true)
    } else {
      props.router.push('/');
      setTimeout(() => {
        setIsLoaded(true)
      }, 300);
    }
  }, [])

  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <Head>
          <title>
            TISTrading
          </title>
          <meta
            name="viewport"
            content="initial-scale=1, width=device-width"
          />
        </Head>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {isProgress && <Box sx={{ display: 'flex', position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, justifyContent: 'center', alignItems: 'center', zIndex: 10 }}>
              <CircularProgress color={'primary'} />
            </Box>}
            {isLoaded ? getLayout(<Component loaderRef={setIsProgress} {...pageProps} />) : null}
          </ThemeProvider>
        </LocalizationProvider>
        <ToastContainer theme='colored' />
      </CacheProvider>
    </Provider>
  );
};

export default App;
