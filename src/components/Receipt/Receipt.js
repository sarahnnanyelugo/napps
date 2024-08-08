import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import formatNumber from '../../utility/utils';

const Receipt = ({ receipt }) => {
  const {
    amount,
    tx_ref,
    invoice_id,
    start_date,
    end_date,
    expired,
    status,
    proprietor,
    school,
    created_at,
    updated_at
  } = receipt;

  return (
    <div className="container mt-2">
      <div className="card">
        <div className="card-header text-center bg-success text-white">
          <h3>Receipt</h3>
        </div>
        <div className="card-body">
          <h5 className="card-title text-center mb-4">Transaction Details</h5>
          <div className="row">
            <div className="col-md-6">
              
              <p><strong>School:</strong> {school.name}</p>
              <p><strong>Proprietor:</strong> {proprietor.name}</p>
              <p><strong>School ID:</strong> {school.uuid}</p>
            </div>
            <div className="col-md-6">
              <p><strong>Amount:</strong> &#8358;{formatNumber(amount)}</p>
              <p><strong>Transaction Reference:</strong> {tx_ref}</p>
              <p><strong>Contact Info:</strong> {proprietor.email}</p>
            </div>
          </div>
          <hr />
          <h5 className="card-title text-center mb-4">Subscription Details</h5>
          <div className="row">
            <div className="col-md-6">
              <p><strong>Start Date:</strong> {new Date(start_date).toLocaleDateString()}</p>
              <p><strong>End Date:</strong> {new Date(end_date).toLocaleDateString()}</p>
            </div>
            <div className="col-md-6">
              <p><strong>Status:</strong> {status}</p>
              <p><strong>Expired:</strong> {expired ? "Yes" : "No"}</p>
            </div>
          </div>
          <hr />
          <h5 className="card-title text-center mb-4">Timestamps</h5>
          <div className="row">
            <div className="col-md-6">
              <p><strong>Created At:</strong> {new Date(created_at).toLocaleString()}</p>
            </div>
            <div className="col-md-6">
              <p><strong>Updated At:</strong> {new Date(updated_at).toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="card-footer text-center">
          <p className="text-muted">Thank you for your subscription!</p>
        </div>
      </div>
    </div>
  );
};

export default Receipt;
