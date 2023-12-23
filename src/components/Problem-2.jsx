import React, { useState, useEffect } from 'react';
import Modal from './Modal'; // You need to implement a Modal component

const Problem2 = () => {
    const [showModalA, setShowModalA] = useState(false);
    const [showModalB, setShowModalB] = useState(false);
    const [showModalC, setShowModalC] = useState(false);
    const [onlyEven, setOnlyEven] = useState(false);
    const [contacts, setContacts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);

    useEffect(() => {
        // Fetch initial data from the API
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            const response = await fetch(`https://contact.mediusware.com/api/contacts/?page=${page}`);
            const data = await response.json();
            setContacts((prevContacts) => [...prevContacts, ...data.results]);
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
        // Change the URL here
    };

    const handleModalBClick = () => {
        setShowModalA(false);
        setShowModalB(true);
        setShowModalC(false);
        // Change the URL here
    };

    const handleModalCClick = () => {
        setShowModalA(false);
        setShowModalB(false);
        setShowModalC(true);
    };

    const closeModal = () => {
        setShowModalA(false);
        setShowModalB(false);
        setShowModalC(false);
    };

    return (
        //         <div className="container">
        //             <div className="row justify-content-center mt-5">
        //                 <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        //                 <div className="d-flex justify-content-center gap-3">
        //                     <button
        //                         className="btn btn-lg btn-outline-primary"
        //                         type="button"
        //                         onClick={handleModalAClick}
        //                     >
        //                         All Contacts
        //                     </button>
        //                     <button
        //                         className="btn btn-lg btn-outline-warning"
        //                         type="button"
        //                         onClick={handleModalBClick}
        //                     >
        //                         US Contacts
        //                     </button>
        //                 </div>

        //                 {showModalA && (
        //                     <Modal
        //                         title="Modal A"
        //                         color="#46139f"
        //                         onClose={closeModal}
        //                         footerContent={
        //                             <div>
        //                                 <input
        //                                     type="checkbox"
        //                                     id="onlyEvenCheckbox"
        //                                     checked={onlyEven}
        //                                     onChange={() => setOnlyEven(!onlyEven)}
        //                                 />
        //                                 <label htmlFor="onlyEvenCheckbox">Only even</label>
        //                             </div>
        //                         }
        //                         onSearch={(value) => setSearchTerm(value)}
        //                     >
        //                         {/* Display contacts from API in Modal A */}
        //                         {filterContacts().map((contact) => (
        //                             <div key={contact.id} onClick={handleModalCClick}>
        //                                 <div key={contact.id}>
        //                                     {contact.name} - {contact.country}
        //                                 </div>
        //                             </div>
        //                         ))}
        //                     </Modal>
        //                 )}

        //                 {showModalB && (
        //                     <Modal
        //                         title="Modal B"
        //                         color="#ff7f50"
        //                         onClose={closeModal}
        //                         footerContent={
        //                             <div>
        //                                 <input
        //                                     type="checkbox"
        //                                     id="onlyEvenCheckbox"
        //                                     checked={onlyEven}
        //                                     onChange={() => setOnlyEven(!onlyEven)}
        //                                 />
        //                                 <label htmlFor="onlyEvenCheckbox">Only even</label>
        //                             </div>
        //                         }
        //                         onSearch={(value) => setSearchTerm(value)}
        //                     >
        //                         {/* Display contacts from API in Modal B (only from US) */}
        //                         {filterContacts().map((contact) => (
        //   <div key={contact.id} onClick={handleModalCClick}>
        //     <div key={contact.id}>
        //       {contact.name} - {contact.country}
        //     </div>
        //   </div>
        // ))}
        //                     </Modal>
        //                 )}

        //                 {showModalC && (
        //                     <Modal title="Modal C" color="#46139f" onClose={closeModal}>
        //                         {/* Display contact details in Modal C */}
        //                         {/* You need to implement the content for Modal C based on the selected contact */}
        //                     </Modal>
        //                 )}


        //             </div>
        //         </div>
        <>
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                Launch demo modal
            </button>

            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            ...
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Problem2;
