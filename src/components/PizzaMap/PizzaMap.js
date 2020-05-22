import React, { useState } from 'react';
import { Map, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';

const PizzaMap = () => {
    const [position] = useState([51.505, -0.09]);
    const [zoom] = useState(13);

    return (
        <Map center={position} zoom={zoom} style={{ height: '100%' }} zoomControl={false}>
            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
            <ZoomControl position={'bottomright'} />
        </Map>
    );
};

export default PizzaMap;
