import React from 'react';
import PropTypes from 'prop-types';

import Modal, { ModalDialog } from 'components/Modal';



const Loading = ({ isOpen, children }) => (
  <Modal isOpen={isOpen}>
    <ModalDialog className="center">
      {children}
    </ModalDialog>
  </Modal>
);

Loading.defaultProps = {
  children: 'Loading...',
};

Loading.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.node,
};

export default Loading;
