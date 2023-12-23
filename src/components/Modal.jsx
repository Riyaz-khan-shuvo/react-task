
import React, { useEffect, useState } from 'react';

const Modal = ({ showModal, title, onClose, footerContent, onSearch, contactData, id, setSearchText }) => {


  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setSearchText(value); // Update the state in the parent component
  };


  return (
    <>
      {showModal && (
        <div className="modal fade" id={`${id}`} tabIndex="-1" aria-labelledby={`${id}Label`} aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id={`${id}Label`}> {title} </h5>

                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="d-flex justify-content-center gap-3">
                  <button
                    className="btn"
                    style={{ background: `#46139f`, color: "#fff" }}
                    type="button"
                    // onClick={handleModalAClick}
                    data-bs-toggle="modal"
                    data-bs-target="#allContact"
                  >
                    All Contacts
                  </button>
                  <button
                    className="btn"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#usContact"
                    style={{ background: `#ff7f50`, color: "#fff" }}
                  // onClick={handleModalBClick}
                  >
                    US Contacts
                  </button>
                </div>
                <div>
                  <div>
                    <div className="m-3">
                      <input type="text" onChange={e => setSearchText(e.target.value)} className="form-control" id="formGroupExampleInput" placeholder="Search Data" />
                    </div>
                  </div>
                  <div>
                    {
                      contactData.map((contact, index) => <div className='m-3' key={index}>
                        <div className='border p-3'>
                          Name: {contact.phone}<br />
                          {contact.country.name}
                        </div>
                      </div>)
                    }
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                {footerContent}
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;