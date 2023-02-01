import React from 'react';
import './App.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngridients from '../BurgerIngredients/BurgerIngridients';

const App = () => {
  return (
    <div className='page'>
      <AppHeader />
      <div className='main'>
        <BurgerConstructor />
        <BurgerIngridients />
      </div>
    </div>
  );
};

export default App;
