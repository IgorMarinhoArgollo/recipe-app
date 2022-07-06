import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="celphone">
      <div className="mainPage">
        <div>
          <p>Not Found</p>
        </div>
      </div>
      <Link className="celphoneBtn" to="/" />
    </div>
  );
}
