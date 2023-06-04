import React from "react";
import { GoVerified } from "react-icons/go";
import "./../css/success.css";
import "./../css/verification.css";
import { useNavigate } from "react-router-dom";
export const Success = () => {
  const navigate = useNavigate();
  const VerifyAgain = () => {
    navigate("/");
  };
  return (
    <div className="container d-flex justify-content-center">
      <div className="App-modal">
        <GoVerified className="verifiedLogo" />
        <div className="mt-4">
          <h4>Verified!</h4>
          <p>Congratulation you have been verified.</p>
        </div>
        <button className="blys-btn mt-4 btn-lg w-100" onClick={VerifyAgain}>
          Verifiy Again
        </button>
      </div>
    </div>
  );
};
