import React, { useEffect, useState } from "react";

import Modal from "react-bootstrap/Modal";
import { Link, useLocation, useParams } from "react-router-dom";
import { SchoolBio } from "../../pages/SchoolSub/SchoolBio";
function SchDetails(props) {
  const [lgShow, setLgShow] = useState(false);
  const { opener,school_id } = props;

  useEffect(() => {
    console.log("School id: " + school_id);
  },[school_id])
    const handleOpen = () => setLgShow(true);
  return (
    <>
        {React.cloneElement(opener, { onClick: handleOpen })}
      <Modal
        size="xl"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            <h6 style={{ fontFamily: "montSB" }}>School Details</h6>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {" "}
          <SchoolBio school_id={school_id} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default SchDetails;
