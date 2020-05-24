import React, { useState, useEffect } from 'react';
import { PizzaMap, SearchSidebar } from './components';

import './App.scss';

const App = () => {
    const [mapBounds, setBounds] = useState({ south: null, north: null, east: null, west: null });

    const [pizzaLocations, setPizzaLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);

    useEffect(() => {
        console.log('updating query');
        setSelectedLocation(null);
        // CALL GMAPS API
        // SET PIZZA LOCATIONS
    }, [mapBounds]);

    return (
        <div className="App">
            <div className="MainMapContainer">
                <SearchSidebar pizzaLocations={pizzaLocations} selectedLocation={selectedLocation} />
                <PizzaMap
                    pizzaLocations={pizzaLocations}
                    setSelectedLocation={setSelectedLocation}
                    setBounds={setBounds}
                />
            </div>
        </div>
    );
};

export default App;
