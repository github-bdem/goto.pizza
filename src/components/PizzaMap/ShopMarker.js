import React from 'react';
import './ShopMarker.scss';

const ShopMarker = props => {
  const { text, setSelectedLocation, location } = props

    return (
       <div className="shop-marker"
            onClick={() => setSelectedLocation(location.id)}
       >
          {text}
       </div>
    );
}

export default ShopMarker
