import React from 'react';
import Navbar from '../../components/Navbar';
import Conexiones from '../../components/Conexiones'

const MainPage = () => {
    return (
        <div className="h-screen">
            <Navbar />
            <Conexiones/>
        </div>
    );
};

export default MainPage;