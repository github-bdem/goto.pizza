import React, { useState } from 'react';
import { PizzaMap, SearchSidebar, GithubLink } from './components';

import './App.scss';

const App = () => {
    const [pizzaLocations, setPizzaLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [markerHoveredLocation, setMarkerHoveredLocation] = useState(null);
    const [sidebarHovered, setSidebarHovered] = useState(null);
    const [googleMapsSearchService, setGoogleMapsSearchService] = useState(null);

    return (
        <div className="App">
            <GithubLink />
            <div className="MainMapContainer">
                <SearchSidebar
                    pizzaLocations={pizzaLocations}
                    selectedLocation={selectedLocation}
                    googleMapsSearchService={googleMapsSearchService}
                    markerHoveredLocation={markerHoveredLocation}
                    setMarkerHoveredLocation={setMarkerHoveredLocation}
                    setSidebarHovered={setSidebarHovered}
                />
                <PizzaMap
                    pizzaLocations={pizzaLocations}
                    setSelectedLocation={setSelectedLocation}
                    setPizzaLocations={setPizzaLocations}
                    googleMapsSearchService={googleMapsSearchService}
                    setGoogleMapsSearchService={setGoogleMapsSearchService}
                    sidebarHovered={sidebarHovered}
                    setMarkerHoveredLocation={setMarkerHoveredLocation}
                />
            </div>
        </div>
    );
};

export default App;
