import React, { useState } from "react";
import "./_faq--accordion-blue.scss";
import Accordion from "react-bootstrap/Accordion";
import { Link } from "react-router-dom";

const FAQAccordionBlueTwo = () => {
  return (
    <div className="faq-accordion-blue-container">
      {" "}
      <Accordion defaultActiveKey="">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <p>How can I register 3 schools</p>
          </Accordion.Header>
          <Accordion.Body>
            <p>
              You can access our technical support team 24/7 through our support
              platform or by contacting our dedicated support line.
            </p>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            <p>Can I make payment via transfer?</p>
          </Accordion.Header>
          <Accordion.Body>
            <p>
              educare allows you to create various types of assessments,
              including multiple-choice, essay, and interactive quizzes.
            </p>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>
            <p>Can locate my school easily?</p>
          </Accordion.Header>
          <Accordion.Body>
            <p>
              educare includes communication tools like messaging and
              notifications to facilitate easy communication between teachers
              and students.
            </p>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>
            <p>
              As a School owner are my contact details safe on this website?{" "}
            </p>
          </Accordion.Header>
          <Accordion.Body>
            <p>
              Yes, we offer white-labelling options, allowing you to customize
              educare with your school's branding.
            </p>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};
export default FAQAccordionBlueTwo;
