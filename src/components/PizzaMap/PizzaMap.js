import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';

const PizzaMap = () => {
    const [center, setCenter] = useState({ lat: 59.95, lng: 30.33 });
    const [zoom, setZoom] = useState(11);

    return (
        <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
            defaultCenter={center}
            defaultZoom={zoom}
        />
    );
};

export default PizzaMap;
