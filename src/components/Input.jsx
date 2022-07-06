import PropTypes from 'prop-types';
import React from 'react';

export default function Input({
  testid, placeholder, type,
  onChange, value, labelText = '',
  name = '',
}) {
  return (
    <div>
      <label htmlFor={ testid }>
        <input
          id={ testid }
          type={ type }
          value={ value }
          onChange={ onChange }
          placeholder={ placeholder }
          name={ name }
        />
        { labelText }
      </label>
    </div>
  );
}

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  testid: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  labelText: PropTypes.string,
  name: PropTypes.string,
};

Input.defaultProps = {
  labelText: '',
  name: '',
};
