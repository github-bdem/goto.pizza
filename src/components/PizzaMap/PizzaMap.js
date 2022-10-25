import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import ShopMarker from './ShopMarker';

import './PizzaMap.scss';

const PizzaMap = (props) => {
    const {
        setPizzaLocations,
        googleMapsSearchService,
        setGoogleMapsSearchService,
        setSelectedLocation,
        pizzaLocations,
        setMarkerHoveredLocation,
        sidebarHovered,
    } = props;

    const [currentRequestCenter, setCurrentRequestCenter] = useState({ lat: 33.8108, lng: -117.923 });
    const [initialMapCenter, setInitialMapCenter] = useState({ lat: 33.8108, lng: -117.923 });
    const [lastUpdatedZoom, setLastUpdatedZoom] = useState(15);
    const [initialLoading, setInitialLoading] = useState(true);

    const minmumCenterDeltaToTriggerUpdate = 1; // Delta is expressed in km
    const minimumZoomLevelDeltaToTriggerUpdate = 2;

    useEffect(() => {
        const geolocationOptions = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
        };
        const successFunction = (pos) => {
            const position = { lat: pos.coords.latitude, lng: pos.coords.longitude };
            setInitialMapCenter(position);
            setCurrentRequestCenter(position);
            setInitialLoading(false);
        };
        navigator.geolocation.getCurrentPosition(successFunction, () => setInitialLoading(false), geolocationOptions);
    }, []);

    const addCssClassToMapComponentChild = () => {
        //TODO: eventually refactor to not manipulate the DOM
        document.querySelector('.SearchSidebarContainer').nextSibling.firstChild.className = 'MapComponentChild'
    }

    const convertDegreesToRadians = (deg) => {
        return deg * (Math.PI / 180);
    };

    const shouldFetchNewPizzaLocations = ({ newCenter, newZoom }) => {
        /*  Checks to see if the center has moved enough or if the zoom level has changed enough from the last
            pizza locations request.  Distance calcualtion done via Haversine formula.
        */
        const lat1 = currentRequestCenter.lat;
        const lng1 = currentRequestCenter.lng;

        const lat2 = newCenter.lat;
        const lng2 = newCenter.lng;

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
        const { center, zoom } = args;
        if (shouldFetchNewPizzaLocations({ newCenter: center, newZoom: zoom })) {
            fetchNewPizzaLocations({ center, zoom });
        }
    };

    const handleNewPizzaLocationsResponse = (results, status) => {
        // eslint-disable-next-line no-undef
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            setPizzaLocations(results);
        } else {
            setPizzaLocations([]);
        }
    };

    const fetchNewPizzaLocations = ({ placesSearchService, center, zoom }) => {
        const searchRadius = 1500;

        if (!!placesSearchService) {
            let request = {
                keyword: 'pizza',
                location: center,
                radius: searchRadius,
                type: ['restaurant'],
            };
            placesSearchService.nearbySearch(request, handleNewPizzaLocationsResponse);
            setGoogleMapsSearchService(placesSearchService);
            setLastUpdatedZoom(zoom);
            setCurrentRequestCenter({ lat: center.lat(), lng: center.lng() });
        } else if (googleMapsSearchService) {
            let request = {
                keyword: 'pizza',
                // eslint-disable-next-line no-undef
                location: new google.maps.LatLng(center.lat, center.lng),
                radius: searchRadius,
                type: ['restaurant'],
            };
            googleMapsSearchService.nearbySearch(request, handleNewPizzaLocationsResponse);
            setLastUpdatedZoom(zoom);
            setCurrentRequestCenter(center);
        } else {
            console.error('Error in Pizza Map when trying to fetch new pizza locations');
        }
    };

    return (
        <>
            {!initialLoading && (
                <GoogleMapReact
                    bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY, libraries: 'places' }}
                    defaultCenter={initialMapCenter}
                    defaultZoom={15}
                    onChange={handleBoundsChange}
                    yesIWantToUseGoogleMapApiInternals
                    options={{ clickableIcons: false }}
                    onGoogleApiLoaded={({ map }) => {
                        // eslint-disable-next-line no-undef
                        const service = new google.maps.places.PlacesService(map);
                        fetchNewPizzaLocations({ placesSearchService: service, center: map.center, zoom: map.zoom });
                    }}>
                    {pizzaLocations.map((location) => (
                        <ShopMarker
                            key={location.id}
                            setSelectedLocation={setSelectedLocation}
                            setMarkerHoveredLocation={setMarkerHoveredLocation}
                            sidebarHovered={sidebarHovered}
                            lat={location.geometry.location.lat()}
                            lng={location.geometry.location.lng()}
                            text={location.name}
                            location={location}
                        />
                    ))}
                </GoogleMapReact>
            )}
            {!initialLoading && addCssClassToMapComponentChild()}
            {initialLoading && <div className="MapLoading">Loading Pizza Map</div>}
        </>
    );
};

export default PizzaMap;
