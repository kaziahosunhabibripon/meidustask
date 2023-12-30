import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";

const SearchResults = ({ searchValue, searchResults }) => {
  return (
    <div className="mt-4">
      {searchValue !== "" && (
        <ul>
          {searchResults.map(result => (
            <li key={result.id}>{result.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

const Problem2 = () => {
  const [showAllContactsModal, setShowAllContactsModal] = useState(false);
  const [showUSContactsModal, setShowUSContactsModal] = useState(false);
  const [allContacts, setAllContacts] = useState([]);
  const [usContacts, setUSContacts] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchResultsAll, setSearchResultsAll] = useState([]);
  const [searchResultsUS, setSearchResultsUS] = useState([]);

  const filterContacts = (contacts, value) => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(value.toLowerCase())
    );
  };

  const handleSearchAll = () => {
    setSearchResultsAll(filterContacts(allContacts, searchValue));
  };

  const handleSearchUS = () => {
    setSearchResultsUS(filterContacts(usContacts, searchValue));
  };

  const handleAllContactsClick = async () => {
    setShowAllContactsModal(true);
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

  const handleUSContactsClick = async () => {
    setShowUSContactsModal(true);
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users?country=US"
      );
      if (response.ok) {
        const data = await response.json();
        setUSContacts(data);
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleCloseAllContactsModal = () => {
    setShowAllContactsModal(false);
    setSearchValue("");
    setSearchResultsAll([]);
  };

  const handleCloseUSContactsModal = () => {
    setShowUSContactsModal(false);
    setSearchValue("");
    setSearchResultsUS([]);
  };

  useEffect(() => {
    const fetchAllContacts = async () => {
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

    fetchAllContacts();
  }, []);

  useEffect(() => {
    const fetchUSContacts = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users?country=US"
        );
        if (response.ok) {
          const data = await response.json();
          setUSContacts(data);
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUSContacts();
  }, []);

  useEffect(() => {
    const filterContacts = (contacts, value) => {
      return contacts.filter(contact =>
        contact.name.toLowerCase().includes(value.toLowerCase())
      );
    };

    setSearchResultsAll(filterContacts(allContacts, searchValue));
    setSearchResultsUS(filterContacts(usContacts, searchValue));
  }, [searchValue, allContacts, usContacts]);

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <button
            className="btn btn-lg btn-outline-primary"
            type="button"
            onClick={handleAllContactsClick}
          >
            All Contacts
          </button>

          <button
            className="btn btn-lg btn-outline-warning"
            type="button"
            onClick={handleUSContactsClick}
          >
            US Contacts
          </button>
        </div>
      </div>

      <Modal
        show={showAllContactsModal}
        onHide={handleCloseAllContactsModal}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>All Contacts</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: "400px", overflowY: "auto" }}>
          <ul>
            {allContacts.map(contact => (
              <li key={contact.id}>{contact.name}</li>
            ))}
          </ul>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
              onClick={handleSearchAll}
            />
          </div>
          {searchValue !== "" && (
            <div className="mt-4">
              <p>Search Value: {searchValue}</p>
            </div>
          )}
          <SearchResults
            searchValue={searchValue}
            searchResults={searchResultsAll}
          />
        </Modal.Body>
      </Modal>

      <Modal
        show={showUSContactsModal}
        onHide={handleCloseUSContactsModal}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>US Contacts</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: "400px", overflowY: "auto" }}>
          <ul>
            {allContacts.map(contact => (
              <li key={contact.id}>{contact.name}</li>
            ))}
          </ul>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              value={searchValue}
              onClick={handleSearchUS}
              onChange={e => setSearchValue(e.target.value)}
            />
          </div>

          <SearchResults
            searchValue={searchValue}
            searchResults={searchResultsAll}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Problem2;
