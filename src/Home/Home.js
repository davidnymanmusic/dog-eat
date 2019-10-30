import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Autocomplete from '../components/Autocomplete';
import { APP_URL } from '../constants';

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
  useEffect(() => {
    fetchFood();
  }, []);

  const fetchFood = async () => {
    await axios.get(APP_URL + 'foods').then(res => {
      const foodData = res.data.data;
      setFoodData(foodData);
    });
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
    if (food.edible) {
      setImage('https://i.imgur.com/4kO8f8O.png');
    } else {
      setImage('https://i.imgur.com/vyjHXAT.png');
    }
  };

  return (
    <div className="home">
      <a href="/admin">Admin</a>
      <h1> Dog Eat ? </h1>
      <div className="description">
        <img className="arthur" src={image} alt="arthur" />
        <br />
        <Autocomplete
          getFood={getFood}
          suggestions={foodData}
          onKeyPress={onKeyPress}
        />
        {food.edible !== undefined ? (
          <div>
            <h1 className={colorize(food.edible)}>
              {food.edible !== undefined
                ? ` ${food.edible ? 'Yes' : 'No'} to ${food.name}!`
                : null}
            </h1>

            <p>{food.description !== undefined ? food.description : null} </p>
            <p>{food.category !== undefined ? food.category : null} </p>
            <p className="dogfood">
              {food.dog_food
                ? 'This can be found in dog food ingredients'
                : null}{' '}
            </p>
            <div>
              {food.tags.map(t => (
                <span className="tags">{`${t} `}</span>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Home;
