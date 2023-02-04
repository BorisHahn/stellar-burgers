import React from 'react';
import './App.css';
import { useState, useEffect } from 'react';
import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngridients from '../BurgerIngredients/BurgerIngridients';

const App = () => {
  const [ingredients, setIngredients] = useState([]);

  const getIngredients = () => {
    fetch('https://norma.nomoreparties.space/api/ingredients')
      .then((response) => response.json())
      .then((res) => {
        setIngredients([...res.data])
        console.log(res);
      })
      .catch((e) => console.error(e));
  };

  useEffect(() => {
    getIngredients();
  }, []);

  return (
    <div className='page'>
      <AppHeader />
      <div className='main'>
        <BurgerIngridients ingredients={ingredients}/>
        <BurgerConstructor ingredients={ingredients} />
      </div>
    </div>
  );
};

export default App;
