import React from 'react';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { IoIosCloseCircle } from 'react-icons/io';

const yes = { height: '2em', width: '2em', color: '#45c640' };
const no = { height: '2em', width: '2em', color: '#f20a42' };

const FoodTable = props => (
  <table className="table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Edible</th>
        <th>Dog Food</th>
        <th>Description</th>
        <th>Category</th>
        <th>Tags</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {props.foods.length > 0 ? (
        props.foods.map(food => (
          <tr key={food.id}>
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
              <button onClick={() => props.deleteFood(food.id)}>Delete</button>
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

export default FoodTable;
