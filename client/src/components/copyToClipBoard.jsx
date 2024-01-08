import React from "react";
import copyLinkIcon from "../images/copyLinkIcon.png";

const CopyToClipboardButton = ({ text }) => {
  const copyToClipboard = () => {
    try {
      const textField = document.createElement("textarea");
      textField.innerText = text;
      document.body.appendChild(textField);
      textField.select();
      document.execCommand("copy");
      textField.remove();
      alert("Copied Link(url) to clipboard! and you can check in console.log");
      console.log("Copied URL:", text);
    } catch (error) {
      console.error("Error copying to clipboard:", error);
      alert("Error copying to clipboard. See console for details.");
    }
  };

  return (
    <button onClick={copyToClipboard}>
      <img
        src={copyLinkIcon}
        alt="Copy Link"
        className="copy-icon cursor-pointer w-[36px] h-[36px] absolute bottom-[30px] right-[300px] mt-2"
      />
    </button>
  );
};

export default CopyToClipboardButton;
