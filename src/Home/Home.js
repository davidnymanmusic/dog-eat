import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Autocomplete from '../components/Autocomplete';
import { APP_URL } from '../constants';
import { useToggle } from '../hooks/useToggle';
import Bubble from './Bubble';

const warningWords = ['choking', 'caution'];

const images = [
  'https://i.imgur.com/4kO8f8O.png',
  'https://i.imgur.com/vyjHXAT.png',
];

let currentImage = 0;
const imageMax = 2;
const green = '#45c640';
const red = '#f20a42';

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
  const [fetched, setFetched] = useState(false);
  const [nav, hideNav] = useToggle(false);

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
    setFetched(true);
  };
  const fetchTagged = async tag => {
    const response = await axios.get(APP_URL + `queries/tags/?tag=${tag}`);
    setTagged(response.data.foods);
    setTagLabel(`Related to ${tag}`);
  };

  const onKeyPress = event => {
    currentImage = (imageMax + currentImage - 1) % imageMax;
    setImage(images[currentImage]);
  };

  const getFood = food => {
    fetchRelatedFoods('category', food.category, edible);
    setFood(food);
    setEdible(food.edible);
    setFoodByCategory(['']);
    setTagged([]);
    fetchRelatedFoods('category', food.category, food.edible);
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
      {Object.keys(food).length ? (
        <button
          className="hide"
          style={{ float: 'left', marginBotton: 20 }}
          onClick={hideNav}
        >
          {nav ? 'Hide' : 'Show More'}
        </button>
      ) : null}
      {nav ? (
        <div className="sidenav food-list">
          {fetched ? (
            <>
              <button
                className={'toggle inedible'}
                onClick={() =>
                  fetchRelatedFoods('category', food.category, false)
                }
              >
                Inedible {food.category}
              </button>

              <button
                className={'toggle edible'}
                onClick={() =>
                  fetchRelatedFoods('category', food.category, true)
                }
              >
                Edible {food.category}
              </button>
            </>
          ) : null}
          <ul>
            {foodByCategory.length > 0
              ? foodByCategory
                  .sort((a, b) => (a.name > b.name ? 1 : -1))
                  .map(f => (
                    <li
                      style={{
                        color: f.edible ? green : red,
                        textDecoration: 'underline',
                        cursor: 'pointer',
                      }}
                      className="foods"
                      onClick={() => {
                        setBrowse(true);
                        setFood(f);
                      }}
                    >
                      {f.name}
                    </li>
                  ))
              : null}
          </ul>
        </div>
      ) : null}
      {process.env.NODE_ENV === 'development' ? (
        <a href="/admin">Admin</a>
      ) : null}
      <h1 id="title"> Dog Eat ? </h1>
      <div className="description">
        <img className="arthur" src={image} alt="arthur" />

        <Bubble
          edible={food.edible}
          typing={typing}
          warning={
            food.tags
              ? food.tags.some(r => warningWords.indexOf(r) >= 0) && food.edible
              : false
          }
        />

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
            <h1
              style={{
                color: 'black',
                textDecoration: 'underline',
                textDecorationColor: 'red',
              }}
            >
              {food.tags.some(r => warningWords.indexOf(r) >= 0) && food.edible
                ? ' But be careful!'
                : ''}
            </h1>
            <p>{food.description !== undefined ? food.description : null} </p>
            <p className="dogfood">
              {food.dog_food
                ? 'This can be found in dog food ingredients'
                : null}{' '}
            </p>
            <div>
              <h3>{food.tags.length ? 'click to see releated foods' : null}</h3>
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
        {foodByTags.length > 0 ? (
          <>
            <h3>{tagLabel}</h3>
            <div className="tag-wrap">
              {foodByTags
                ? foodByTags.map(f => (
                    <p
                      className={'tag-chip'}
                      style={{
                        borderRadius: 10,
                        color: '#fff',
                        backgroundColor: f.edible ? green : red,
                      }}
                      onClick={() => {
                        setTagLabel('');
                        setFood(f);
                        setTagged([]);
                        fetchRelatedFoods('category', f.category, f.edible);
                        setBrowse(true);
                        setTyping(false);
                      }}
                    >
                      {f.name}
                    </p>
                  ))
                : null}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default Home;
