import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
const ModalB = ({ show, onClose }) => {
  const [allContacts, setAllContacts] = useState([]);

  const handleAllContactsClick = async () => {
    try {
      const response = await fetch(
        "https://contact.mediusware.com/api/country-contacts/United States/"
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
    <>
      <Modal show={show} onHide={onClose}>
        <Modal.Header>
          <Modal.Title>US Contacts</Modal.Title>
        </Modal.Header>
        <Modal.Body
          className="mx-auto text-center "
          style={{ width: "100%", maxHeight: "300px", overflowY: "auto" }}
        >
          {allContacts?.results?.map(contact => (
            <p key={contact.id} className="mb-2">
              {contact.country.name}
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
    </>
  );
};

export default ModalB;
