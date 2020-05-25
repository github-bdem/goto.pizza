import React from 'react';

import './SearchSidebar.scss';

const PizzaPlace = (props) => {
    const { name } = props;
    return <div>{name}</div>;
};

const SearchSidebar = (props) => {
    const { pizzaLocations } = props;
    console.log(JSON.stringify(pizzaLocations));
    return (
        <div className="SearchSidebarContainer">
            <div className="SearchSidebarBar">
                {pizzaLocations.map((location) => (
                    <PizzaPlace key={location.id} {...location} />
                ))}
            </div>
        </div>
    );
};

export default SearchSidebar;
