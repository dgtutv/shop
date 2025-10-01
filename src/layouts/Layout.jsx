import { Outlet } from 'react-router';
import Header from './Header.jsx';
import React from 'react';

const Layout = () => {

    // ------ Styling --------- //
    const mainStyle = {
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
    }

    const contentStyle = {
        flex: 1,
    }

    return (
        <div style={mainStyle}>
            <Header />
            <div style={contentStyle}>
                <Outlet />
            </div>
        </div>
    )
}

export default Layout;