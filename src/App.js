import React, {useContext} from 'react';
import NavigationBar from "./compenents/nav-bar";
import Footer from "./compenents/footer";
import Registration from './compenents/login-registration/Registration';
import Login from './compenents/login-registration/Login';
import Pricings from './compenents/pricing/Index';
import UserProfile from './compenents/user-profile';
import ContactUsModal from './compenents/contact-us/ContactUsModal';
import {Routes, Route} from 'react-router-dom';
import RequireAuth from './compenents/auth/RequireAuth';
import PaymentApp from './compenents/stripe/MainApp';
import PaymentSuccessMessage from './compenents/Success';
import HomePage from './compenents/home/Home';
import HomePgForLoggedInUser from './compenents/home/HomePgForLoggedInUser';
import EstimatedAssumedPerpetualGrowthRate from './compenents/estimate-intrinsic/EstimatedAssumedPerpetualGrowth';
import EstimatedIntrinsicVal from './compenents/estimate-intrinsic/EstimatedIntrinsicVal';
import ForgotPassword from './compenents/login-registration/ForgotPassword';
import { BrowserRouter } from "react-router-dom";



function App() {
  
  return (
      <>
        <NavigationBar />
        <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />}></Route>
          <Route path='/home' element={<RequireAuth><HomePgForLoggedInUser /></RequireAuth>}></Route>
          <Route path='/estimated/intrinsica/value' element={<RequireAuth><EstimatedIntrinsicVal /></RequireAuth>}></Route>
          <Route path='/estimated/intrinsica/perpetual/growth' element={<RequireAuth><EstimatedAssumedPerpetualGrowthRate /></RequireAuth>}></Route>
          <Route path='/payment/:package_id' element={<PaymentApp />}></Route>
          <Route path='/payment/success/:user_id/:package_id' element={<PaymentSuccessMessage />}></Route>
          <Route path='/pricing-table' element={<Pricings />} />
          <Route path='/register' element={<Registration />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgot/password' element={<ForgotPassword />} />
          <Route path='/my-profile/:username' element={<RequireAuth><UserProfile /></RequireAuth>} />
        </Routes>
        </BrowserRouter>
        <ContactUsModal />
        <Footer />
      </>
  );
}

export default App;
