import React, {useEffect, useState} from 'react';
import Recipe from './Recipe';
import Title from './Title';
import './App.css';

function App() {

  const APP_ID = 'd7346922';
  const APP_KEY = 'dca4cee4d1f27f88288f5c05e11fa4a8';

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState(['']);
  const [query, setQuery] = useState('');

  useEffect( () => {
    getRecipes();
  }, [query]);
  //empty array means useEffect only runs once when application mounts
  //counter changes, then use effect runs

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  }


  const updateSearch = e => {
    setSearch(e.target.value);
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  };

  return (
    <div className="App">
      <div className="title">Search for Recipes</div>
      <form onSubmit={getSearch} className = "search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
        <button className="search-button" type="submit">Search</button>
      </form>
      <div className="recipes">
      {recipes.map(recipe =>(
        <Recipe
        key={recipe.recipe.label}
        title={recipe.recipe.label}
        calories={recipe.recipe.calories} 
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}/>
      ))}
      </div>
    </div>
  );
}

export default App;
