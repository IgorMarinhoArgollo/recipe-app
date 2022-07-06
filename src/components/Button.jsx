import PropTypes from 'prop-types';
import React from 'react';

export default function Button({ labelText, disabled, onClick, key, className }) {
  return (
    <div key={ key }>
      <button
        type="button"
        disabled={ disabled }
        onClick={ onClick }
        className={ className }
      >
        { labelText }
      </button>
    </div>
  );
}

Button.propTypes = {
  disabled: PropTypes.bool,
  labelText: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  key: PropTypes.string,
  className: PropTypes.string,
};

Button.defaultProps = {
  disabled: true,
  className: '',
  key: '',
};
