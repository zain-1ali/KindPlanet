import React from "react";
import "../InputField/InputFieldOutlined.css";

const InputFieldOutlined = ({ placeholderText, textType, value, onChangeTextField, name }) => {
  return (
    <div className="input_field_outlined_main">
      <input
        type={
          textType == "text" ? "text" : textType == "password" ? "password" : ""
        }
        name={name}
        value={value}
        onChange={(e) => onChangeTextField(e)}
        placeholder={placeholderText}
        className="input_field_css_outlined"
      />
    </div>
  );
};

export default InputFieldOutlined;
