import Head from 'next/head';

import {
  Box,
  Button,
  Container,
  Touchable,
  Link,
  Toolbar,
  Card,
  CardContent,
  PerfectScrollbar,
  TextField,
  InputAdornment, TableCell,
  TablePagination,
  SvgIcon, Table, TableHead, TableBody, TableRow, Typography
} from '@mui/material';
import { useRouter, withRouter } from 'next/router';
import { useState, useEffect, useLayoutEffect } from 'react';
import ApiServices from 'src/config/ApiServices';
import ApiEndpoint from 'src/config/ApiEndpoint';
import { DashboardLayout } from '../components/header-layout';
import { toast } from 'react-toastify';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import DataTable from 'react-data-table-component';
import 'react-table-hoc-fixed-columns/lib/styles.css' // important: this line must be placed after react-table css import
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Chart from './Chart';

const Report = (props) => {

  const router = useRouter();
  const columns = [
    {
      name: 'Date',
      selector: row => row.date,
      width: '100px',
      style: {
        background: '#61dafb !important',
        width: '16em',
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
      selector: row => row.grossProfit
    },
    {
      name: 'Total Revenue',
      selector: row => row.totalRevenue,
    },
    {
      name: 'Cost Of Revenue',
      selector: row => row.costOfRevenue,
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
      width: '125px'
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

  console.log(props.props)
  
  const [data, setData] = useState('');
  const [isfollow, setFollow] = useState(false);
  const [rowdata, setRowData] = useState(0);
  const [sym, setSym] = useState('')

  const symbol = props.reportdata.symbol

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
  var columnData = [];
  for (let index = 0; index < props.reportdata.quarterlyReports.length; index++) {
    const element = props.reportdata.quarterlyReports[index];
    var date = new Date(element.fiscalDateEnding)
    var lastDate = date.toLocaleString("en-US", { month: "short" }) + ' ' + date.getFullYear()
    var obj1 = {
      id: index,
      date: lastDate,
      // reportedcurrency: element.reportedCurrency,
      grossProfit: element.grossProfit,
      totalRevenue: element.totalRevenue,
      costOfRevenue: element.costOfRevenue,
      costofGoodsAndServicesSold: element.costofGoodsAndServicesSold,
      operatingIncome: element.operatingIncome,
      sellingGeneralAndAdministrative: element.sellingGeneralAndAdministrative,
      researchAndDevelopment: element.researchAndDevelopment,
      operatingExpenses: element.operatingExpenses,
      //investmentIncomeNet :element.investmentIncomeNet,
      netInterestIncome: element.netInterestIncome,
      interestIncome: element.interestIncome,
      interestExpense: element.interestExpense,
      nonInterestIncome: element.nonInterestIncome,
      otherNonOperatingIncome: element.otherNonOperatingIncome,
      // depreciation :element.depreciation,
      //depreciationAndAmortization :element.depreciationAndAmortization,
      incomeBeforeTax: element.incomeBeforeTax,
      incomeTaxExpense: element.incomeTaxExpense,
      interestAndDebtExpense: element.interestAndDebtExpense,
      netIncomeFromContinuingOperations: element.netIncomeFromContinuingOperations,
      comprehensiveIncomeNetOfTax: element.comprehensiveIncomeNetOfTax,
      // ebit :element.ebit,
      // ebitda :element.ebitda,
      netIncome: element.netIncome,
      style: { position: 'relative' }
    }

    columnData.push(obj1);
 
  }
  const capitalizeFirstLetter = (string) => {
    return string.toUpperCase();
  }

  // const findReports = async (symbol1) => {
  //   var obj = {
  //     "symbol": capitalizeFirstLetter(symbol1)
  //   }
  //   var headers = {
  //     "Content-Type": "application/json",
  //   }
  //   props.loaderRef(true)
  //   var reportDetail = await ApiServices.PostApiCall(ApiEndpoint.GET_REPORT, JSON.stringify(obj), headers)
  //   props.loaderRef(false)
  //   //// console.log(reportDetail)
  //   if (!!reportDetail && reportDetail.status == true) {
  //     //// console.log(reportDetail.data.quarterlyReports.length)
  //     var reportRowList = []
  //     for (let index = 0; index < reportDetail.data.quarterlyReports.length; index++) {
  //       const element = reportDetail.data.quarterlyReports[index];
  //       var date = new Date(element.fiscalDateEnding)
  //       var lastDate = date.toLocaleString("en-US", { month: "short" }) + ' ' + date.getFullYear()
  //       var obj1 = {
  //         id: index,
  //         date: lastDate,
  //         // reportedcurrency: element.reportedCurrency,
  //         grossProfit: element.grossProfit,
  //         totalRevenue: element.totalRevenue,
  //         costOfRevenue: element.costOfRevenue,
  //         costofGoodsAndServicesSold: element.costofGoodsAndServicesSold,
  //         operatingIncome: element.operatingIncome,
  //         sellingGeneralAndAdministrative: element.sellingGeneralAndAdministrative,
  //         researchAndDevelopment: element.researchAndDevelopment,
  //         operatingExpenses: element.operatingExpenses,
  //         //investmentIncomeNet :element.investmentIncomeNet,
  //         netInterestIncome: element.netInterestIncome,
  //         interestIncome: element.interestIncome,
  //         interestExpense: element.interestExpense,
  //         nonInterestIncome: element.nonInterestIncome,
  //         otherNonOperatingIncome: element.otherNonOperatingIncome,
  //         // depreciation :element.depreciation,
  //         //depreciationAndAmortization :element.depreciationAndAmortization,
  //         incomeBeforeTax: element.incomeBeforeTax,
  //         incomeTaxExpense: element.incomeTaxExpense,
  //         interestAndDebtExpense: element.interestAndDebtExpense,
  //         netIncomeFromContinuingOperations: element.netIncomeFromContinuingOperations,
  //         comprehensiveIncomeNetOfTax: element.comprehensiveIncomeNetOfTax,
  //         // ebit :element.ebit,
  //         // ebitda :element.ebitda,
  //         netIncome: element.netIncome,
  //         style: { position: 'relative' }
  //       }

  //       columnData.push(obj1);

  //     }
  //     setRowData(columnData)
  //     setData(reportDetail.data)
  //   }
  //   else {
  //     toast.error('not reasult found')
  //   }
  // }

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
            <Typography>{children}</Typography>
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
      // console.log(followDetail)
      // console.log(isfollow)
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

  return (
    <>
      <Container sx={{height:'100vh'}}>
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
            {data.symbol}
          </Typography>
          <Box sx={{ m: 1 }} >
            {props.props.profile.token == undefined ?
              <Box sx={{flex:1}}>
                <Typography>
                  Want to follow this stock, please 
                  <Link
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
            <Tab label="Earning Report" {...a11yProps(0)} />
            <Tab label="Chart" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
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
        <TabPanel value={value} index={1}>
          <Box sx={{mb:50}}><Chart symbol={symbol} /></Box>
        </TabPanel>
      </Container>
    </>
  );
}

export default Report;
