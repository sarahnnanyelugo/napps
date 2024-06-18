import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardNav from "../../components/DashboardNav/DashboardNav";
import { DashboardTop } from "../../components/DashboardTop/DashboardTop";
import { AdminDashboard } from "../AdminDashboard/AdminDashboard";

export default function DashboardLayout() {
  return (
    <>
      <div className="d-flex">
        <div className="col-md-2">
          <DashboardNav />
        </div>
        <div className="col-md-10" style={{ padding: "0px 20px" }}>
          {/* <DashboardTop /> */}
          <Routes>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />{" "}
            {/* <Route path="/favourites" element={<Favourites />} />{" "}
            <Route path="/product-requests" element={<ProductRequests />} />{" "}
            <Route path="/order-page" element={<Orders />} />{" "}
            <Route path="/messages" element={<Messages />} />{" "}
            <Route path="/wallet" element={<Wallet />} />{" "}
            <Route path="/acc-details" element={<AccountDetails />} />{" "}
            <Route path="/order-details" element={<OrderDetails />} />{" "}
            <Route path="/track-order" element={<TrackOrder />} />{" "}
            <Route path="/leave-review" element={<LeaveReview />} />{" "} */}
          </Routes>
        </div>
      </div>
    </>
  );
}
