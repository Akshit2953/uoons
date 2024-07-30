import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';

import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from '../components/Navbar'
import Slideshow from '../components/Slideshow';
import ProductsContainer from '../components/ProductsContainer';
import ProductsContainerCopy from '../components/ProductsContainerCopy';
import ProductsContainerMII from '../components/ProductsContainerMII';
import Banner from '../components/Banner';
import Footer from '../components/Footer'
import BrandContainer from '../components/BrandContainer';
import api from '../api';

const Homepage = () => {

  const [heading1, setheading1] = useState("Deal of The Day!")
  const [headingA, setheadingA] = useState("Recommended Products")
  const [headingB, setheadingB] = useState("Suggestions for you")
  const [headingC, setheadingC] = useState("More Products")
  const [heading2, setheading2] = useState("New Arrival")

  const [heading3, setheading3] = useState("Made in India")
  const [heading4, setheading4] = useState("Best Seller")
  const [heading5, setheading5] = useState("Recently viewed!")
  const [heading6, setheading6] = useState("SmartPhones & Tablets")


    const [HomePageData, setHomePageData] = useState({})
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHomePageData = async () => {
      try {
        // hello
        const response = await api.get('/api/homepageData', {
          headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
            'channel-code': 'ANDROID'
          }
        });
        setHomePageData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchHomePageData();
  }, []); 

  
  console.log(HomePageData)
  
  
  
  // const [orderPopup, setOrderPopup] = React.useState(false);
  
  
  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);
  
  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error.message}</div>;
  return (
    <>
    {loading?(<div>Loading...</div>):(<div className="bg-white duration-200">
      <Navbar />
      <Slideshow />
      <ProductsContainer heading={heading1} data={HomePageData.Data[3].items}/>
      <ProductsContainer heading={headingA} data={HomePageData.Data[5].items}/>
      <ProductsContainer heading={headingB} data={HomePageData.Data[9].items}/>
      <ProductsContainer heading={heading2} data={HomePageData.Data[10].items}/>
      <ProductsContainer heading={headingC} data={HomePageData.Data[11].items}/>



      <ProductsContainerCopy heading={heading2}/>
      <Banner />
      <ProductsContainerMII heading={heading3}/>
      <ProductsContainerCopy heading={heading4}/>
      <BrandContainer />
      <ProductsContainerCopy heading={heading5}/>
      <ProductsContainerCopy heading={heading6}/> 
      <Footer />
    </div>)}
    </>
  )
  
}

export default Homepage
