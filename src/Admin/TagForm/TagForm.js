import React, { useState, useEffect } from 'react';
import axios from 'axios';

import TagTable from './TagTable';
import { APP_URL } from '../../constants';

function NewTagForm() {
  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    await axios.get(APP_URL + 'tags').then(res => {
      const tagData = res.data;
      setTags(tagData.data);
      console.log(tagData.data);
    });
  };
  const initialState = {
    name: '',
  };

  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState(initialState);

  const [edit, setEdit] = useState(false);
  const onChange = e => {
    setTag({
      ...tag,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    addTag(tag);
  };

  const changeState = tag => {
    setEdit(true);

    setTag(tag);
  };

  const addTag = tag => {
    console.log('taaag', tag);
    if (edit) {
      axios.patch(`${APP_URL}tag/${tag.id}`, tag);
      setTimeout(() => {
        fetchTags();
      }, 1000);
    } else {
      axios
        .post(APP_URL + `tag`, tag)
        .then(function(response) {
          setTags([...tags.data, tag]);
          console.log(response);
          fetchTags();
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  };

  const deleteTag = id => {
    //  setEditing(false);
    axios.delete(`http://localhost:8888/tag/${id}`).then(res => {
      setTags(tags.filter(tag => tag.id !== id));
    });
  };

  return (
    <div>
      {/* {edit ? 'TRUE' : 'false'} */}
      <TagTable
        tags={tags}
        editRow={tag => changeState(tag)}
        deleteTag={id => deleteTag(id)}
      />
      <form onSubmit={handleSubmit}>
        <br />

        <input
          onChange={onChange}
          type="text"
          name="name"
          value={tag.name}
          placeholder="tag name"
        />
        <br />

        <button>SUBMIT</button>
      </form>
    </div>
  );
}
export default NewTagForm;
