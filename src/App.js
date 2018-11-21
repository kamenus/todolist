import React, { Component } from 'react';
import './App.css';

import Input from './components/Input';
import Card from './components/Card';
import moment from '../node_modules/moment/moment' ;
import Search from './components/Search'
import Filter from './components/Filter'

class App extends Component {
  state = {
    todos: [],
    inputValue: '',
    changeValue: '',
    searchValue: '',
    isDateFilter: false,
  }

  inputHandler = ({ target: {value: inputValue} }) => 
    this.setState({ inputValue })

  changeHandler = ({ target: {value: changeValue} }) => 
    this.setState({ changeValue })

  searchHandler = ({ target: {value: searchValue} }) => 
    this.setState({ searchValue })

  addTodoCard = () => {
    const { todos, inputValue } = this.state;
    let now = moment();

    todos.push({
      text: inputValue,
      isCompleted: false,
      isOnChange: false,
      date: now,
      isVisible: true,
    });

    this.setState({todos, inputValue: ''});
  }

  toggleTodo = id => () => {
    const { todos } = this.state;
    todos[id].isCompleted = !todos[id].isCompleted; 
    this.setState({ todos });
  }
  
  todoStatusOnChange = id => () => {
    const { todos } = this.state;
    todos[id].isOnChange = !todos[id].isOnChange;
    this.setState({todos: todos})
  }

  todoChanger = id => () => {
    const { todos, changeValue } = this.state;
    todos[id].text = changeValue;
    
    todos[id].isOnChange = !todos[id].isOnChange;
    this.setState({todos: todos, changeValue: ''})
  }

  resetFilter = () => {
    const { todos } = this.state;
    todos.forEach( todo => 
      todo.isVisible = true
    );
    this.setState({ todos: todos })
  }

  completedFilter = () => {
    const { todos } = this.state;
    todos.forEach( todo => 
      todo.isCompleted ?
        todo.isVisible = true :
        todo.isVisible = false );
    this.setState({ todos: todos });
  }

  cardSeeker = () => {
    const { todos, searchValue } = this.state;
    todos.forEach( todo => 
      todo.text.includes(searchValue) ?
        todo.isVisible = true :
        todo.isVisible = false 
    );
    this.setState({ todos: todos, searchValue: '' })
  }

  render() {
    const { todos, inputValue, searchValue, changeValue } = this.state;
    
    return (
      <div className="app">
        <div className="appHeader">
          <Input 
            inputHandler={this.inputHandler}
            addTodoCard={this.addTodoCard}
            inputValue={inputValue}
          />
          <Search 
            searchValue={searchValue}
            searchHandler={this.searchHandler}
            cardSeeker={this.cardSeeker}
          />
          <Filter 
            resetFilter={this.resetFilter}
            completedFilter={this.completedFilter}
          />
        </div>  
        <div className="todoList">
          {todos.map( (card, cardId) => 
                <Card  
                  toggleTodo={this.toggleTodo} 
                  id={cardId}
                  {...card}
                  todoStatusOnChange={this.todoStatusOnChange}
                  changeValue={changeValue}
                  changeHandler={this.changeHandler}
                  todoChanger={this.todoChanger}
                />
                // Почему необходимо вернуть нулл?
              )}
        </div>
      </div>
    );
  }
}

export default App;
