import React, { useContext, useEffect, useState } from "react";
import "./payment-page.scss";
import Switch from "../../assets/images/switch.png";
import { ToastContainer, toast } from "react-toastify";
import { getLocalStorage, removeLocalStorage, setLocalStorage } from "../../utility/localStorage";
import { ApiContext } from "../../ApiContext";
import api, { setAuthToken } from "../../utility/api";
import { Spinner } from "react-bootstrap";
import { Button } from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
export const PaymentPage = () => {
  const { data, loading, error, fetchData, postData } = useContext(ApiContext);
  const [currentSchool, setCurrentSchool] = useState(() => {
    return getLocalStorage('current_school') || null;
  });
  const [currentState, setCurrentState] = useState(102);
  const [subscription, setSubscription] = useState({});
  const [authToken, setAuthTokenState] = useState(() => {
    return getLocalStorage('authToken') || '';
  });

  async function fetchSchoolSubscription() {
    try {
      setAuthToken(authToken);
      const response = await api.post(`/schools/${currentSchool}/subscriptions`);
      setSubscription(response.data);
      console.log(response)
      setCurrentState(response?.status || 200);
    } catch (errorResponse) {
      toast.error('Error initializing subscription: ' + errorResponse.response?.status);
      setCurrentState(errorResponse?.response?.status || 500);
      if (errorResponse?.response?.status === 401) {
        removeLocalStorage('authToken')
        removeLocalStorage('isLoggedIn')
      }
    }
  }
  useEffect(() => {
    if (!authToken) {
      toast.error('You must be logged in to create school subscription');
      setTimeout(() => {
        window.history.back();
      }, 1000)
    }

    fetchSchoolSubscription()
  }, []
  )
  useEffect(() => {
    if (currentSchool) return;

  }, []);
  function handleChange(e) {
    console.log(e.target.name, e.target.value);
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    console.log(form);
  }
  const [form, setForm] = useState({
    email: " ",
    password: " ",
  });
  function handleSubmit(e) {
    e.preventDefault();

    // const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    // if (!form?.email) {
    //   toast.error("email is required");
    // } else if (!regex.test(form?.email)) {
    //   toast.error("This is not a valid email");
    // } else 
    setCurrentState(102)
    // toast.success("Payment successful. logging on to dashboard");
    setInterval(() => {
      window.location = subscription.hosted_page;
    }, 1000);

    // sessionStorage.setItem("user", JSON.stringify(form));
  }
  return (
    <>
      <ToastContainer />
      {currentState === 102 &&
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="payment-form text-center">
            <h6>Preparing &nbsp; <Spinner animation="border" size="sm" variant="info" /></h6>
          </div>
        </div>
      }
      {currentState === 500 &&
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="payment-form text-center alert alert-danger">
            <h6>Payment Initialization failed</h6>
          </div>
        </div>
      }
      {currentState === 401 &&
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="payment-form text-center alert alert-danger">
            <center><h6>Unauthorized access</h6><br />
              <h6>Your session may have expired. Kindly Login</h6>
              <Link to={'/login'}><button>Login</button></Link></center>
          </div>
        </div>
      }
      {(currentState === 200 || currentState === 201) && <form action="" onSubmit={handleSubmit} className="payment-section d-flex justify-content-center align-items-center vh-100">
        {" "}
        <center>
          <div className="col-md-6 payment-form ">
            <h6 style={{ marginLeft: "20px" }}>Make your payment</h6>
            <div className="payment-form">
              <div className="input-group"><i className="input-group-text">&#8358;</i><input value={subscription?.amount} className="form-control" readOnly /></div>
              <small><strong className="text-danger">Note:</strong> This is a fixed amount. <br/>Transaction Charge may apply.</small>
              {/* <h6>Name</h6>
              <input type="text" placeholder="enter your name" />
              <h6>Email</h6>
              <input
                placeholder="enter your email"
                type="email"
                name="email"
                onChange={handleChange}
              /> */}
            </div>
            <h4>Payment Method</h4>
            <div className="payment-form">
              <img src={Switch} width="100%" alt="payment logo" />
            </div>
            <center>
              <button>Pay Now ({subscription?.amount})</button>
            </center>
          </div>
        </center>
      </form>}
    </>
  );
};
