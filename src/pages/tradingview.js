import dynamic from 'next/dynamic';
import React, { Component } from 'react';


const Tradingview = (props) => {
    const TradingViewWidget = dynamic(() => import('react-tradingview-widget'), { ssr: false });
    const hide_side_toolbar = false;
    const allow_symbol_change = false;


    return (


        <TradingViewWidget
            symbol={props.symbol}
            details
            //hide_side_toolbar={hide_side_toolbar}
            allow_symbol_change={allow_symbol_change}
        // studies={studies}
        />

    );

}
export default Tradingview;
