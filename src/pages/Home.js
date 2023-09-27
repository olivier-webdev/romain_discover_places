import React from "react";
import Header from '../components/headers/Header';
import Searchccueil from "../components/Searchaccueil"
import MomentPlace from "../components/MomentPlace"
// import DiscoverinFrance from "../components/DiscoverinFrance";

const Home = () => {
    return (
        <div>
            <Header />
            <Searchccueil />
            <MomentPlace />
            {/* <DiscoverinFrance /> */}
        </div>
    );
};

export default Home;