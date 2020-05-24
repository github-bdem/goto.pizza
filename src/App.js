import React, { useState, useEffect } from 'react';
import { PizzaMap, SearchSidebar } from './components';

import './App.scss';

const App = () => {
    const [mapCenter, setMapCenter] = useState({ lat: -0.09, lng: 51.505 });
    const [pizzaLocations, setPizzaLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);

    useEffect(() => {
        // CLEAR SELECTED LOCATION
        // CALL GMAPS API
        // SET PIZZA LOCATIONS
    }, [mapCenter]);

    return (
        <div className="App">
            <div className="MainMapContainer">
                <SearchSidebar pizzaLocations={pizzaLocations} selectedLocation={selectedLocation} />
                <PizzaMap pizzaLocations={pizzaLocations} setSelectedLocation={setSelectedLocation} />
            </div>
        </div>
    );
};

export default App;
