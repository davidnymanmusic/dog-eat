import React from 'react';

const CategoryTable = props => (
  <table className="table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {props.categories.length > 0 ? (
        props.categories.map(category => (
          <tr key={category.id}>
            <td>{category.name}</td>

            <td>
              <button
                onClick={() => {
                  props.editRow(category);
                }}
              >
                Edit
              </button>
              <button
                onClick={() => {
                  props.deleteCategory(category._id);
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={3}>No categories</td>
        </tr>
      )}
    </tbody>
  </table>
);

export default CategoryTable;
