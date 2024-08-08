import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { IoMdAdd } from "react-icons/io";
import { FileUpload } from "../../components/FileUpload/FileUpload";
import { FaUserEdit } from "react-icons/fa";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Password } from "../../components/Password/Password";
import { zonesAndStates } from "../../Data/States";
import SearchableDropdown from "../../components/SearchableDropdown/SearchableDropdown";
import { bankList } from "../../Data/bankList";

function AddAccount() {
  const [lgShow, setLgShow] = useState(false);
  const [contact, setContact] = useState(null);
  const [value, setValue] = useState("Select bank...");

  const [selectedState, setSelectedState] = useState(null);
  const [states, setStates] = useState([]);
  const handleStateChange = (e) => {
    const state = zonesAndStates.find(
      (item) => item.id === parseInt(e.target.value)
    );
    setSelectedState(state);
  };
  useEffect(() => {
    console.log(selectedState);
    console.log(selectedState?.states);
    setStates(selectedState?.states);
  }, [selectedState]);
  return (
    <>
      <button onClick={() => setLgShow(true)} className="acc-btn2">
        <IoMdAdd /> Add Account
      </button>

      <Modal
        size="md"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            <h6 style={{ fontFamily: "montSB" }}>Add Bank Account</h6>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="coord-modal">
          <div className="row row-cols-1 row-cols-lg-1 g-2 g-lg-3">
            <div className="col">
              <h6>Select Bank</h6>
              <div className="App">
                <SearchableDropdown
                  options={bankList}
                  label="name"
                  icon="logo"
                  id="id"
                  selectedVal={value}
                  handleChange={(val) => setValue(val)}
                />
              </div>
            </div>
            <div className="col">
              <h6>Select Currency</h6>
              <select>
                <option>$</option>
                <option>&#8358;</option>
                <option>&#163;</option>
                <option>&#8364;</option>
              </select>
            </div>
            <div className="col">
              <h6>NUBAN (10 digit Account Number)</h6>
              <input
                type="email"
                placeholder="Enter NUBAN (10 digit Account Number)"
              />
            </div>
            <div className="col">
              <h5>Account Name</h5>
              <input type="email" placeholder="Enter your account name here" />
            </div>{" "}
            <div className="col">
              <h5>Bank Name Alias</h5>
              <input type="email" placeholder="Enter bank name alias here" />
            </div>
          </div>
          <button className="cont-btn">Continue</button>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddAccount;
