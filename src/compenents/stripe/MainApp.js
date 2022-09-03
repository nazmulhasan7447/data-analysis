import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/Authentication";
import authFetch, { BASE_URL } from "../../axios/Interceptors";
import CheckoutForm from "./CheckoutForm";
import './mainApp.css';
import { parseJwt } from "../parser/Parser";
import PreLoader from "../pre-loader/PreLoader";



// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_Z208ErXUVDSRFtAYcCLg2gbp");

export default function PaymentApp() {

  const navigate = useNavigate();
  const { package_id } = useParams();
  const [packagedetails, setPackageDetails] = useState('');
  const [clientSecret, setClientSecret] = useState("");
  const userLoginStatus = useAuth().isAuthenticated;
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    if (!userLoginStatus) {
      navigate('/login', {replace: true});
    }

    async function fetchProductDetails() {
      await authFetch.get(`/api/package-details/${package_id}/`)
      .then((response)=>{
        const packageDetailsInfo = response?.data;
        setPackageDetails(packageDetailsInfo);
      })
      .catch((er)=>{
        console.log(er);
      })

      // Create PaymentIntent as soon as the page loads
      // http://agamibangla.pythonanywhere.com
      // http://127.0.0.1:8000
    await fetch(`${BASE_URL}/api/create-payment-intent/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: { id: package_id ? package_id : null, price: packagedetails?.price?.toString() + '00' } }),
      xsrfHeaderName: "X-CSRFToken",
      // body: JSON.stringify({ price: packagedetails.price }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
        setIsLoading(false);
      });
    }

    fetchProductDetails();
    
    setUserInfo(()=>{
      const user = parseJwt(localStorage.getItem('access_token')).user_id;
      return user;
    })

    // setIsLoading(false);
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <>
      <div className="App payment-root-app">
          {
            isLoading ? <PreLoader /> : (
              clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                  <CheckoutForm packageDetails={packagedetails} userInfo={userInfo} />
                </Elements>
              )
            )
          }
        </div>
    </>
  );
}