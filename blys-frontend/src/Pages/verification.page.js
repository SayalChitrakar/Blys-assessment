import React from "react";
import "./../css/verification.css";
import { InputBox } from "../Components/inputbox.component";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const Verification = () => {
  const [code, setCode] = React.useState(["", "", "", "", "", ""]);
  const [message, setMessage] = React.useState("");
  const [btnDisabled, setBtnDisabled] = React.useState(true);
  const inputRefs = React.useRef([]);
  const navigate = useNavigate();

  const focusNext = (index) => {
    index < inputRefs.current.length - 1 &&
      index >= -1 &&
      inputRefs.current[index + 1].focus();
  };

  // Highlight for invalid char
  const invalidChar = (index) => {
    inputRefs.current[index].classList.remove("validInput");
    inputRefs.current[index].classList.add("invalidInput");
  };

  // Highlight for valid char
  const validChar = (index) => {
    inputRefs.current[index].classList.remove("invalidInput");
    inputRefs.current[index].classList.add("validInput");
  };

  // Highlight for emptyChar
  const emptyChar = (index) => {
    inputRefs.current[index].classList.remove("invalidInput");
    inputRefs.current[index].classList.remove("validInput");
  };

  React.useEffect(() => {
    //Checks if any of the input input contain empty value and disable the input accordingly.
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

      //The code is in array form. So convert the array to string before sending it to server.
      const codeString = code.join("");

      // requesting to server.
      console.log(process.env.REACT_API)
      const res = await axios.post(`${process.env.REACT_APP_API}/validate`, {
        code: codeString,
      });

      //navigation to success page if the request is success else try block handles the issue.
      navigate("/success");
    } catch (error) {
      //setting message to display error.
      setMessage(error.response?.data.message);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center flex-column">
      <div className="App-modal col-sm-12 col-md-8 col-lg-6">
        <h2>Verification Code</h2>
        {message && (
          <div className="alert w-100 p-1 mt-3 alert-danger" role="alert">
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
                  emptyChar={emptyChar}
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
