import React, { useEffect, useState } from "react";
import "./EditBar.scss";

const MaxRows = 10;

export function EditBar(props) {
  const [text, setText] = useState("");
  const [numRows, setNumRows] = useState(1);
  const [loading, setLoading] = useState(false);
  const [textRef, setTextRef] = useState(null);

  const submit = () => {
    console.log("submit", text);
    setLoading(true);
  };

  const updateText = (e) => {
    if (loading) {
      return;
    }
    setText(e.target.value);
    setNumRows(Math.min(MaxRows, e.target.value.split("\n").length));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
      return false;
    }
  };

  const handleKeyUp = (e) => {
    if (e.key === "Escape") {
      props.onClose();
    }
  };

  const nowOpen = props.isOpen;
  useEffect(() => {
    if (textRef && nowOpen) {
      textRef.focus();
    }
  }, [nowOpen, textRef]);

  return (
    <div className={`root-edit-bar ${props.isOpen ? "" : "visually-hidden"}`}>
      <textarea
        ref={setTextRef}
        className="form-control form-control-lg edit-aria"
        disabled={loading}
        rows={numRows}
        value={text}
        onKeyPress={handleKeyPress}
        onKeyUp={handleKeyUp}
        onChange={updateText}
        placeholder="What would you like to change?"
        autoFocus
      />
      <button
        className="btn btn-outline-secondary button submit-button"
        onClick={submit}
        disabled={loading}
      >
        {loading ? "*" : "->"}
      </button>
      <button
        className="btn btn-outline-secondary button close-button"
        onClick={props.onClose}
      >
        X
      </button>
    </div>
  );
}
