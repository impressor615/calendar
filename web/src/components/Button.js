import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';


const Button = ({ children, color, onClick, active, ...rest }) => (
  <button
    type="button"
    onClick={onClick}
    {...rest}
    className={classnames(
      'btn',
      rest.className,
      { [color]: color },
      { active },
    )}>
    { children }
  </button>
);

Button.defaultProps = {
  color: '',
  active: false,
  onClick: () => {},
};

Button.propTypes = {
  color: PropTypes.oneOf(['', 'primary', 'secondary']),
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  active: PropTypes.bool,
}

export default Button;
