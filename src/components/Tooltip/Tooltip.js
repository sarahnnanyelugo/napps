import React from "react";
import "./tooltip.scss";

export default function Tooltip({
  children,
  total,
  active,
  inactive,
  ...rest
}) {
  const [show, setShow] = React.useState(false);

  return (
    <div>
      <div className="tooltip2" style={show ? { visibility: "visible" } : {}}>
        <ul className="list-unstyled">
          <li>Total Schools:{total}</li>
          <li>Active Schools:{active}</li>
          <li>Inactive Schools:{inactive}</li>
        </ul>
        <span className="tooltip-arrow" />
      </div>
      <div
        {...rest}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        {children}
      </div>
    </div>
  );
}
