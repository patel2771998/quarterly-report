import dynamic from 'next/dynamic';
import React, { Component } from 'react';


const Tradingview = (props) => {
    const TradingViewWidget = dynamic(() => import('react-tradingview-widget'), { ssr: false });
    const hide_legend = true;
    const allow_symbol_change = false;


    return (

        <TradingViewWidget
            symbol={props.symbol}
            details
            //hide_side_toolbar={hide_side_toolbar}
            allow_symbol_change={allow_symbol_change}
            width='1100'
            height='700'
            hide_legend={hide_legend}
            // hideideas
            // hide_legend
            // hide_side_toolbar
            // hide_top_toolbar
            //referral_id="345"
            client_id= '543'
            user_id= '234'
            //no_referral_id="true"
        // studies={studies}
        />

    );

}
export default Tradingview;
