import React, { useState, useEffect } from 'react';
import Modal from './Modal'; // You need to implement a Modal component
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Make sure to include the Bootstrap JavaScript bundle
const Problem2 = () => {
    const [showModalA, setShowModalA] = useState(false);
    const [showModalB, setShowModalB] = useState(false);
    const [showModalC, setShowModalC] = useState(false);
    const [onlyEven, setOnlyEven] = useState(false);
    const [contacts, setContacts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [USA, setUSA] = useState([]);
    const [searchText, setSearchText] = useState('');


    useEffect(() => {
        fetchContacts();
        fetchUSA();
    }, [searchText]);

    const fetchContacts = async () => {
        try {
            let apiUrlWithParams = `https://contact.mediusware.com/api/contacts/`
            if (searchText) {
                apiUrlWithParams += `?search=${searchText}&page_size=1`;
            }
            console.log(apiUrlWithParams);
            const response = await fetch(apiUrlWithParams);

            const data = await response.json();
            setContacts(data.results);
        } catch (error) {
            console.error('Error fetching contacts:', error);
        }
    };
    const fetchUSA = async () => {
        try {
            const response = await fetch(`https://contact.mediusware.com/api/country-contacts/United%20States/`);
            const data = await response.json();
            setUSA(data.results);
        } catch (error) {
            console.error('Error fetching contacts:', error);
        }
    };

    const handleScroll = () => {
        const scrolledToBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight;
        if (scrolledToBottom) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const filterContacts = () => {
        let filteredContacts = contacts;

        if (onlyEven) {
            filteredContacts = filteredContacts.filter((contact) => contact.id % 2 === 0);
        }

        if (searchTerm) {
            filteredContacts = filteredContacts.filter(
                (contact) =>
                    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    contact.country.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        return filteredContacts;
    };

    const handleModalAClick = () => {
        setShowModalA(true);
        setShowModalB(false);
        setShowModalC(false);
    };



    const closeModal = () => {
        setShowModalA(false);
        setShowModalB(false);
        setShowModalC(false);
    };


    console.log(contacts);





    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

                <div className="d-flex justify-content-center gap-3">
                    <button
                        className="btn btn-lg btn-outline-primary"
                        type="button"
                        onClick={handleModalAClick}
                        data-bs-toggle="modal"
                        data-bs-target="#allContact"
                    >
                        All Contacts
                    </button>
                    <button
                        className="btn btn-lg btn-outline-warning"
                        type="button"
                        onClick={handleModalAClick}
                        data-bs-toggle="modal"
                        data-bs-target="#usContact"
                    >
                        US Contacts
                    </button>
                </div>

                <Modal
                    title="All Contact"
                    id="allContact"
                    onClose={closeModal}
                    footerContent={
                        <div>
                            <input
                                type="checkbox"
                                id="onlyEvenCheckbox"
                                checked={onlyEven}
                                onChange={() => setOnlyEven(!onlyEven)}
                            />
                            <label className='ms-3' htmlFor="onlyEvenCheckbox">Only even</label>
                        </div>
                    }
                    contactData={filterContacts().map((contact) => contact)}
                    onSearch={(value) => setSearchTerm(value)}
                    showModal={true}
                    setSearchText={setSearchText}
                />

                <Modal
                    title="US Contact"
                    id="usContact"
                    onClose={closeModal}
                    footerContent={
                        <div>
                            <input
                                type="checkbox"
                                id="onlyEvenCheckbox"
                                checked={onlyEven}
                                onChange={() => setOnlyEven(!onlyEven)}
                            />
                            <label className='ms-3' htmlFor="onlyEvenCheckbox">Only even</label>
                        </div>
                    }
                    contactData={USA.map((contact) => contact)}
                    onSearch={(value) => setSearchTerm(value)}
                    showModal={true}
                    setSearchText={setSearchText}
                />


            </div>
        </div>





    );
};

export default Problem2;
