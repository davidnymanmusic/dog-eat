import React, { useEffect, useState } from 'react';

import CreatableSelect from 'react-select/creatable';
import axios from 'axios';

const TagSelect = props => {
  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    await axios.get('http://localhost:5000/api/tags').then(res => {
      let tagsData = res.data.data;
      tagsData = tagsData.map(c => ({
        label: c.name,
        value: c.name,
      }));
      setTags(tagsData);
    });
  };
  const [tags, setTags] = useState();

  const handleChange = newValue => {
    props.selectTags(newValue);
    console.log();
  };
  console.log(props.value);
  return (
    <CreatableSelect
      placeholder={'Select or enter tags'}
      isMulti
      onChange={handleChange}
      options={tags}
      value={props.value}
    />
  );
};
export default TagSelect;
