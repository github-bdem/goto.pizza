import React, { useState } from 'react';
import { PizzaMap, SearchSidebar } from './components';

import './App.scss';

const App = () => {
    const [pizzaLocations, setPizzaLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);

    return (
        <div className="App">
            <div className="MainMapContainer">
                <SearchSidebar pizzaLocations={pizzaLocations} selectedLocation={selectedLocation} />
                <PizzaMap
                    pizzaLocations={pizzaLocations}
                    setSelectedLocation={setSelectedLocation}
                    setPizzaLocations={setPizzaLocations}
                />
            </div>
        </div>
    );
};

export default App;
