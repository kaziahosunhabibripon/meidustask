import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";

const ModalA = ({ show, onClose }) => {
  const [allContacts, setAllContacts] = useState([]);

  const handleAllContactsClick = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      if (response.ok) {
        const data = await response.json();
        setAllContacts(data);
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    handleAllContactsClick();
  }, []);
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header>
        <Modal.Title>All Contacts</Modal.Title>
      </Modal.Header>
      <Modal.Body
        className="mx-auto text-center "
        style={{ width: "100%", maxHeight: "300px", overflowY: "auto" }}
      >
        {allContacts.map(contact => (
          <p key={contact.id} className="mb-2">
            {contact.name}
          </p>
        ))}
      </Modal.Body>
      <Modal.Footer className="justify-content-between">
        <div>
          <Button
            style={{
              backgroundColor: "#46139f",
              border: "none",
              margin: "0 10px",
            }}
          >
            All Contacts
          </Button>
          <Button
            style={{
              backgroundColor: "#ff7f50",
              border: "none",
              margin: "0 10px",
            }}
          >
            US Contacts
          </Button>
        </div>
        <Button
          style={{
            backgroundColor: "#46139f",
            border: "none",
            margin: "0 10px",
          }}
          onClick={onClose}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalA;
