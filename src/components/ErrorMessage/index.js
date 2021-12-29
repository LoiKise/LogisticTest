import React from "react";

export default function index({ errors, name, color }) {
  const error = errors[name];
  return (
    <>
      {color && (
        <div
          style={{
            color: "#000",
            display: "block",
            fontSize: "1.1rem",
            paddingTop: "0.5rem",
            fontWeight: "bold",
            marginTop: "-14px",
            marginLeft: "10px",
          }}
        >
          {error && error.message}
        </div>
      )}
      {!color && (
        <div
          style={{
            color: "#ff424f",
            fontSize: "1rem",
            paddingTop: "0.5rem",
          }}
        >
          {error && error.message}
        </div>
      )}
    </>
  );
}
