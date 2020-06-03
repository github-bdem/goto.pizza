import React from 'react';
import './ShopMarker.scss';

const ShopMarker = (props) => {
    const { setSelectedLocation, location } = props;

    return (
        <div className="shop-marker" onClick={() => setSelectedLocation(location.id)}>
            <img src={`${process.env.PUBLIC_URL}/marker.svg`} alt="pizza location" />
        </div>
    );
};

export default ShopMarker;
