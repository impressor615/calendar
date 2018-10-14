import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';


const Arrow = ({ direction, onClick, ...rest }) => (
  <button
    {...rest}
    onClick={onClick}
    className={classnames(
      'arrow',
      rest.className,
      { [direction]: direction },
    )}
  />
);

Arrow.defaultProps = {
  direction: 'previous',
};

Arrow.propTypes = {
  direction: PropTypes.oneOf(['next', 'previous']),
  onClick: PropTypes.func.isRequired,
};

export default Arrow;