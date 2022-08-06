import React from 'react';
import EstimatedIntrinsicVal from './compenents/estimate-intrinsic';
import EstimatedAssumedPerpetualGrowthRate from './compenents/estimate-intrinsic/EstimatedAssumedPerpetualGrowth';

const Home =()=>{
    return (
        <>
            <EstimatedIntrinsicVal />
            <EstimatedAssumedPerpetualGrowthRate />
        </>
    );
};

export default Home;