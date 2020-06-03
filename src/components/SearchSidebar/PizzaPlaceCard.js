import React, { useState, useEffect, useCallback } from 'react';

import './SearchSidebar.scss';

const PizzaPlaceCard = (props) => {
    const {
        name,
        rating,
        user_ratings_total,
        googleMapsSearchService,
        selectedLocation,
        id,
        place_id,
        hoveredLocation,
        setHoveredLocation,
        setSidebarHovered,
    } = props;
    const [isExpanded, setIsExpanded] = useState(false);
    const [isLoadingMoreDetails, setIsLoadingMoreDetails] = useState(false);
    const [detailedInformation, setDetailedInformation] = useState({});
    const [isHovered, setIsHovered] = useState(false);

    const requestPlaceDetails = useCallback(() => {
        setIsLoadingMoreDetails(true);
        setIsExpanded(true);
        const request = {
            placeId: place_id,
            fields: ['formatted_phone_number', 'formatted_address', 'url', 'opening_hours'],
        };

        const onResponse = (place, status) => {
            // eslint-disable-next-line no-undef
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                setDetailedInformation(place);
                setIsLoadingMoreDetails(false);
            }
        };
        googleMapsSearchService.getDetails(request, onResponse);
    }, [googleMapsSearchService, place_id]);

    useEffect(() => {
        if (id === selectedLocation && !isExpanded) {
            requestPlaceDetails();
        }
    }, [id, isExpanded, requestPlaceDetails, selectedLocation]);

    useEffect(() => {
        if (id === hoveredLocation) {
            setIsHovered(true);
        } else {
            setIsHovered(false);
        }
    }, [hoveredLocation, id]);

    return (
        <div
            className={`PizzaPlaceCard ${isHovered ? 'PizzaLocationHovered' : ''}`}
            onMouseEnter={() => {
                setHoveredLocation(id);
                setSidebarHovered(id);
            }}
            onMouseLeave={() => {
                setSidebarHovered(null);
                setHoveredLocation(null);
            }}>
            <h3>{name}</h3>
            <div>Average Rating: {rating}</div>
            <div>Total Reviews: {user_ratings_total}</div>
            {!isExpanded && (
                <button className="LoadMoreInfoButton" onClick={requestPlaceDetails}>
                    Load More Info
                </button>
            )}
            {isExpanded && (
                <div>
                    {isLoadingMoreDetails && <div>Loading more details...</div>}
                    {!isLoadingMoreDetails && (
                        <div>
                            {detailedInformation?.opening_hours?.isOpen() && <div>Open Now</div>}
                            <div>Phone Number: {detailedInformation.formatted_phone_number}</div>
                            <div>Address: {detailedInformation.formatted_address}</div>
                            <a href={detailedInformation.url}>View More Information on Google</a>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default PizzaPlaceCard;
