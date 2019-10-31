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
  const [tagLabel, setTagLabel] = useState('');

  useEffect(() => {
    fetchFood();
  }, []);
  const colorize = edible => {
    if (edible) {
      return 'yes';
    } else {
      return 'no';
    }
  };

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
    setTagLabel(tag);
  };

  const onKeyPress = event => {
    currentImage = (imageMax + currentImage - 1) % imageMax;
    setImage(images[currentImage]);
  };

  const getFood = food => {
    setFood(food);

    setEdible(food.edible);
    setFoodByCategory([]);
    setTagged([]);
    if (food.edible) {
      setImage('https://i.imgur.com/4kO8f8O.png');
    } else {
      setImage('https://i.imgur.com/vyjHXAT.png');
    }
  };

  const isTyping = type => {
    setTyping(type);
  };

  return (
    <div className="home">
      <div className="sidenav">
        {foodByCategory.length ? (
          <>
            {!food.edible ? (
              <button
                className={'toggle'}
                style={{ border: '2px solid red' }}
                onClick={() =>
                  fetchRelatedFoods('category', food.category, false)
                }
              >
                Non Edible {food.category}
              </button>
            ) : (
              <button
                className={'toggle'}
                style={{ border: '2px solid green' }}
                onClick={() =>
                  fetchRelatedFoods('category', food.category, true)
                }
              >
                Other Edible {food.category}
              </button>
            )}
            {food.edible ? (
              <button
                className={'toggle'}
                style={{ border: '2px solid red' }}
                onClick={() =>
                  fetchRelatedFoods('category', food.category, false)
                }
              >
                Non Edible {food.category}
              </button>
            ) : (
              <button
                className={'toggle'}
                style={{ border: '2px solid green' }}
                onClick={() =>
                  fetchRelatedFoods('category', food.category, true)
                }
              >
                Other Edible {food.category}
              </button>
            )}
          </>
        ) : null}
        {foodByCategory.length > 0
          ? foodByCategory
              .sort((a, b) => (a.name > b.name ? 1 : -1))
              .map(f => (
                <li
                  style={{ color: food.edible ? 'green' : 'red' }}
                  onClick={() => {
                    setBrowse(true);
                    setFood(f);
                  }}
                >
                  {f.name}
                </li>
              ))
          : null}
        {foodByTags.length ? (
          <div>
            <h3>Related to {tagLabel}</h3>
            {foodByTags.map(f => (
              <li
                onClick={() => {
                  setBrowse(true);
                  setFood(f);
                }}
              >
                {f.name}
              </li>
            ))}
          </div>
        ) : null}
      </div>
      <a href="/admin">Admin</a>
      <h1> Dog Eat ? </h1>
      <div className="description">
        <img className="arthur" src={image} alt="arthur" />
        <Bubble edible={food.edible} typing={typing}></Bubble>
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
            typing={isTyping}
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
            {food.category !== null ? (
              <button
                onClick={() =>
                  fetchRelatedFoods('category', food.category, edible)
                }
              >
                More {food.category ? food.category : 'Food'}s
              </button>
            ) : null}{' '}
            <p className="dogfood">
              {food.dog_food
                ? 'This can be found in dog food ingredients'
                : null}{' '}
            </p>
            <div>
              {food.tags.map(t => (
                <span
                  onClick={() => {
                    fetchTagged(t);
                  }}
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
