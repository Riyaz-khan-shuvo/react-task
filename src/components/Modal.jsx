import React from 'react';

const Modal = ({ title, color, onClose, children, footerContent, onSearch }) => {
  return (
    <div className="modal" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content" style={{ borderColor: color }}>
          <div className="modal-header">
            <h5 className="modal-title" style={{ color }}>
              {title}
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
                onChange={(e) => onSearch(e.target.value)}
              />
            </div>
            {children}
          </div>
          <div className="modal-footer">
            {footerContent}
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
