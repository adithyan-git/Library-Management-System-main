import React from 'react'
import Banner from '../Components/Banner'
import Footer from '../Components/Footer'
import KnowledgeSection from '../Components/KnowledgeSection'
import HomeCategory from '../Components/HomeCategory'
import TrendingBooks from '../Components/TrendingBooks'
import HumanLive from '../Components/HumanLive'
import OurFacilities from '../Components/OurFacilities'
import OurAdvancedTechnology from '../Components/OurAdvancedTechnology'

const Home = () => {
  return (
    <div>
        <Banner/>
        <HomeCategory/>
        <OurAdvancedTechnology/>
        <KnowledgeSection/>
        <TrendingBooks/>
        <HumanLive/>
        <OurFacilities/>
        <Footer/>
        
    </div>
  )
}

export default Home