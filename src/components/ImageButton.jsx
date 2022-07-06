import PropTypes from 'prop-types';
import React from 'react';

export default function ImageButton({ onClick, imageSrc, altImage, className }) {
  return (
    <button onClick={ onClick } className={ className } type="button">
      <img
        src={ imageSrc }
        alt={ altImage }
      />
    </button>
  );
}

ImageButton.propTypes = {
  altImage: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  imageSrc: PropTypes.string.isRequired,
  className: PropTypes.string,
};

ImageButton.defaultProps = {
  className: '',
};
