import PropTypes from 'prop-types';
import React, { useState } from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import ImageButton from './ImageButton';
import shareIcon from '../images/shareIcon.svg';

export default function DoneCard(props) {
  const [copiedLink, setCopiedLink] = useState(false);
  const {
    dataRecipe: {
      category, alcoholicOrNot, name, area,
      image, doneDate, tags, type, id } } = props;

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
      <div className="shareDoneBtn">
        <ImageButton
          onClick={ handleShareBtn }
          imageSrc={ shareIcon }
          altImage="icone para compatilhar"
        />
        {copiedLink && <p className="copiedLink">Link copiado!</p>}
      </div>
      <div>
        <div>
          <Link to={ `/${type}s/${id}` }>
            <h3>{name}</h3>
          </Link>
          <h2>
            {type === 'comida' ? `${area} - ${category}` : alcoholicOrNot}
          </h2>
        </div>
      </div>
      <div>
        <p
          className={ type === 'comida'
            && tags.length > 0 ? 'doneDateMeal' : 'doneDateDrink' }
        >
          {`Done date: ${doneDate}`}
        </p>
        {tags.map((tag, i) => (
          i < 2
          && <p key={ tag }>{tag}</p>
        ))}
      </div>
    </div>
  );
}

DoneCard.propTypes = {
  dataRecipe: PropTypes.shape({
    alcoholicOrNot: PropTypes.string,
    category: PropTypes.string,
    doneDate: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.any),
    type: PropTypes.string,
    id: PropTypes.string,
    area: PropTypes.string,
  }).isRequired,
};
