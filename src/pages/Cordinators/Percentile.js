import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import "../../components/SchoolsTable/schools-table.scss";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import api, { setAuthToken } from "../../utility/api";
import { toast } from "react-toastify";
import { useAuth } from "../../AuthContext";

const Percentile = () => {
  const { authToken } = useAuth();
  const [canSetEducare, setCanSetEducare] = useState(false);
  const [paymentSplits, setPaymentSplits] = useState([]);
  const [paymentConfigs, setPaymentConfigs] = useState({});
  const [bearer, setBearer] = useState("");
  const [subscriptionFee, setSubscriptionFee] = useState("");

  // Fetch payment configurations on component mount
  useEffect(() => {
    if (!paymentConfigs) return;
    setBearer(paymentConfigs.bearer || "");
    setSubscriptionFee(paymentConfigs.subscription_fee || "");
  }, [paymentConfigs]);
  // Handle input change for bearer
  const handleBearerChange = (event) => {
    setBearer(event.target.value);
  };

  // Handle input change for subscription fee
  const handleSubscriptionFeeChange = (event) => {
    // Ensure only numeric input and limit to length of 5
    const value = event.target.value;
    if (/^\d{0,9}$/.test(value)) {
      setSubscriptionFee(value);
    }
  };

  // Submit configurations to the API
  const handleSave = async () => {
    try {
      setAuthToken(authToken);
      await api.post("/admin/update-payment-configs", {
        bearer,
        subscription_fee: subscriptionFee,
      });
      toast.success("Payment configurations saved successfully!");
    } catch (error) {
      console.error("Error saving configurations:", error);
      alert("Failed to save configurations.");
    }
  };

  useEffect(() => {
    fetchConfigs();
  }, []);

  async function fetchConfigs() {
    try {
      setAuthToken(authToken);
      const response = await api.post(`/admin/fetch-configs`);
      setCanSetEducare(response.data.canSetEducare);
      setPaymentSplits(response.data.payment_splits);
      setPaymentConfigs(response.data.payment_configs);
    } catch (errorResponse) {
      toast.error("Error account list: " + errorResponse.response?.status);
    }
  }

  // Handle input change and update the state
  const handleChange = (index, field, value) => {
    const newData = [...paymentSplits];
    const total = calculateTotal(paymentSplits[index]) - newData[index][field];
    let newValue = value;
    if (parseInt(newValue) + parseInt(total) > 100) newValue = 100 - total;
    newData[index][field] = newValue;
    setPaymentSplits(newData);
  };

  // Calculate the total of each row
  const calculateTotal = (row) => {
    return ["federal", "zonal", "state", "lga", "ward", "educare"].reduce(
      (sum, field) => sum + (parseFloat(row[field]) || 0),
      0
    );
  };
  // Restrict input to numeric values only
  const handleKeyPress = (e) => {
    const charCode = e.which ? e.which : e.keyCode;
    // Allow only numbers, backspace, and delete keys
    if (charCode < 48 || charCode > 57) {
      e.preventDefault();
    }
  };

  // Submit updated data to the API
  const handleSaveSplit = async () => {
    try {
      setAuthToken(authToken);
      await api.post("/admin/save-split", { paymentSplits });
      toast.success("Data saved successfully!");
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Failed to save data.");
    }
  };
  return (
    <div>
      <Table
        striped
        bordered
        hover
        responsive
        className="school-table percentile-table"
      >
        <thead>
          <tr>
            <th>Zones</th>
            <th>Federal(%)</th>
            <th>Zonal(%)</th>
            <th>State(%)</th>
            <th>LGA(%)</th>
            <th>Ward(%)</th>
            <th>Educare(%)</th>
            <th>Total(%)</th>
          </tr>
        </thead>
        <TransitionGroup component="tbody">
          {paymentSplits.map((item, index) => (
            <CSSTransition
              key={item.id}
              timeout={500}
              classNames="row-slide-up"
            >
              <tr key={item.id}>
                <td style={{ fontFamily: "montM" }}>{item.zone.name}</td>

                <td>
                  <input
                    type="text"
                    value={item.federal || ""}
                    onKeyPress={handleKeyPress}
                    onChange={(e) =>
                      handleChange(index, "federal", e.target.value)
                    }
                    maxLength="5" // Optional: limit the length
                  />
                </td>

                <td>
                  <input
                    type="text"
                    value={item.zonal || ""}
                    onKeyPress={handleKeyPress}
                    onChange={(e) =>
                      handleChange(index, "zonal", e.target.value)
                    }
                    maxLength="5" // Optional: limit the length
                  />
                </td>

                <td>
                  <input
                    type="text"
                    value={item.state || ""}
                    onKeyPress={handleKeyPress}
                    onChange={(e) =>
                      handleChange(index, "state", e.target.value)
                    }
                    maxLength="5" // Optional: limit the length
                  />
                </td>

                <td>
                  <input
                    type="text"
                    value={item.lga || ""}
                    onKeyPress={handleKeyPress}
                    onChange={(e) => handleChange(index, "lga", e.target.value)}
                    maxLength="5" // Optional: limit the length
                  />
                </td>

                <td>
                  <input
                    type="text"
                    value={item.ward || ""}
                    onKeyPress={handleKeyPress}
                    onChange={(e) =>
                      handleChange(index, "ward", e.target.value)
                    }
                    maxLength="5" // Optional: limit the length
                  />
                </td>

                <td>
                  <input
                    type="text"
                    readOnly={!canSetEducare}
                    value={item.educare || ""}
                    onKeyPress={handleKeyPress}
                    onChange={(e) =>
                      handleChange(index, "educare", e.target.value)
                    }
                    maxLength="5" // Optional: limit the length
                  />
                </td>

                <td>{calculateTotal(item)}</td>
              </tr>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </Table>
      <div className="d-flex justify-content-end mt-3">
        <button onClick={handleSaveSplit} className="btn btn-success">
          Save
        </button>
      </div>

      <Card
        className={"container mt-3 col-md-4"}
        style={{ paddingBottom: "10px" }}
      >
        <h2>Other Configurations</h2>
        <Table striped bordered>
          <thead>
            <tr>
              <th>Bearer</th>
              <th>Subscription Fee</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Form.Group>
                  <Form.Check
                    type="radio"
                    label="Merchant"
                    name="bearer"
                    value="merchant"
                    checked={bearer === "merchant"}
                    onChange={handleBearerChange}
                  />
                  <Form.Check
                    type="radio"
                    label="Customer"
                    name="bearer"
                    value="customer"
                    checked={bearer === "customer"}
                    onChange={handleBearerChange}
                  />
                </Form.Group>
              </td>
              <td>
                <Form.Control
                  type="text"
                  value={subscriptionFee}
                  onChange={handleSubscriptionFeeChange}
                  onKeyPress={handleKeyPress}
                  maxLength="10"
                  placeholder="Enter fee"
                  isInvalid={!/^\d{0,9}$/.test(subscriptionFee)}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid number.
                </Form.Control.Feedback>
              </td>
            </tr>
          </tbody>
        </Table>

        <div className="d-flex justify-content-end mt-3">
          <Button variant="success" onClick={handleSave}>
            Save
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Percentile;
