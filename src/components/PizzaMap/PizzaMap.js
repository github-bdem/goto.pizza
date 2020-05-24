import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';

const PizzaMap = (props) => {
    const { setBounds } = props;
    const [lastUpdatedCenter, setLastUpdatedCenter] = useState({ lat: 33.8108, lng: -117.923 });
    const [lastUpdatedZoom, setLastUpdatedZoom] = useState(15);
    const minmumCenterDeltaToTriggerUpdate = 1; // Delta is expressed in km
    const minimumZoomLevelDeltaToTriggerUpdate = 2;

    const shouldFetchNewPizzaLocations = ({ newCenter, newZoom }) => {
        /*  Checks to see if the center has moved enough or if the zoom level has changed enough from the last
            pizza locations request.  Distance calcualtion done via Haversine formula.
        */
        const lat1 = lastUpdatedCenter.lat;
        const lng1 = lastUpdatedCenter.lng;

        const lat2 = newCenter.lat;
        const lng2 = newCenter.lng;

        const convertDegreesToRadians = (deg) => {
            return deg * (Math.PI / 180);
        };

        const radiusOfEarth = 6371;
        const latitudinalDistance = convertDegreesToRadians(lat2 - lat1);
        const longitudinalDistance = convertDegreesToRadians(lng2 - lng1);
        const a =
            Math.sin(latitudinalDistance / 2) * Math.sin(latitudinalDistance / 2) +
            Math.cos(convertDegreesToRadians(lat1)) *
                Math.cos(convertDegreesToRadians(lat2)) *
                Math.sin(longitudinalDistance / 2) *
                Math.sin(longitudinalDistance / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const centerDeltaTrigger = radiusOfEarth * c >= minmumCenterDeltaToTriggerUpdate;

        const zoomDeltaTrigger = Math.abs(newZoom - lastUpdatedZoom) >= minimumZoomLevelDeltaToTriggerUpdate;

        return centerDeltaTrigger || zoomDeltaTrigger;
    };

    const handleBoundsChange = (args) => {
        console.log('args', args);
        const { bounds, center, zoom } = args;
        if (shouldFetchNewPizzaLocations({ newCenter: center, newZoom: zoom })) {
            const { ne, sw } = bounds;
            const north = ne?.lat;
            const east = ne?.lng;
            const south = sw?.lat;
            const west = sw?.lng;
            setLastUpdatedCenter(center);
            setLastUpdatedZoom(zoom);
            setBounds({ north, east, south, west });
        }
    };

    return (
        <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
            defaultCenter={{ lat: 33.8108, lng: -117.923 }}
            defaultZoom={15}
            onChange={handleBoundsChange}></GoogleMapReact>
    );
};

export default PizzaMap;
