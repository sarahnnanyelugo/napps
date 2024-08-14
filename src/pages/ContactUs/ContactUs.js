import React from "react";
import NavBar from "../../components/Navbar/Navbar";
import Icon1 from "../../assets/images/mail.png";
import Icon2 from "../../assets/images/location.png";
import Icon3 from "../../assets/images/phone.png";
import "./contact-us.scss";
export default function ContactUs() {
  return (
    <>
      <NavBar />
      <div className="contact-section">
        {" "}
        <center>
          <h6>Contact Us</h6>
          <h2>We would love to hear from you</h2>
          <p>We are here for you, lets talk.</p>
        </center>
      </div>
      <div className="col-md-8 offset-md-2 d-flex contact-options">
        <div className="col-md-4 ">
          <center>
            {" "}
            <img src={Icon1} width="48px" height="48px" />
            <h6>Email</h6>
            <p>Our friendly team is here to help</p>
            <small>info@napps.com.ng</small>
          </center>
        </div>{" "}
        <div className="col-md-4 ">
          <center>
            {" "}
            <img src={Icon2} width="48px" height="48px" />
            <h6>Office</h6>
            <p>Come say hello at our office</p>
            <small>
              No. 6 Amisi Musa Street,
              <br /> Jabi - Abuja.
            </small>
          </center>
        </div>{" "}
        <div className="col-md-4 ">
          <center>
            {" "}
            <img src={Icon3} width="48px" height="48px" />
            <h6>Phone</h6>
            <p>Mon-Fri from 9am to 5pm</p>
            <small>
              (234) 706-698-2239, (234) 803-320-5357, <br />
              (234) 803-567-1650
            </small>
          </center>
        </div>
      </div>
      <div className="contact-section">
        {" "}
        <center>
          <h6>Contact Us</h6>
          <h2>Get in touch</h2>
          <p>We would love to hear from you. Please fill the form.</p>
        </center>
      </div>
      <form className="contact-form">
        {" "}
        <div className="col-md-6 offset-md-3 row row-cols-2 row-cols-lg-3 g-2 g-lg-3">
          <div className="col">
            <h6>Title</h6>
            <input placeholder="Mr, Mrs, Miss… etc." />
          </div>
          <div className="col">
            <h6>Title</h6>
            <input placeholder="Mr, Mrs, Miss… etc." />
          </div>
          <div className="col">
            <h6>Title</h6>
            <input placeholder="Mr, Mrs, Miss… etc." />
          </div>
        </div>{" "}
        <div className="col-md-6 offset-md-3 row row-cols-2 row-cols-lg-2 g-2 g-lg-3">
          <div className="col">
            <h6>Title</h6>
            <input placeholder="Mr, Mrs, Miss… etc." />
          </div>
          <div className="col">
            <h6>Title</h6>
            <input placeholder="Mr, Mrs, Miss… etc." />
          </div>
        </div>
      </form>
    </>
  );
}
