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
function AddCoordinators() {
  const [lgShow, setLgShow] = useState(false);
  const [contact, setContact] = useState(null);
  const [value, setValue] = useState();
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
      <button onClick={() => setLgShow(true)} className="add-sch-btn2">
        <IoMdAdd /> Add Coordinators
      </button>

      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            <h6 style={{ fontFamily: "montSB" }}>New Coordinator</h6>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="coord-modal">
          <h5>Avatar</h5>
          <div
            className="contact-frame2 modal-contact"
            style={{ backgroundImage: "url(" + contact + ")" }}
          >
            {" "}
            <center>
              {" "}
              <div className="import-contact">
                {" "}
                <FileUpload
                  defaultIcon={<FaUserEdit />}
                  uploadable="Picture"
                  colr="white"
                  callBack={(img) => {
                    setContact(img);
                  }}
                />
              </div>
            </center>
          </div>
          <div className="row row-cols-1 row-cols-lg-2 g-2 g-lg-3">
            <div className="col">
              <h6>Name</h6>
              <input type="email" placeholder="name@example.com" autoFocus />
            </div>
            <div className="col">
              <h6>Email</h6>
              <input type="email" placeholder="name@example.com" />
            </div>
            <div className="col">
              <h6>Username</h6>
              <input type="email" placeholder="name@example.com" />
            </div>
            <div className="col">
              <h5>School Phone Number</h5>
              <PhoneInput
                defaultCountry="NG"
                value={value}
                onChange={setValue}
                placeholder="700 000 0000"
              />
            </div>
            <div className="col">
              <h6>Password</h6>
              <Password />
            </div>
            <div className="">
              <h6>Confirm Password</h6>
              <Password />
            </div>{" "}
            <div className="col">
              <h6>Zones</h6>
              <div className="selections">
                <select onChange={handleStateChange}>
                  <option value="" disabled selected>
                    Select your zone
                  </option>
                  {zonesAndStates.map((state) => (
                    <option key={state.id} value={state.id}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>{" "}
            <div className="col">
              <h6>State</h6>
              <div className="selections">
                <select disabled={!selectedState}>
                  <option value="" disabled selected>
                    {selectedState ? "Select state" : "Select zone First"}
                  </option>
                  {states?.map((state, index) => (
                    <option key={index} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col">
              <h6>LGA</h6>
              <div className="selections">
                <select>
                  <option>1</option>
                  <option>1</option>
                  <option>1</option>
                </select>
              </div>
            </div>
            <div className="col">
              <h6>Ward</h6>
              <div className="selections">
                <select>
                  <option>1</option>
                  <option>1</option>
                  <option>1</option>
                </select>
              </div>
            </div>
          </div>
          <button className="cont-btn">Continue</button>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddCoordinators;
