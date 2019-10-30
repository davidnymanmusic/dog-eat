import React from 'react';

const TagTable = props => (
  <table className="table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {props.tags.length > 0 ? (
        props.tags.map(tag => (
          <tr key={tag.id}>
            <td>{tag.name}</td>

            <td>
              <button
                onClick={() => {
                  props.editRow(tag);
                }}
              >
                Edit
              </button>
              <button
                onClick={() => {
                  props.deleteTag(tag.id);
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={3}>No tags</td>
        </tr>
      )}
    </tbody>
  </table>
);

export default TagTable;
