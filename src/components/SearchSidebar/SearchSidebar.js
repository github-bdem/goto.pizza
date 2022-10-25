import React, {useState} from 'react';
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
    const [lastClickedId, setLastClickedId] = useState("");
    const noPizzaLocations = pizzaLocations.length === 0;
    return (
        <div className="SearchSidebarContainer">
            <div className="SearchSidebarBar">
                <div className="SidebarHeader"><div className="SidebarHeaderText">HOT PIZZA NEAR YOU</div> <img className="touch-to-scroll-pizza-hint" src={`${process.env.PUBLIC_URL}/slide_to_scroll_mobile.svg`} alt="Touch to Scroll Pizza List" /></div>
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
                                    lastClickedId={lastClickedId}
                                    setLastClickedId={setLastClickedId}
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
