import PropTypes from 'prop-types';
import React, { useState } from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import ImageButton from './ImageButton';
import shareIcon from '../images/shareIcon.svg';
import favIcon from '../images/blackHeartIcon.svg';

export default function FavCard(props) {
  const [copiedLink, setCopiedLink] = useState(false);
  const {
    dataRecipe: {
      category, alcoholicOrNot, name, area,
      image, type, id }, onClick } = props;
  const timeout = () => {
    const time = 500;
    setTimeout(() => {
      setCopiedLink(false);
    }, time);
  };
  const handleShareBtn = () => {
    const saveClipboard = `http://localhost:3000/${type}s/${id}`;
    setCopiedLink(true);
    copy(saveClipboard);
    timeout();
  };

  return (
    <div className="doneCard">
      <Link to={ `/${type}s/${id}` }>
        <img
          src={ image }
          alt={ name }
          className="mainImage"
        />
      </Link>
      <div>
        <div>
          <Link to={ `/${type}s/${id}` }>
            <h3>{ name }</h3>
          </Link>
          <h2>
            { type === 'comida' ? `${area} - ${category}` : alcoholicOrNot }
          </h2>
        </div>
        <div className="interactionFavBtn">
          <div className="shareFavBtn">
            <ImageButton
              onClick={ onClick }
              imageSrc={ favIcon }
              altImage="icone para favoritas"
            />
          </div>
          <div className="shareFavBtn">
            <ImageButton
              onClick={ handleShareBtn }
              imageSrc={ shareIcon }
              altImage="icone para compatilhar"
            />
            { copiedLink && <p className="copiedLink">Link copiado!</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

FavCard.propTypes = {
  dataRecipe: PropTypes.shape({
    alcoholicOrNot: PropTypes.string,
    category: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    id: PropTypes.string,
    area: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};
