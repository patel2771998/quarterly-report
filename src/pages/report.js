import Head from 'next/head';



import {
  Box,
  Button,
  Container,
  Link,
  Typography
} from '@mui/material';
import { useState, useEffect, useLayoutEffect } from 'react';
import ApiServices from 'src/config/ApiServices';
import ApiEndpoint from 'src/config/ApiEndpoint';
import DataTable from 'react-data-table-component';
import 'react-table-hoc-fixed-columns/lib/styles.css' // important: this line must be placed after react-table css import
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
// import StockChart from './StockChart';
// import ChartStock from '../components/chart-stock';
import Tradingview from './tradingview';
//import TradingViewWidget from 'react-tradingview-widget';
// import {Helmet} from "react-helmet";



const Report = (props) => {

  const columns = [
    {
      name: 'Date',
      selector: row => row.date,
      width: '100px',
      style: {
        background: '#61dafb !important',
        width: '10em',
        left: '0',
        top: '6px',
        flexgrow: 'unset',
        background: 'white',
        position: 'sticky',
        zIndex: 1,
        background: '#eee',
      }
    },
    {
      name: 'Gloss Profit',
      selector: row => row.grossProfit,
      width: '100px'
    },
    {
      name: 'Total Revenue',
      selector: row => row.totalRevenue,
      width: '120px'
    },
    {
      name: 'Cost Of Revenue',
      selector: row => row.costOfRevenue,
      width: '120px'
    },
    {
      name: 'Cost Of Goods And Services Sold',
      selector: row => row.costofGoodsAndServicesSold,
    },
    {
      name: 'Selling General And Administrative',
      selector: row => row.sellingGeneralAndAdministrative,
    },
    {
      name: 'Research And Development',
      selector: row => row.researchAndDevelopment,
    },
    {
      name: 'Operating Expenses',
      selector: row => row.operatingExpenses,
    },
    {
      name: 'NetInterest Income',
      selector: row => row.netInterestIncome,
    },
    {
      name: 'Interest Income',
      selector: row => row.interestIncome,
      width: '12em'
    },
    {
      name: 'Interest Expense',
      selector: row => row.interestExpense,
    },
    {
      name: 'Non Interest Income',
      selector: row => row.nonInterestIncome,
    },
    {
      name: 'Other Non Operating Income',
      selector: row => row.otherNonOperatingIncome,
    },
    {
      name: 'Income Before Tax',
      selector: row => row.incomeBeforeTax,
    },
    {
      name: 'Income Tax Expense',
      selector: row => row.incomeTaxExpense,
    },
    {
      name: 'Interest And Debt Expense',
      selector: row => row.interestAndDebtExpense,
    },
    {
      name: 'Net Income From Continuing Operations',
      selector: row => row.netIncomeFromContinuingOperations,
      //width: '125px'
    },
    {
      name: 'Comprehensive Income Net Of Tax',
      selector: row => row.comprehensiveIncomeNetOfTax,
    },
    {
      name: 'Net Income',
      selector: row => row.netIncome,
    },
  ];
  const [isfollow, setFollow] = useState(false);

  const symbol = !!props.reportdata && !!!!props.reportdata.symbol ? props.reportdata.symbol : ''

  useEffect(() => {
    chekFollow(symbol)
  }, [])

  const customStylesTable = {
    rows: {
      style: { position: 'relative' }
    },
    head: {
      style: {
        zIndex: 3,
      },
    },

  };
  const numFormatter = (num) => {
      let ignoreMinus = false;
      var result = num;
      if(num < 0){
          num = Math.abs(num);
          console.log(num);
          ignoreMinus = true;
      }

      if(num > 999 && num < 1000000){
        result =  (num/1000).toFixed(1) + 'K'; // convert to K for number from > 1000 < 1 million 
      }else if(num > 1000000){
        result =  (num/1000000).toFixed(1) + 'M'; // convert to M for number from > 1 million 
      }else if(num < 900){
        result =  num; // if value < 1000, nothing to do
      }
      console.log(result, "result");
      if(ignoreMinus == true){
          return "-"+result;
      }else{
          return result;
      }
  }

  var columnData = [];
  if (!!props.reportdata && !!props.reportdata.quarterlyReports) {
    for (let index = 0; index < props.reportdata.quarterlyReports.length; index++) {
      const element = props.reportdata.quarterlyReports[index];
      var date = new Date(element.fiscalDateEnding)
      var lastDate = date.toLocaleString("en-US", { month: "short" }) + ' ' + date.getFullYear()
      var obj1 = {
        id: index,
        date: lastDate,
        // reportedcurrency: element.reportedCurrency,
        grossProfit: numFormatter(element.grossProfit),
        totalRevenue: numFormatter(element.totalRevenue),
        costOfRevenue: numFormatter(element.costOfRevenue),
        costofGoodsAndServicesSold: numFormatter(element.costofGoodsAndServicesSold),
        operatingIncome: numFormatter(element.operatingIncome),
        sellingGeneralAndAdministrative: numFormatter(element.sellingGeneralAndAdministrative),
        researchAndDevelopment: numFormatter(element.researchAndDevelopment),
        operatingExpenses: numFormatter(element.operatingExpenses),
        //investmentIncomeNet :element.investmentIncomeNet,
        netInterestIncome: numFormatter(element.netInterestIncome),
        interestIncome: numFormatter(element.interestIncome),
        interestExpense: numFormatter(element.interestExpense),
        nonInterestIncome: numFormatter(element.nonInterestIncome),
        otherNonOperatingIncome: numFormatter(element.otherNonOperatingIncome),
        // depreciation :element.depreciation,
        //depreciationAndAmortization :element.depreciationAndAmortization,
        incomeBeforeTax: numFormatter(element.incomeBeforeTax),
        incomeTaxExpense: numFormatter(element.incomeTaxExpense),
        interestAndDebtExpense: numFormatter(element.interestAndDebtExpense),
        netIncomeFromContinuingOperations: numFormatter(element.netIncomeFromContinuingOperations),
        comprehensiveIncomeNetOfTax: numFormatter(element.comprehensiveIncomeNetOfTax),
        // ebit :element.ebit,
        // ebitda :element.ebitda,
        netIncome: numFormatter(element.netIncome),
        style: { position: 'relative' }
      }

      columnData.push(obj1);

    }
  }
  const capitalizeFirstLetter = (string) => {
    if(string){
      return string.toUpperCase();
    }
    return;
  }

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <div>{children}</div>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  const followSymbol = async (props) => {
    var body = {
      "symbol": props.reportdata.symbol,
      "fiscalDateEnding": props.reportdata.quarterlyReports[0].fiscalDateEnding
    }
    var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.props.profile.token
    }
    props.props.loaderRef(true)
    var followDetail = await ApiServices.PostApiCall(ApiEndpoint.FOLLOW, JSON.stringify(body), headers)
    props.props.loaderRef(false)
    if (!!followDetail && followDetail.status == true) {
      setFollow(true)
    }

  }


  const chekFollow = async (symbol) => {
    var body = {
      "symbol": capitalizeFirstLetter(symbol),
    }
    var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.props.profile.token
    }
    props.props.loaderRef(true)
    var followCheckDetail = await ApiServices.PostApiCall(ApiEndpoint.CHECK_FOLLOW, JSON.stringify(body), headers)
    props.props.loaderRef(false)
    if (!!followCheckDetail && !!followCheckDetail.status == true) {
      setFollow(true)
    }
  }

  const unFollowSymbol = async (props) => {
    var body = {
      "symbol": props.reportdata.symbol,
      "fiscalDateEnding": props.reportdata.quarterlyReports[0].fiscalDateEnding
    }
    var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.props.profile.token
    }
    props.props.loaderRef(true)
    var followDetail = await ApiServices.PostApiCall(ApiEndpoint.UNFOLLOW, JSON.stringify(body), headers)
    props.props.loaderRef(false)
    if (!!followDetail && followDetail.status == true) {
      setFollow(false)
    }

  }
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [chartType, setchartType] = React.useState(0);
  const handleChartChange = (event, newValue) => {
    console.log(event.target.value);
    this.setState({ chartType: event.target.value });
    setchartType(newValue);
  };

  
  //   const widgetTradev= new TradingView.widget(
  //   {
  //   "autosize": true,
  //   "symbol": "NASDAQ:AAPL",
  //   "timezone": "Etc/UTC",
  //   "theme": "light",
  //   "style": "1",
  //   "locale": "in",
  //   "toolbar_bg": "#f1f3f6",
  //   "enable_publishing": true,
  //   "withdateranges": true,
  //   "range": "ALL",
  //   "hide_side_toolbar": false,
  //   "allow_symbol_change": true,
  //   "details": true,
  //   "calendar": true,
  //   "show_popup_button": true,
  //   "popup_width": "1000",
  //   "popup_height": "650",
  //   "container_id": "tradingview_9ea05"
  // });
   

  return (
    <>
      <Container>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            height: '50px',
            position: ''
            // mt: -2
          }}
        >
          <Typography
            variant="h4"
          >
            {symbol}
          </Typography>
          <Box sx={{ m: 1 }} >
            {!props.props || props.props.profile.token == undefined ?
              <Box sx={{ flex: 1 }}>
                <Typography>
                  Want to follow this stock, please
                  <Link sx={{ ml: 1 }}
                    href="/login"
                  >
                    Login
                  </Link>
                </Typography>
              </Box> :
              isfollow == false ? <Button
                color="primary"
                type="submit"
                onClick={() => {
                  followSymbol(props)
                }}
                variant="contained"
              >
                Follow
              </Button> : <Button
                color="primary"
                type="submit"
                onClick={() => {
                  unFollowSymbol(props)
                }}
                variant="contained"
              >
                UnFollow
              </Button>}
          </Box>
        </Box>

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Chart" {...a11yProps(0)} />
            <Tab label="Earning Report" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={1}>
          <Box
            component="main"
            sx={{
              flexGrow: 1
            }}
          >
            <Box sx={{ height: '80vh', width: '100%', mb: '50px' }}>
              <DataTable
                columns={columns}
                data={columnData}
                fixedHeader
                fixedHeaderScrollHeight="80vh"
                customStyles={customStylesTable}
              />
            </Box>
          </Box>
        </TabPanel>
        <TabPanel value={value} index={0}>
          <Box sx={{ mb: 10 }}>
            <div>
              <Tradingview symbol={symbol}/>
            </div>
          </Box>
        </TabPanel>
      </Container>
    </>
  );
}

export default Report;
