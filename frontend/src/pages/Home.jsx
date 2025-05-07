import React from "react";
import Hero from "../components/Hero";
import { ShopContext } from '../context/ShopContext'
import LatestCollection from "../components/LatestCollection";
import BestSeller from "../components/BestSeller";
import OurPolicy from "../components/OurPolicy";
import NewsTeller from "../components/NewsTeller";

const Home = () => {
  return (
    <>
      <Hero />
      <LatestCollection/>
      <BestSeller/>
      <OurPolicy/>
      <NewsTeller/>
    </>
  );
};

export default Home;
