import React, { useState, useEffect } from 'react';

import { useToggle } from '../../hooks/useToggle';
// import api from '../../api';
import axios from 'axios';
import TagSelect from '../../components/TagSelect/TagSelect';
import FoodTable from './FoodTable';

function NewFoodForm() {
  const fetchFood = async () => {
    await axios.get('http://localhost:5000/api/foods').then(res => {
      const foodData = res.data;
      setFoodData(foodData.data);
    });
  };
  const fetchCategories = async () => {
    await axios.get('http://localhost:5000/api/categories').then(res => {
      const categoriesData = res.data;
      setCategories(categoriesData.data);
    });
  };

  const initialState = {
    name: '',
    description: '',
    category: '',
    dog_food: false,
    edible: false,
    tags: [],
  };
  const [categories, setCategories] = useState([]);
  const [foodData, setFoodData] = useState([]);
  const [food, setFood] = useState(initialState);
  const [edible, setEdible] = useToggle(true);
  const [dogfood, setDogfood] = useToggle(true);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    fetchFood();
    fetchCategories();
  }, [foodData]);

  const onChange = e => {
    setFood({
      ...food,
      [e.target.name]: e.target.value,
    });
  };
  const handleEdible = () => {
    setFood({
      ...food,
      edible: edible,
    });
  };
  const handleDogfood = () => {
    setFood({
      ...food,
      dog_food: dogfood,
    });
  };

  const handleSubmit = async e => {
    food.tags = tags;
    e.preventDefault();
    axios.post(`http://localhost:5000/api/foods`, food);
    setFood(initialState);
    setTags([]);
    fetchFood();
  };
  const selectTags = tags => {
    if (tags) setTags(tags.map(t => t.value));
  };
  return (
    <div>
      {/* {edit ? 'TRUE' : 'false'} */}
      <FoodTable
        foods={foodData}
        // editRow={food => changeState(food)}
        // deleteFood={id => deleteFood(id)}
      />
      <form onSubmit={handleSubmit}>
        <br />
        <input
          onChange={onChange}
          type="text"
          name="name"
          value={food.name}
          placeholder="food name"
        />
        <br />

        <br />
        <TagSelect selectTags={selectTags} />
        <br />
        <textarea
          onChange={onChange}
          type="text"
          name="description"
          value={food.description}
          placeholder="description"
        />
        <br />
        <select name="category" onChange={onChange} required>
          <option>Select Category</option>
          {categories.map(c => (
            <option value={c.name}>{c.name}</option>
          ))}
        </select>
        <div className="radio">
          <label className="label-contain">
            Is it edible? {food.edible ? 'yes' : 'no'}
            <label className="switch">
              <input
                onChange={() => {
                  setEdible();
                  handleEdible();
                }}
                type="checkbox"
                name="edible"
                checked={food.edible}
              />
              <span className="slider round" />
            </label>
          </label>
        </div>
        <div className="radio">
          <label className="label-contain">
            Is it in dog food? {food.dog_food ? 'yes' : 'no'}
            <label className="switch">
              <input
                onChange={() => {
                  setDogfood();
                  handleDogfood();
                }}
                type="checkbox"
                name="dog_food"
                checked={food.dog_food}
              />
              <span className="slider round" />
            </label>
          </label>
        </div>
        <button>SUBMIT</button>
      </form>
    </div>
  );
}
export default NewFoodForm;
