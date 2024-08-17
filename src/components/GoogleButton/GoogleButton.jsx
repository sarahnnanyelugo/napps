import "./google-button.scss";
import Google from "../../assets/images/google.png";

export const GoogleButton = () => {
  return (
    <>
      {" "}
      <button className="google-button">
        {" "}
        <img className="" src={Google} alt="Scholar" width="16px" />
        Continue with Google
      </button>
    </>
  );
};
