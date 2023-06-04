import React, { useState } from "react";
export const InputBox = React.forwardRef((props, ref) => {
  const handleCodeChange = (event) => {
    event.preventDefault();
    let { value } = event.target;
    value = value.replace(/\s/g, "");
    if (!/^(|\d+)$/.test(value)) {
      props.invalidChar(props.index);
    } else {
      props.validChar(props.index);
    }

    if (props.codeVal[props.index] && value !== "") {
      return;
    }
    props.setMessage("");

    //THIS SECTION IS FOR WHEN A USER COPY THE CODE FROM CLIPBOARD.
    if (value.length > 1) {
      for (let i = 0; i < value.length; i++) {
        if (i + props.index >= 5) {
          props.focusNext(4);
          if (i + props.index > 5) return;
        }
        if (!/^(|\d+)$/.test(value.charAt(i))) {
          props.invalidChar(props.index + i);
        } else {
          props.validChar(props.index + i);
        }
        props.setCode((prev) => {
          const newVal = [...prev];
          newVal[props.index + i] = value.charAt(i);
          return newVal;
        });
      }
      props.focusNext(props.index + value.length - 1);
      return;
    }

    //THIS IS NORMAL CODE ENTER.
    props.setCode((prev) => {
      const newValue = [...prev];
      newValue[props.index] = value;
      return newValue;
    });
    value.length > 0 && props.focusNext(props.index);
  };
  const handleKeyDown = (event) => {
    if (event.key === "ArrowRight") {
      props.focusNext(props.index);
    }
    if (event.key === "ArrowLeft") {
      props.focusNext(props.index - 2);
    }
  };
  return (
    <>
      <div className="input-group input-group-md mb-3">
        <input
          ref={ref}
          type="text"
          className={`form-control`}
          value={props.codeVal}
          onChange={handleCodeChange}
          onKeyDown={handleKeyDown}
          dir="inherit"
        ></input>
      </div>
    </>
  );
});
