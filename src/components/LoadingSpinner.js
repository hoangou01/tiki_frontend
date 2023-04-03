import React from "react";
import Spinner from 'react-bootstrap/Spinner';

export default function LoadingSpinner() {
  const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
  return (
    <Spinner animation="border" style={style} role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}