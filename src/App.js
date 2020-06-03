import React, { useState } from 'react';
import { PizzaMap, SearchSidebar } from './components';

import './App.scss';

const App = () => {
    const [pizzaLocations, setPizzaLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [hoveredLocation, setHoveredLocation] = useState(null);
    const [sidebarHovered, setSidebarHovered] = useState(null);
    const [googleMapsSearchService, setGoogleMapsSearchService] = useState(null);

    return (
        <div className="App">
            <div className="MainMapContainer">
                <SearchSidebar
                    pizzaLocations={pizzaLocations}
                    selectedLocation={selectedLocation}
                    googleMapsSearchService={googleMapsSearchService}
                    hoveredLocation={hoveredLocation}
                    setHoveredLocation={setHoveredLocation}
                    setSidebarHovered={setSidebarHovered}
                />
                <PizzaMap
                    pizzaLocations={pizzaLocations}
                    setSelectedLocation={setSelectedLocation}
                    setPizzaLocations={setPizzaLocations}
                    googleMapsSearchService={googleMapsSearchService}
                    setGoogleMapsSearchService={setGoogleMapsSearchService}
                    sidebarHovered={sidebarHovered}
                    setHoveredLocation={setHoveredLocation}
                />
            </div>
        </div>
    );
};

export default App;
