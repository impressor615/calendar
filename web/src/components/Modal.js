import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Button from 'components/Button';

export const ModalHeader = ({ children, onToggle }) => (
  <div className="modal-header">
    <div>{children}</div>
    <Button onClick={onToggle}>&times;</Button>
  </div>
);

ModalHeader.propTypes = {
  children: PropTypes.node.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export const ModalBody = ({ children }) => (
  <div className="modal-body">
    {children}
  </div>
);

ModalBody.propTypes = {
  children: PropTypes.node.isRequired,
};

export const ModalFooter = ({ children }) => (
  <div className="modal-footer">
    { children }
  </div>
);

ModalFooter.propTypes = {
  children: PropTypes.node.isRequired,
};

export const ModalDialog = ({ children, ...rest }) => (
  <div className={classnames('modal-dialog', rest.className)}>
    { children }
  </div>
);

ModalDialog.propTypes = {
  children: PropTypes.node.isRequired,
};

const Modal = ({ isOpen, children, backdrop, onToggle, ...rest }) => (
  isOpen ? (
    ReactDOM.createPortal(
      <div
        {...rest}
        className={classnames('modal', rest.className)}
      >
        {children}
        { backdrop ? <div className="modal-backdrop" onClick={onToggle} /> : null }
      </div>,
      document.getElementById('modal-root'),
    )
  ) : null
);

Modal.defaultProps = {
  backdrop: true,
  onToggle: () => {},
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onToggle: PropTypes.func,
  backdrop: PropTypes.bool,
};

export default Modal;
