import React, { useState } from "react";
import EyeClose from "../../assets/images/eye-close.jpg";
import EyeOpen from "../../assets/images/eye-open.svg";
import "./password.scss";
export const Password = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    props.onChange&&props.onChange(e)
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="password-input formpassword ">
      <input
        type={showPassword ? "text" : "password"}
        name={props.name}
        autocomplete="new-password"
        value={password}
        onChange={handlePasswordChange}
        placeholder="..............."
      />
      <label for="text" class="label-name">
        <span class="content-name">{props.placeholder}</span>
      </label>
      <span onClick={toggleShowPassword} style={{ paddingRight:"10px" }}>
        {showPassword ? (
          <img className="" src={EyeClose} alt="Scholar" width="5%" />
        ) : (
          <img className="" src={EyeOpen} alt="Scholar" width="4%" />
        )}
      </span>
    </div>
  );
};
