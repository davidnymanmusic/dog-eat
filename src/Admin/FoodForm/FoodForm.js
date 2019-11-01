import React, { useState, useEffect } from 'react';

import { useToggle } from '../../hooks/useToggle';
// import api from '../../api';
import axios from 'axios';
import TagSelect from '../../components/TagSelect/TagSelect';
import FoodTable from './FoodTable';
import { APP_URL } from '../../constants';
import Modal from '../../components/Modal';

function FoodForm(props) {
  const fetchFood = async () => {
    await axios.get(APP_URL + 'foods').then(res => {
      const foodData = res.data;
      setFoodData(foodData.data);
    });
  };
  const fetchCategories = async () => {
    await axios.get(APP_URL + 'categories').then(res => {
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
  const [newOpen, setNewOpen] = useState(false);
  const [tags, setTags] = useState([]);
  const [search, setSearch] = useState('');

  const [edit, setEdit] = useState(false);
  const [show, setModal] = useState(false);

  const changeState = food => {
    setEdit(true);
    setModal(true);
    setFood(food);
    setTags(food.tags.map(f => ({ label: f, value: f })));
  };

  useEffect(() => {
    fetchFood();
    fetchCategories();
  }, []);

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
  const deleteFood = id => {
    if (window.confirm('Press a button!')) {
      return axios.delete(`http://localhost:5000/api/foods/${id}`).then(res => {
        setFoodData(foodData.filter(food => food._id !== id));
      });
    } else {
      return;
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (edit) {
      if (tags !== null) {
        food.tags = tags.map(t => t.label);
      } else {
        food.tags = [];
      }

      axios
        .put(`http://localhost:5000/api/foods/${food._id}`, food)
        .then(res => console.log(res));
      setFood(initialState);
      setTags([]);
      setTimeout(() => {
        fetchFood();
      }, 1000);
    } else {
      food.tags = tags.map(t => t.label);
      axios.post(`http://localhost:5000/api/foods`, food);
      setFood(initialState);
      setTags([]);
      fetchFood();
    }
  };
  const selectTags = newTags => {
    if (tags) setTags(newTags);
  };

  const filterFood = () => {
    const filter = foodData.filter(food => {
      let f =
        food.name.toLowerCase() +
        food.description.toLowerCase() +
        food.tags.join(',').toLowerCase() +
        food.category.toLowerCase();
      return f.indexOf(search.toLowerCase()) !== -1;
    });
    return filter;
  };
  useEffect(() => {
    filterFood();
  }, [search, foodData]);
  const showModal = e => {
    setModal(!show);
  };
  return (
    <div>
      <h1>{props.title}</h1>
      {!show ? (
        <button
          style={{ float: 'right' }}
          onClick={e => {
            setModal(e);
          }}
        >
          Add New Food
        </button>
      ) : null}
      <Modal onClose={showModal} show={show}>
        <br></br>
        <>
          <form className="form" onSubmit={handleSubmit}>
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
            <TagSelect
              selectTags={selectTags}
              value={tags ? tags : undefined}
            />
            <br />
            <textarea
              onChange={onChange}
              type="text"
              name="description"
              value={food.description}
              placeholder="description"
            />
            <br />
            <select
              name="category"
              onChange={onChange}
              required
              value={food.category ? food.category : 0}
            >
              <option value={0}>Select Category</option>
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
            <button id="bigbtn">SUBMIT</button>
          </form>
        </>
      </Modal>
      <></>
      <input
        placeholder="Search for food"
        onChange={e => {
          setSearch(e.target.value);
        }}
      ></input>
      <FoodTable
        foods={filterFood()}
        editRow={food => changeState(food)}
        deleteFood={id => deleteFood(id)}
      />
    </div>
  );
}
export default FoodForm;
