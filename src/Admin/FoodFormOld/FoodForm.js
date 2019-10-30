import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useToggle } from '../../hooks/useToggle';
import FoodTable from './FoodTable';

function NewFoodForm() {
  useEffect(() => {
    fetchFood();
    fetchCategories();
  }, []);

  const fetchFood = async () => {
    await axios.get('http://localhost:8888/food').then(res => {
      const foodData = res.data;
      setFoodData(foodData);
    });
  };
  const fetchCategories = async () => {
    await axios.get('http://localhost:8888/category').then(res => {
      const categoriesData = res.data;
      setCategories(categoriesData);
    });
  };
  const initialState = {
    name: '',
    description: '',
    category: 0,
    dog_food: false,
    edible: false,
  };
  const [foodData, setFoodData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [food, setFood] = useState(initialState);
  const [edible, setEdible] = useToggle(true);
  const [dogfood, setDogfood] = useToggle(true);
  const [edit, setEdit] = useState(false);
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

  const handleSelect = e => {
    setFood({
      ...food,
      category: Number(e.target.value),
    });
  };
  const handleSubmit = e => {
    e.preventDefault();
    console.log('food:', food);
    addFood(food);
  };

  const changeState = food => {
    setEdit(true);

    setFood(food);
  };

  const addFood = food => {
    if (edit) {
      delete food.food_category;
      delete food.tags;
      axios.patch(`http://localhost:8888/food/${food.id}`, food);
      setTimeout(() => {
        fetchFood();
      }, 1000);
    } else {
      delete food.food_category;
      delete food.tags;
      food.id = foodData.length + 1;
      axios
        .post(`http://localhost:8888/food`, food)
        .then(function(response) {
          setFoodData([...foodData, food]);
          console.log(response);
          fetchFood();
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  };

  const deleteFood = id => {
    //  setEditing(false);
    axios.delete(`http://localhost:8888/food/${id}`).then(res => {
      setFoodData(foodData.filter(food => food.id !== id));
    });
  };

  return (
    <div>
      {/* {edit ? 'TRUE' : 'false'} */}
      <FoodTable
        foods={foodData}
        editRow={food => changeState(food)}
        deleteFood={id => deleteFood(id)}
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

        <select value={food.category} onChange={handleSelect}>
          <option value={0}>Select Category</option>
          {categories &&
            categories.map(cat => <option value={cat.id}>{cat.name}</option>)}
        </select>
        <br />

        <textarea
          onChange={onChange}
          type="text"
          name="description"
          value={food.description}
          placeholder="description"
        />

        <div className="radio">
          <label className="label-contain">
            Is it edible?
            <label class="switch">
              <input
                onChange={() => {
                  setEdible();
                  handleEdible();
                }}
                type="checkbox"
                name="edible"
                checked={food.edible}
              />
              <span class="slider round" />
            </label>
          </label>
        </div>

        <div className="radio">
          <label className="label-contain">
            Is it in dog food?
            <label class="switch">
              <input
                onChange={() => {
                  setDogfood();
                  handleDogfood();
                }}
                type="checkbox"
                name="dog_food"
                checked={food.dog_food}
              />
              <span class="slider round" />
            </label>
          </label>
        </div>

        <button>SUBMIT</button>
      </form>
    </div>
  );
}
export default NewFoodForm;
