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
import ReactTable from 'react-table';
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import DataTable from 'react-data-table-component';
import { Search as SearchIcon } from '../icons/search';

//import "react-table/react-table.css";
import withFixedColumns from 'react-table-hoc-fixed-columns';
import 'react-table-hoc-fixed-columns/lib/styles.css' // important: this line must be placed after react-table css import



const Pattern = (props) => {

  const columns = [
   
    {
      name: 'Date',
      selector: row => row.date,
      fixed: true,
    },
    // {
    //   name: 'Currency',
    //   selector: row => row.reportedcurrency,
    // },
    {
      name: 'GlossProfit',
      selector: row => row.grossProfit,
    },
    {
      name: 'totalRevenue',
      selector: row => row.totalRevenue,
    },
    {
      name: 'costOfRevenue',
      selector: row => row.costOfRevenue,
    },
    {
      name: 'costofGoodsAndServicesSold',
      selector: row => row.costofGoodsAndServicesSold,
    },
    {
      name: 'sellingGeneralAndAdministrative',
      selector: row => row.sellingGeneralAndAdministrative,
    },
    {
      name: 'researchAndDevelopment',
      selector: row => row.researchAndDevelopment,
    },
    {
      name: 'operatingExpenses',
      selector: row => row.operatingExpenses,
    },
    {
      name: 'investmentIncomeNet',
      selector: row => row.investmentIncomeNet,
    },
    {
      name: 'netInterestIncome',
      selector: row => row.netInterestIncome,
    },
    {
      name: 'interestIncome',
      selector: row => row.interestIncome,
    },
    {
      name: 'interestExpense',
      selector: row => row.interestExpense,
    },
    {
      name: 'nonInterestIncome',
      selector: row => row.nonInterestIncome,
    },
    {
      name: 'otherNonOperatingIncome',
      selector: row => row.otherNonOperatingIncome,
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
    },
    {
      name: 'incomeTaxExpense',
      selector: row => row.incomeTaxExpense,
    },
    {
      name: 'interestAndDebtExpense',
      selector: row => row.interestAndDebtExpense,
    },
    {
      name: 'netIncomeFromContinuingOperations',
      selector: row => row.netIncomeFromContinuingOperations,
    },
    {
      name: 'comprehensiveIncomeNetOfTax',
      selector: row => row.comprehensiveIncomeNetOfTax,
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
    },
    

  ];

  
  var columnData = [];
  const ExpandedComponent = ({ data1 }) => <pre>{JSON.stringify(data1, null, 2)}</pre>;
  const [data, setData] = useState('');
  const [limit, setLimit] = useState(0);


  const get = localStorage.getItem('reduxState')
  const getV = JSON.parse(get)

  useEffect(async () =>
    findReports(), [])

  const symbol = props.router.query.data
  // console.log(props.router.query.data);

  const findReports = async () => {
   
    if (!!symbol) {
      var obj = {
        "symbol": symbol.toUpperCase()
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
            date:  lastDate,
           // reportedcurrency: element.reportedCurrency,
            grossProfit: element.grossProfit,
            totalRevenue: element.totalRevenue,
            costOfRevenue:element.costOfRevenue,
            costofGoodsAndServicesSold :element.costofGoodsAndServicesSold,
            operatingIncome :element.operatingIncome,
            sellingGeneralAndAdministrative :element.sellingGeneralAndAdministrative,
            researchAndDevelopment :element.researchAndDevelopment,
            operatingExpenses :element.operatingExpenses,
            investmentIncomeNet :element.investmentIncomeNet,
            netInterestIncome :element.netInterestIncome,
            interestIncome :element.interestIncome,
            interestExpense :element.interestExpense,
            nonInterestIncome :element.nonInterestIncome,
            otherNonOperatingIncome :element.otherNonOperatingIncome,
           // depreciation :element.depreciation,
            //depreciationAndAmortization :element.depreciationAndAmortization,
            incomeBeforeTax :element.incomeBeforeTax,
            incomeTaxExpense :element.incomeTaxExpense,
            interestAndDebtExpense :element.interestAndDebtExpense,
            netIncomeFromContinuingOperations :element.netIncomeFromContinuingOperations,
            comprehensiveIncomeNetOfTax :element.comprehensiveIncomeNetOfTax,
           // ebit :element.ebit,
           // ebitda :element.ebitda,
            netIncome :element.netIncome
          }

          columnData.push(obj1);

        }
        console.log(columnData);
        setData(columnData)

      }
      else {
        toast.error('not reasult found')
      }
    }

  }
console.log(columnData, "ew" , data);

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
      <DataTable
        columns={columns}
        data={data}
        fixedHeader
        fixedHeaderScrollHeight="600px"
      />
    </>
  );

}
// const mapStateToProps = (state) => ({
//   profile: state.user.profile
// });

// const mapDispatchToProps = (dispatch) => ({
//   save_user_data: (data) =>
//       dispatch({ type: Types.LOGIN, payload: data }),
// });
export default (withRouter(Pattern));
