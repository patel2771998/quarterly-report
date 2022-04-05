import dynamic from 'next/dynamic';
import React, { Component, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
    Box,
    Button,
    Container,
    Link,
    Typography
  } from '@mui/material';



const Tradingview = (props) => {
    //console.log(props.symbol);
    //console.log(router.query)
    const router = useRouter();

    if(!!props.symbol){
        const {id} = router.query;
        console.log(id);
    }


    useEffect(() => {

        console.log('testx');
    // if(!router.isReady) return;
    // const query = router.query;
    // console.log(query);
    }, [router.isReady, router.query]);


    const TradingViewWidget = dynamic(() => import('react-tradingview-widget'), { ssr: false });
    const hide_legend = false;
    const allow_symbol_change = false;
    const disableFeatured = ["widget_logo", 'logo', 'tradeview'];
    const studies = [ "ROC@tv-basicstudies",
    "StochasticRSI@tv-basicstudies",
    "MASimple@tv-basicstudies"];
    const watchlist = ["AAPL",
    "IBM",
    "TSLA",
    "AMD",
    "MSFT",
    "GOOG"];

    return (
        <Box sx={{ mt: 10, maxWidth: "100%", height: "600px", minHeight: "100vh", margin: 0 }}>
            <TradingViewWidget
            symbol={props.symbol}
            //details
            //hide_side_toolbar={hide_side_toolbar}
            allow_symbol_change={allow_symbol_change}
            width='1100'
            height='700px'
            hide_legend={hide_legend}
            // hideideas
            // hide_legend
            // hide_side_toolbar
            // hide_top_toolbar
            //referral_id="345"
            // client_id= '1'
            // user_id= '1'
            // disabled_features={disableFeatured}
            autosize="true" 
            interval="D" 
            timezone="Etc/UTC" 
            theme="light" 
            style="1" 
            locale="en" 
            toolbar_bg=" #f1f3f6" 
            //enable_publishing="true" 
            withdateranges="true" 
            hide_side_toolbar="false" 
            //allow_symbol_change="true" 
            details="true" 
            hotlist="true" 
            calendar="true" 
            show_popup_button="true" 
            studies={studies}
            //watchlist={watchlist}
            //no_referral_id="true"

            // timezone= "Etc/UTC"
            // theme= "light"
            // style= "1"
            // locale= "en"
            // toolbar_bg= "#f1f3f6"
            // enable_publishing= "false"
            // hide_top_toolbar= "true"
            // withdateranges= "true"
            // range= "YTD"
            // hide_side_toolbar="false"
            // allow_symbol_change="true"
            // details="true"
            // hotlist="true"
            // calendar="true"
            // show_popup_button="true"
            // popup_width= "1000"
            // popup_height= "650"
        />
        </Box>

    );

}
export default Tradingview;
