import React, { useEffect, useState } from "react";
import { Modal, Button, Table, Form } from "react-bootstrap";

const ModalA = ({ show, onClose }) => {
  const [allContacts, setAllContacts] = useState([]);
  const [onlyEven, setOnlyEven] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);

  const handleAllContactsClick = async () => {
    try {
      const response = await fetch(
        "https://contact.mediusware.com/api/contacts/"
      );
      if (response.ok) {
        const data = await response.json();
        setAllContacts(data.results);
        setFilteredContacts(data.results);
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

  const handleCheckboxChange = e => {
    setOnlyEven(e.target.checked);
    filterContacts(searchQuery, e.target.checked);
  };

  const handleSearchChange = e => {
    setSearchQuery(e.target.value);
    filterContacts(e.target.value, onlyEven);
  };

  const filterContacts = (query, isEven) => {
    let filtered = [...allContacts];

    if (query) {
      filtered = filtered.filter(contact =>
        contact.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (isEven) {
      filtered = filtered.filter(contact => contact.id % 2 === 0);
    }

    setFilteredContacts(filtered);
  };
  const handleSearch = e => {
    const value = e.target.value;
    setSearchQuery(value);

    // Filter contacts based on search query
    const filteredContacts = allContacts.filter(contact =>
      contact.name.toLowerCase().includes(value.toLowerCase())
    );
    setSearchResults(filteredContacts);
  };
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header>
        <Modal.Title>All Contacts</Modal.Title>
      </Modal.Header>
      <Modal.Body
        className="mx-auto text-center "
        style={{ width: "100%", maxHeight: "300px", overflowY: "auto" }}
      >
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th
                style={{ backgroundColor: "#ff7f50", color: "white" }}
                className="text-end"
              >
                Id
              </th>
              <th style={{ backgroundColor: "#46139f", color: "white" }}>
                Country
              </th>
              <th
                style={{ backgroundColor: "#ff7f50", color: "white" }}
                className="text-end"
              >
                Phone
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredContacts?.map((contact, index) => (
              <tr
                key={contact.id}
                style={{
                  backgroundColor: index % 2 === 0 ? "#f5f5f5" : "white",
                }}
              >
                <td className="text-end">{contact.id}</td>
                <td>{contact.country.name}</td>
                <td className="text-end">{contact.phone}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Form.Check
          type="checkbox"
          label="Only even"
          checked={onlyEven}
          onChange={handleCheckboxChange}
          className="bg-dark text-white rounded col-auto"
        />
      </Modal.Body>
      <Modal.Footer className="justify-content-between">
        <div className="mb-4 d-flex justify-content-center text-black p-2">
          <Form.Control
            type="text"
            placeholder="Search contacts..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <div>
          {searchResults.map(contact => (
            <span key={contact.id}>
              <p>{contact.name}</p>
            </span>
          ))}
        </div>
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
