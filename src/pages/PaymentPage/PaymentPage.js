import React, { useState } from "react";
import "./payment-page.scss";
import Switch from "../../assets/images/switch.png";
import { ToastContainer, toast } from "react-toastify";
export const PaymentPage = () => {
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

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!form?.email) {
      toast.error("email is required");
    } else if (!regex.test(form?.email)) {
      toast.error("This is not a valid email");
    } else {
      toast.success("Payment successful. logging on to dashboard");
      setInterval(() => {
        window.location = "dashboard-layout/admin-dashboard";
      }, 1000);
    }
    sessionStorage.setItem("user", JSON.stringify(form));
  }
  return (
    <>
      <ToastContainer />
      <form action="" onSubmit={handleSubmit} className="payment-section">
        {" "}
        <center>
          <div className="col-md-3 payment-form">
            <h6 style={{ marginLeft: "20px" }}>Make your payment</h6>
            <div className="payment-form">
              <input value="5000" readOnly />
              <small>Note:this is a fixed amount</small>
              <h6>Name</h6>
              <input type="text" placeholder="enter your name" />
              <h6>Email</h6>
              <input
                placeholder="enter your email"
                type="email"
                name="email"
                onChange={handleChange}
              />
            </div>
            <h4>Payment Method</h4>
            <div className="payment-form">
              <img src={Switch} width="100%" alt="payment logo" />
            </div>
            <center>
              <button>Pay Now (5000)</button>
            </center>
          </div>
        </center>
      </form>
    </>
  );
};
