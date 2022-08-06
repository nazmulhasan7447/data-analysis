import React from 'react';
import NavigationBar from "./compenents/nav-bar";
import Footer from "./compenents/footer";
import Registration from './compenents/login-registration/Registration';
import Login from './compenents/login-registration/Login';
import Pricings from './compenents/pricing/Index';
import UserProfile from './compenents/user-profile';
import Home from './Main';
import ContactUsModal from './compenents/contact-us/ContactUsModal';
import {Routes, Route} from 'react-router-dom';


function App() {
  return (
      <>
        <NavigationBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/pricing-table' element={<Pricings />} />
          <Route path='/register' element={<Registration />} />
          <Route path='/login' element={<Login />} />
          <Route path='/my-profile' element={<UserProfile />} />
        </Routes>
        <ContactUsModal />
        <Footer />
      </>
  );
}

export default App;
