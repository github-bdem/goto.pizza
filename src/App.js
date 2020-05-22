import React from 'react';
import { PizzaMap, SearchSidebar } from './components';

import './App.scss';

const App = () => (
    <div className="App">
        <div className="MainMapContainer">
            <SearchSidebar />
            <PizzaMap />
        </div>
    </div>
);

export default App;
