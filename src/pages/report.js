import Head from 'next/head';

import {
  Box,
  Button,
  AppBar,
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
//import '../components/styles.js';
import { toast } from 'react-toastify';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import DataTable from 'react-data-table-component';
import { Search as SearchIcon } from '../icons/search';

//import "react-table/react-table.css";
import withFixedColumns from 'react-table-hoc-fixed-columns';
import 'react-table-hoc-fixed-columns/lib/styles.css' // important: this line must be placed after react-table css import
import { left } from '@popperjs/core';



const Pattern = (props) => {

  const router = useRouter();
  const columns = [

    {
      name: 'Date',
      selector: row => row.date,
      width: '100px',
    },
    // {
    //   name: 'Currency',
    //   selector: row => row.reportedcurrency,
    // },
    {
      name: 'GlossProfit',
      selector: row => row.grossProfit,
      width: '120px'
    },
    {
      name: 'totalRevenue',
      selector: row => row.totalRevenue,
      width: '125px'
    },
    {
      name: 'costOfRevenue',
      selector: row => row.costOfRevenue,
      width: '125px'
    },
    {
      name: 'costofGoodsAndServicesSold',
      selector: row => row.costofGoodsAndServicesSold,
      width: '125px'
    },
    {
      name: 'sellingGeneralAndAdministrative',
      selector: row => row.sellingGeneralAndAdministrative,
      width: '125px'
    },
    {
      name: 'researchAndDevelopment',
      selector: row => row.researchAndDevelopment,
      width: '125px'
    },
    {
      name: 'operatingExpenses',
      selector: row => row.operatingExpenses,
      width: '125px'
    },
    // {
    //   name: 'investmentIncomeNet',
    //   selector: row => row.investmentIncomeNet,
    // },
    {
      name: 'netInterestIncome',
      selector: row => row.netInterestIncome,
      width: '125px'
    },
    {
      name: 'interestIncome',
      selector: row => row.interestIncome,
      width: '125px'
    },
    {
      name: 'interestExpense',
      selector: row => row.interestExpense,
    },
    {
      name: 'nonInterestIncome',
      selector: row => row.nonInterestIncome,
      width: '125px'
    },
    {
      name: 'otherNonOperatingIncome',
      selector: row => row.otherNonOperatingIncome,
      width: '125px'
    },
    // {
    //   name: 'depreciation',
    //   selector: row => row.depreciation,
    // },
    // {
    //   name: 'depreciationAndAmortization',
    //   selector: row => row.depreciationAndAmortization,
    // },
    {
      name: 'incomeBeforeTax',
      selector: row => row.incomeBeforeTax,
      width: '125px'
    },
    {
      name: 'incomeTaxExpense',
      selector: row => row.incomeTaxExpense,
      width: '125px'
    },
    {
      name: 'interestAndDebtExpense',
      selector: row => row.interestAndDebtExpense,
      width: '125px'
    },
    {
      name: 'netIncomeFromContinuingOperations',
      selector: row => row.netIncomeFromContinuingOperations,
      width: '125px'
    },
    {
      name: 'comprehensiveIncomeNetOfTax',
      selector: row => row.comprehensiveIncomeNetOfTax,
      width: '125px'
    },
    // {
    //   name: 'ebit',
    //   selector: row => row.ebit,
    // },
    // {
    //   name: 'ebitda',
    //   selector: row => row.ebitda,
    // },
    {
      name: 'netIncome',
      selector: row => row.netIncome,
      width: '125px'
    },


  ];


  var columnData = [];
  const ExpandedComponent = ({ data1 }) => <pre>{JSON.stringify(data1, null, 2)}</pre>;
  const [data, setData] = useState('');
  const [isFollowOpen, setFollowOpen] = useState(false)
  const [rowdata, setRowData] = useState(0);

  useEffect(() => {
    if (!!props.router.query.data) {
      findReports(props.router.query.data)
    } else {
      var symbol = props.router.asPath.split('=')
      findReports(symbol[symbol.length - 1])
    }
  }, [])


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
    if (!!reportDetail && !!reportDetail.symbol) {
      var reportRowList = []
      for (let index = 0; index < reportDetail.quarterlyReports.length; index++) {
        const element = reportDetail.quarterlyReports[index];
        var date = new Date(element.fiscalDateEnding)
        var lastDate = date.toLocaleString("en-US", { month: "short" }) + ' ' + new Date().getFullYear()
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
          netIncome: element.netIncome
        }

        columnData.push(obj1);

      }
      setRowData(columnData)
      setData(reportDetail)

    }
    else {
      toast.error('not reasult found')
    }
  }

  const followSymbol = async (send) => {
    var body = {
      "symbol": send.symbol,
      "fiscalDateEnding": send.quarterlyReports[0].fiscalDateEnding
    }
    var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.profile.token
    }
    props.loaderRef(true)
    var followDetail = await ApiServices.PostApiCall(ApiEndpoint.UNFOLLOW, JSON.stringify(body), headers)
    props.loaderRef(false)
    if (!!followDetail && followDetail.status == true) {
    }

  }


  const unFollowSymbol = async (send) => {
    var body = {
      "symbol": send.symbol,
      "fiscalDateEnding": send.quarterlyReports[0].fiscalDateEnding
    }
    var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.profile.token
    }
    props.loaderRef(true)
    var followDetail = await ApiServices.PostApiCall(ApiEndpoint.FOLLOW, JSON.stringify(body), headers)
    props.loaderRef(false)
    if (!!followDetail && followDetail.status == true) {
    }

  }


  return (
    <>          
      <DashboardLayout>
      </DashboardLayout>
      <Box sx={{ flexDirection: 'row', display: 'flex', flex: 1, }}>
      <Typography
            sx={{ m: 1 }}
            variant="h4"
          >
           {data.symbol}
          </Typography>
          {props.profile.token == undefined ? <Box
          sx={{
            ml:90,
            //alignItems: 'center',
            display: 'flex-end',
            justifyContent: 'flex-end',
            //flexWrap: 'wrap',
          }}
        >
          <Typography
            sx={{ }}
            variant="h4"
          >
            please login is required follow
          </Typography>
        </Box> :
          <Box
            sx={{ flex: 1, mt: 5 }}>
            <Button
              color="primary"
              type="submit"
              onClick={() => {
                followSymbol(data)
              }}
              //onClick={ findReports()}
              variant="contained"
            >
              Follow
            </Button>
          </Box>}
      </Box>
     
      <Box sx={{ flexDirection: 'row', display: 'flex', flex: 1, }}>
        <Box sx={{ ml: 5 }}>
          <DataTable
            columns={columns}
            data={rowdata}
            fixedHeader
            fixedHeaderScrollHeight="600px"
          />
        </Box>
        

      </Box>

    </>
  );

}


const mapStateToProps = (state) => ({
  profile: state.user.profile
});

const mapDispatchToProps = (dispatch) => ({
  save_user_data: (data) =>
    dispatch({ type: Types.LOGIN, payload: data }),
});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Pattern));
