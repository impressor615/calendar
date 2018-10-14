import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Button from 'components/Button';


const EventBlock = ({
  children,
  onToggle,
  onDragStart,
  fluid,
  ...rest
}) => (
  <Button
    {...rest}
    draggable
    onClick={onToggle}
    onDragStart={onDragStart}
    className={classnames(
      'event-block',
      rest.className,
      { fluid },
    )}
  >
    { children }
  </Button>
);

EventBlock.defaultProps = {
  fluid: false,
};

EventBlock.propTypes = {
  children: PropTypes.node.isRequired,
  onToggle: PropTypes.func.isRequired,
  onDragStart: PropTypes.func.isRequired,
  fluid: PropTypes.bool,
}

export default EventBlock;