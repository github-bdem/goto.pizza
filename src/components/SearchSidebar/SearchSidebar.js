import React from 'react';
import PizzaPlaceCard from './PizzaPlaceCard';

import './SearchSidebar.scss';

const SearchSidebar = (props) => {
    const {
        googleMapsSearchService,
        selectedLocation,
        pizzaLocations,
        markerHoveredLocation,
        setMarkerHoveredLocation,
        setSidebarHovered,
    } = props;
    const noPizzaLocations = pizzaLocations.length === 0;
    return (
        <div className="SearchSidebarContainer">
            <div className="SearchSidebarBar">
                <div className="SidebarHeader">HOT PIZZA NEAR YOU</div>
                <div className={`PizzaLocationsContainer ${noPizzaLocations ? 'FlexCenter' : ''}`}>
                    {!noPizzaLocations &&
                        pizzaLocations.map((location) => (
                            <div className="PizzaPlaceCardWrapper" key={location.place_id} id={`shop-marker-${location.place_id}`}>
                                <PizzaPlaceCard
                                    selectedLocation={selectedLocation}
                                    markerHoveredLocation={markerHoveredLocation}
                                    googleMapsSearchService={googleMapsSearchService}
                                    setMarkerHoveredLocation={setMarkerHoveredLocation}
                                    setSidebarHovered={setSidebarHovered}
                                    id={location.place_id}
                                    {...location}
                                />
                            </div>
                        ))}
                    {noPizzaLocations && <div>Searching for Pizza</div>}
                </div>
            </div>
        </div>
    );
};

export default SearchSidebar;
