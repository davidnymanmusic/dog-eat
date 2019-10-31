import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useToggle } from '../../hooks/useToggle';
import CategoryTable from './CategoryTable';

function CategoryForm(props) {
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    await axios.get('http://localhost:5000/api/categories').then(res => {
      const categoriesData = res.data;
      setCategories(categoriesData.data);
    });
  };
  const initialState = {
    name: '',
  };

  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(initialState);

  const [edit, setEdit] = useState(false);
  const onChange = e => {
    setCategory({
      ...category,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('category:', category);
    addCategory(category);
  };

  const changeState = category => {
    setEdit(true);
    setCategory(category);
  };

  const addCategory = category => {
    if (edit) {
      axios.put(
        `http://localhost:5000/api/categories/${category._id}`,
        category,
      );
      setTimeout(() => {
        fetchCategories();
      }, 1000);
    } else {
      axios
        .post(`http://localhost:5000/api/categories`, category)
        .then(function(response) {
          setCategories([...categories, category]);
          console.log(response);
          fetchCategories();
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  };

  const deleteCategory = id => {
    //  setEditing(false);
    axios.delete(`http://localhost:5000/api/categories/${id}`).then(res => {
      setCategories(categories.filter(category => category._id !== id));
    });
  };

  return (
    <div>
      <h1>{props.title}</h1>
      <CategoryTable
        categories={categories}
        editRow={category => changeState(category)}
        deleteCategory={id => deleteCategory(id)}
      />
      <form onSubmit={handleSubmit}>
        <br />

        <input
          onChange={onChange}
          type="text"
          name="name"
          value={category.name}
          placeholder="category name"
        />
        <br />

        <button>SUBMIT</button>
      </form>
    </div>
  );
}
export default CategoryForm;
