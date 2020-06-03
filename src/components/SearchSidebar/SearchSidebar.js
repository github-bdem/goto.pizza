import React from 'react';
import PizzaPlaceCard from './PizzaPlaceCard';

import './SearchSidebar.scss';

const SearchSidebar = (props) => {
    const {
        googleMapsSearchService,
        selectedLocation,
        pizzaLocations,
        hoveredLocation,
        setHoveredLocation,
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
                            <div className="PizzaPlaceCardWrapper" key={location.id}>
                                <PizzaPlaceCard
                                    selectedLocation={selectedLocation}
                                    hoveredLocation={hoveredLocation}
                                    googleMapsSearchService={googleMapsSearchService}
                                    setHoveredLocation={setHoveredLocation}
                                    setSidebarHovered={setSidebarHovered}
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
