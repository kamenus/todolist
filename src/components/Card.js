import React from 'react';

export default ({
  text,
  isCompleted,
  date,
  isOnChange,
  isVisible,
  id,
  toggleTodo,
  todoStatusOnChange,
  changeHandler,
  changeValue,
  todoChanger,
}) => {
  if (isVisible) {
    return(
      <div className="todoItem">
        <span 
          className='todoItemText'
          style={{
            textDecoration: 
              isCompleted ?
                'line-through' :
                'none' 
          }}
          onClick={toggleTodo(id)}
        >
          {text}
        </span>
        <p
          style={{
            display:
              isCompleted ?
                'none' :
                ''
          }}
        >
          {date} {'  '}Число несуществующего месяца){'  '}
          <button
            onClick={todoStatusOnChange(id)}
          >
              Change
          </button>
        </p>
        
        <div
          className="cardChangeField"
          style={{
            display: 
              isOnChange ?
                '':
                'none'
          }}
        >
          <input
            onChange={changeHandler}
            value={changeValue}
          />
          <button
            disabled={!changeValue.replace(/ /g,'')}      
            onClick={todoChanger(id)}
          >
            Approve
          </button>
        </div>
      </div>
    )
  } else return null
}