import React, { useState } from "react";
import EyeClose from "../../assets/images/eye-close.jpg";
import EyeOpen from "../../assets/images/eye-open.svg";
import "./password.scss";
export const UserPassword = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="password-input formpassword ">
      <p
        type={showPassword ? "text" : "password"}
        name="name"
        autocomplete="new-password"
        value={password}
        onChange={handlePasswordChange}
        placeholder="..............."
      ></p>
      <label for="text" class="label-name">
        <span class="content-name">{props.placeholder}</span>
      </label>
      <span onClick={toggleShowPassword}>
        {showPassword ? (
          <img className="" src={EyeClose} alt="Scholar" width="5%" />
        ) : (
          <img className="" src={EyeOpen} alt="Scholar" width="4%" />
        )}
      </span>
    </div>
  );
};
