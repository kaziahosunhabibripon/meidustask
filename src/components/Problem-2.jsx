import React, { useState } from "react";
import ModalA from "../components/Modal/ModalA"; // Import your Modal components
import ModalB from "../components/Modal/ModalB";
import { useNavigate } from "react-router-dom";
const Problem2 = () => {
  const [showModalA, setShowModalA] = useState(false);
  const [showModalB, setShowModalB] = useState(false);
  const navigate = useNavigate();
  const handleShowModalA = () => {
    setShowModalA(true);
    navigate("/problem-2/modal-a");
  };

  const handleShowModalB = () => {
    setShowModalB(true);
    navigate("/problem-2/modal-b");
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <button
            className="btn btn-lg btn-outline-primary"
            type="button"
            onClick={handleShowModalA}
          >
            All Contacts
          </button>
          <button
            className="btn btn-lg btn-outline-warning"
            type="button"
            onClick={handleShowModalB}
          >
            US Contacts
          </button>
        </div>

        <div className="w-full">
          {showModalA && (
            <ModalA show={showModalA} onClose={() => setShowModalA(false)} />
          )}
        </div>

        {/* Render ModalB based on state */}
        {showModalB && (
          <ModalB show={showModalB} onClose={() => setShowModalB(false)} />
        )}
      </div>
    </div>
  );
};

export default Problem2;
