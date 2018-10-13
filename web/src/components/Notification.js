import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Modal, { ModalDialog, ModalBody } from 'components/Modal';


const Notification = ({ type, isOpen, message, onToggle }) => (
  <Modal
    isOpen={isOpen}
    backdrop={false}
    className="notification"
  >
    <ModalDialog
      className={classnames({ [type]: type })}
    >
      <ModalBody>
        <div>{ message }</div>
        <button
          type="button"
          onClick={onToggle}
          className="btn"
        >
          &times;
        </button>
      </ModalBody>
    </ModalDialog>
  </Modal>
);

Notification.defaultProps = {
  type: 'danger',
};

Notification.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  message: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['danger', 'success'])
};

export default Notification;
