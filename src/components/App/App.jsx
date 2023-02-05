import React from 'react';
import './App.css';
import { useState, useEffect } from 'react';
import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';

const App = () => {
  const [ingredients, setIngredients] = useState([]);

  const getIngredients = () => {
    fetch('https://norma.nomoreparties.space/api/ingredients')
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(`Ошибка ${response.status}`);
      })
      .then((res) => {
        setIngredients([...res.data]);
      })
      .catch((e) => console.error(e));
  };

  useEffect(() => {
    getIngredients();
  }, []);

  return (
    <main className='page'>
      <AppHeader />
      <div className='main'>
        <BurgerIngredients ingredients={ingredients} />
        <BurgerConstructor ingredients={ingredients} />
      </div>
    </main>
  );
};

export default App;
