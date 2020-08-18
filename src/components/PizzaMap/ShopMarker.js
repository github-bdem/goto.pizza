import React, { useState, useEffect } from 'react';
import './ShopMarker.scss';

const ShopMarker = (props) => {
    const { setSelectedLocation, location, setMarkerHoveredLocation, sidebarHovered } = props;

    const { place_id } = location;
    const id = place_id

    const [isHovered, setIsHovered] = useState(null);

    useEffect(() => {
        if (id === sidebarHovered) {
            setIsHovered(true);
        } else {
            setIsHovered(false);
        }
    }, [sidebarHovered, id]);

    return (
        <div
            className={`shop-marker ${isHovered ? 'wobble-hor-bottom' : ''}`}
            onClick={() => setSelectedLocation(id)}
            onMouseEnter={() => setMarkerHoveredLocation(id)}
            onMouseLeave={() => setMarkerHoveredLocation(null)}>
            <img src={`${process.env.PUBLIC_URL}/marker.svg`} alt="pizza location" />
        </div>
    );
};

export default ShopMarker;
