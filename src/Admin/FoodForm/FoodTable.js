import React, { useState } from 'react';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { IoIosCloseCircle } from 'react-icons/io';
import { useToggle } from '../../hooks/useToggle';

const yes = { height: '2em', width: '2em', color: '#45c640' };
const no = { height: '2em', width: '2em', color: '#f20a42' };

const FoodTable = props => {
  const headers = [
    'Name',
    ,
    'Edible',
    'Dog Food',
    'Description',
    'Category',
    'Tags',
  ];
  const sortFood = e => {
    const header = e.target.innerText
      .match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g,
      )
      .map(x => x.toLowerCase())
      .join('_');

    setSortValue(header);
    setSelected();
  };

  const asc = (a, b) => (a[sortValue] > b[sortValue] ? 1 : -1);
  const desc = (a, b) => (a[sortValue] < b[sortValue] ? 1 : -1);

  const [sortValue, setSortValue] = useState('name');
  const [selected, setSelected] = useToggle(true);

  return (
    <table className="table">
      <thead>
        <tr>
          {headers.map(h => (
            <th onClick={e => sortFood(e)}>{h}</th>
          ))}

          {/* <th>Tags</th> */}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.foods.length > 0 ? (
          props.foods.sort(selected ? asc : desc).map((food, i) => (
            <tr key={i}>
              <td>{food.name}</td>
              <td>
                {food.edible ? (
                  <IoIosCheckmarkCircle style={yes} />
                ) : (
                  <IoIosCloseCircle style={no} />
                )}
              </td>
              <td>
                {food.dog_food ? (
                  <IoIosCheckmarkCircle style={yes} />
                ) : (
                  <IoIosCloseCircle style={no} />
                )}
              </td>
              <td>{food.description}</td>
              <td>{food.category !== undefined ? food.category : null}</td>
              <td>{food.tags.join(', ')}</td>

              <td>
                <button
                  onClick={() => {
                    props.editRow(food);
                  }}
                >
                  Edit
                </button>
                <button onClick={() => props.deleteFood(food._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={3}>No foods</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default FoodTable;
