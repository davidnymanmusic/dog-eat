import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Autocomplete from '../components/Autocomplete';
import { APP_URL } from '../constants';
import { useToggle } from '../hooks/useToggle';
import Bubble from './Bubble';

const images = [
  'https://i.imgur.com/4kO8f8O.png',
  'https://i.imgur.com/vyjHXAT.png',
];

let currentImage = 0;
const imageMax = 2;

function Home() {
  const [image, setImage] = useState(images[currentImage]);
  const [food, setFood] = useState({});
  const [foodData, setFoodData] = useState([]);
  const [foodByCategory, setFoodByCategory] = useState([]);
  const [foodByTags, setTagged] = useState([]);
  const [typing, setTyping] = useState(true);
  const [edible, setEdible] = useState(true);
  const [browse, setBrowse] = useState(false);

  useEffect(() => {
    fetchFood();
  }, []);

  const fetchFood = async () => {
    await axios.get(APP_URL + 'foods').then(res => {
      const foodData = res.data.data;
      setFoodData(foodData);
    });
  };

  const fetchRelatedFoods = async (prop, value, edible) => {
    await axios
      .get(APP_URL + `queries?value=${value}&prop=${prop}&edible=${edible}`)
      .then(res => setFoodByCategory(res.data.foods));
  };
  const fetchTagged = async tag => {
    const response = await axios.get(APP_URL + `queries/tags/?tag=${tag}`);
    setTagged(response.data.foods);
  };

  const colorize = edible => {
    if (edible) {
      return 'yes';
    } else {
      return 'no';
    }
  };
  const onKeyPress = event => {
    currentImage = (imageMax + currentImage - 1) % imageMax;
    setImage(images[currentImage]);
  };

  const getFood = food => {
    setFood(food);
    setTyping(false);
    setEdible(food.edible);
    setFoodByCategory([]);
    setTagged([]);
    if (food.edible) {
      setImage('https://i.imgur.com/4kO8f8O.png');
    } else {
      setImage('https://i.imgur.com/vyjHXAT.png');
    }
  };

  return (
    <div className="home">
      <div className="sidenav">
        <button
          className="toggle"
          onClick={() => fetchRelatedFoods('category', food.category, false)}
        >
          Non Edible {food.category}
        </button>
        <button
          className="toggle"
          onClick={() => fetchRelatedFoods('category', food.category, true)}
        >
          Other Edible {food.category}
        </button>
        {foodByCategory.length > 0
          ? foodByCategory
              .sort((a, b) => (a.name > b.name ? 1 : -1))
              .map(f => (
                <li
                  onClick={() => {
                    setBrowse(true);
                    setFood(f);
                  }}
                >
                  {f.name}
                </li>
              ))
          : 'None'}
        <div>
          <h3>Related Foods</h3>
          {foodByTags.map(f => (
            <li>{f.name}</li>
          ))}
        </div>
      </div>
      <a href="/admin">Admin</a>
      <h1> Dog Eat ? </h1>
      <div className="description">
        <img className="arthur" src={image} alt="arthur" />
        <Bubble typing={typing} edible={food.edible}></Bubble>
        <br />
        {browse ? (
          <h1 className="placeholder" onClick={() => setBrowse(false)}>
            {food.name}
          </h1>
        ) : (
          <Autocomplete
            getFood={getFood}
            suggestions={foodData}
            onKeyPress={onKeyPress}
            placeholder={'Search'}
            name="auto"
          />
        )}
        {food.edible !== undefined ? (
          <div>
            <h1 className={colorize(food.edible)}>
              {food.edible !== undefined
                ? ` ${food.edible ? 'Yes' : 'No'} to ${food.name}!`
                : null}
            </h1>

            <p>{food.description !== undefined ? food.description : null} </p>
            <p
              onClick={() =>
                fetchRelatedFoods('category', food.category, edible)
              }
            >
              {food.category !== undefined ? food.category : null}{' '}
            </p>
            <p className="dogfood">
              {food.dog_food
                ? 'This can be found in dog food ingredients'
                : null}{' '}
            </p>
            <div>
              {food.tags.map(t => (
                <span
                  onClick={() => fetchTagged(t)}
                  className="tags"
                >{`${t} `}</span>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Home;
