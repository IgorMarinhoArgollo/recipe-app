import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AreaSearch from '../components/AreaSearch';

export default function ExpComidaLocal() {
  const [areaList, setAreaList] = useState([]);

  async function fetchApiArea() {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    const result = await response.json();
    const areaData = result.meals
      .map((area) => area.strArea);
    setAreaList(areaData);
  }

  useEffect(() => {
    fetchApiArea();
  }, []);

  return (
    <div className="celphone">
      <div className="mainPage">
        <Header title="Explore By Origin" />
        { areaList.length > 0 && <AreaSearch areaList={ areaList } /> }
        <Footer />
      </div>
      <Link className="celphoneBtn" to="/" />
    </div>
  );
}
