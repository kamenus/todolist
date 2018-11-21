import React from 'react';

export default ({
  inputHandler, 
  addTodoCard, 
  inputValue
}) => (
  <div className="inputForm">
    <input 
      onChange={inputHandler}
      value={inputValue}
      placeholder="Enter todo text..."
    />
    <button 
      onClick={addTodoCard}
      disabled={!inputValue.replace(/ /g,'')}
    >
      Add
    </button>
  </div>
);
