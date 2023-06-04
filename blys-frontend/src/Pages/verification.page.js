import React from "react";
import "./../css/verification.css";
import { InputBox } from "../Components/inputbox.component";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const Verification = () => {
  const [code, setCode] = React.useState(["", "", "", "", "", ""]);
  const [message, setMessage] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [btnDisabled, setBtnDisabled] = React.useState(true);
  const inputRefs = React.useRef([]);
  const navigate = useNavigate();

  const focusNext = (index) => {
    index < inputRefs.current.length - 1 &&
      index >= -1 &&
      inputRefs.current[index + 1].focus();
  };

  const invalidChar = (index) => {
    inputRefs.current[index].classList.remove("validInput");
    inputRefs.current[index].classList.add("invalidInput");
  };

  const validChar = (index) => {
    inputRefs.current[index].classList.remove("invalidInput");
    inputRefs.current[index].classList.add("validInput");
  };

  React.useEffect(() => {
    if (!code.includes("")) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [code]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (code.includes("")) {
        return;
      }

      const codeString = code.join("");
      const res = await axios.post("http://localhost:3001/validate", {
        code: codeString,
      });

      navigate("/success");
    } catch (error) {
      setMessage(error.response.data.message);
      setSuccess(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center flex-column">
      <div className="App-modal col-sm-12 col-md-8 col-lg-6">
        <h2>Verification Code</h2>
        {message && (
          <div
            // className={success ? "alert alert-success w-50 p-1" : "alert alert-danger w-50 p-1"}
            className={`alert w-100 p-1 mt-3 ${
              success ? "alert-success" : "alert-danger"
            }`}
            role="alert"
          >
            {message}
          </div>
        )}

        <div className="row mt-4 input-container">
          {code.map((value, index) => {
            return (
              <div className="col-2 p-1" key={index}>
                <InputBox
                  ref={(rf) => (inputRefs.current[index] = rf)}
                  codeVal={value}
                  setCode={setCode}
                  setMessage={setMessage}
                  index={index}
                  focusNext={(index) => {
                    focusNext(index);
                  }}
                  setBtnDisabled={setBtnDisabled}
                  invalidChar={invalidChar}
                  validChar={validChar}
                />
              </div>
            );
          })}
        </div>
        <button
          className="blys-btn mt-4 btn-lg"
          onClick={handleSubmit}
          disabled={btnDisabled}
        >
          Submit
        </button>
      </div>
    </div>
  );
};
