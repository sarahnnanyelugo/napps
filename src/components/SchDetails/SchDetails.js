import { useEffect, useState } from "react";

import Modal from "react-bootstrap/Modal";
import { Link, useLocation, useParams } from "react-router-dom";
import { SchoolBio } from "../../pages/SchoolSub/SchoolBio";
function SchDetails() {
  const [lgShow, setLgShow] = useState(false);
  const { blog_id } = useParams();
  return (
    <>
      <p onClick={() => setLgShow(true)} style={{ cursor: "pointer" }}>
        View
      </p>

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
          <SchoolBio blog_id={blog_id} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default SchDetails;
