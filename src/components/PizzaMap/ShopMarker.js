import React, { useState, useEffect } from 'react';
import './ShopMarker.scss';

const ShopMarker = (props) => {
    const { setSelectedLocation, location, setMarkerHoveredLocation, sidebarHovered } = props;

    const { place_id: id } = location;

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
            onClick={() => {
                // on mobile touch, location is auto-scrolled to in location list
                if (isHovered === false) {
                    setSelectedLocation(id);
                    setIsHovered(true);
                    setMarkerHoveredLocation(id);
                } else {
                    setIsHovered(false);
                    setMarkerHoveredLocation(null);
                }
                setSelectedLocation(id);
            }}
            onMouseEnter={() => setMarkerHoveredLocation(id)}
            onMouseLeave={() => setMarkerHoveredLocation(null)}>
            <img src={`${process.env.PUBLIC_URL}/marker.svg`} alt="pizza location" />
        </div>
    );
};

export default ShopMarker;
