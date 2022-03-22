import React, { Component } from 'react';
import TradingViewWidget from 'react-tradingview-widget';


class Tradingview extends Component {
    constructor(props) {
        super(props);
    }	
render() {
    const hide_side_toolbar = false;
    const allow_symbol_change = false;
    
    return (
    
        
        <TradingViewWidget 
        symbol={this.props.symbol}
        details
        //hide_side_toolbar={hide_side_toolbar}
        allow_symbol_change={allow_symbol_change}
        // studies={studies}
        />
    
    );
}
}
export default Tradingview;
