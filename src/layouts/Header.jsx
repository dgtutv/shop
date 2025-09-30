import React from 'react';
import { Link } from 'react-router';

const Header = ({activeLink, links}) => {
    return (
        <header>
            <h1>Welcome to the Shop</h1>
            {for (link : Links){        //Use abstraction for simplicity
                if (link == activeLink){
                    <Link style = {activeLink}>link.name</Link>
                }
            }}

        </header>
    );
};

export default Header;