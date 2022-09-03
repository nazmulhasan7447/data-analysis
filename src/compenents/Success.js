import React, { useEffect, useState, useMemo } from "react";
import { CheckSquare, Home } from "react-feather";
import "../assets/css/success.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import authFetch from "../axios/Interceptors";
import cryptoRandomString from 'crypto-random-string';

const PaymentSuccessMessage = () => {

  const params = useParams();
  const payment_id = cryptoRandomString({length: 20, type: 'url-safe'}); 

  async function sendPurchaseHistoryToSave() {
    await authFetch
      .post("/api/package-purchase-history/", {...params, payment_id: payment_id, isConfirmationMailSent: true})
      .catch((error) => {
        console.log(error);
      });
  }


  const callback = useMemo(()=>{
    if (params) {
        sendPurchaseHistoryToSave();
        // sendPaymentConfirmationMail();
    }
    return false;
  }, [params]);


  return (
    <>
      <div className="success-msg">
        <div className="success-msg-content">
          <h3 className="text-center">
            <CheckSquare className="check-icon" />
          </h3>
          <h3 className="text-center awesome">Awesome!</h3>
          <h6 className="text-center">Purchagre ID: {payment_id}</h6>
          <h6 className="text-center scss-title">
            You payment has been completed successfully & sent an
            <strong> Invoice</strong> to your mail!
          </h6>
          <h6 className="back-to-home-btn text-center">
            <button type="button">
              <Home /> <Link to="/"> Back to Home</Link>
            </button>
          </h6>
        </div>
      </div>
    </>
  );
};

export default PaymentSuccessMessage;
