import React from "react";
import Header from "./components/header/Header";
import { Outlet } from "react-router";
import Layout from "./components/Layout";

const Home = () => {
    return <div className="container-fluid">
        <div>
            <Header />
        </div>
        <div>
            <Outlet />
        </div>
    </div>;
};

export default Home;
