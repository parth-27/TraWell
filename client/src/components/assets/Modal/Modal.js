import React from 'react';
import './Modal.css';

export const Modal = ({ title, tagLine, handleClose, show, children }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                <div className="modal-header">
                    <div className="modal-header-title">
                        <p className="modal-title"> {title} </p>
                        <p className="modal-tagline"> {tagLine} </p>
                    </div>
                    <div className="close-button">
                        <button onClick={handleClose} type="button" height="44px" style={{ borderRadius: 50, borderColor: 'rgba(0,0,0,0.2)', paddingRight: "2%" }}><img src="/close-button.png" alt="Close" height="40px" style={{ borderRadius: 50 }} /></button>
                    </div>
                </div>
                <hr className="separator" />
                {children}
            </section>

        </div>
    );
};