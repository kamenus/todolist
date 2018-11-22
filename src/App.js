import React, { Component } from 'react';
import './App.css';

import Input from './components/Input';
import Card from './components/Card';
import Search from './components/Search';
import Filter from './components/Filter';
import DateFilter from './components/DateFilter';


class App extends Component {
  state = {
    todos: [],
    inputValue: '',
    changeValue: '',
    searchValue: '',
    minDateValue: '',
    maxDateValue: '',
    isDateFilter: false,
    isSearchOn: false,
    isCompletedFilter: false,
  }

  minDateHandler = ({ target: {value: minDateValue} }) => 
    this.setState({ minDateValue })
   
  maxDateHandler = ({ target: {value: maxDateValue} }) => 
    this.setState({ maxDateValue })  

  inputHandler = ({ target: {value: inputValue} }) => 
    this.setState({ inputValue })

  changeHandler = ({ target: {value: changeValue} }) => 
    this.setState({ changeValue })

  searchHandler = ({ target: {value: searchValue} }) => 
    this.setState({ searchValue })

  compareNumeric = (a, b) => {
      if (a.date < b.date) return 1;
      if (a.date > b.date) return -1;
    }
    
  addTodoCard = () => {
    const { 
      todos,
      inputValue, 
      isDateFilter, 
      isSearchOn,
      isCompletedFilter 
    } = this.state;
    // let now = moment();

    todos.push({
      text: inputValue,
      isCompleted: false,
      isOnChange: false,
      date: Math.floor(Math.random()*100) + 1,
      isVisible: !isDateFilter&&!isSearchOn&&!isCompletedFilter,
      isActive: true, 
    });

    todos.sort(this.compareNumeric);

    this.setState({todos, inputValue: ''});
    this.resetFilter();
  }

  toggleTodo = id => () => {
    const { todos } = this.state;
    todos[id].isCompleted = !todos[id].isCompleted; 
    todos[id].isOnChange = false;
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
    this.setState({ 
      todos: todos,
      isCompletedFilter: false,
      isDateFilter: false,
      isSearchOn: false,
    })
  }

  completedFilter = () => {
    const { todos } = this.state;
    todos.forEach( todo => 
      todo.isCompleted&&todo.isVisible ?
        todo.isVisible = true :
        todo.isVisible = false );
    this.setState({ todos: todos, isCompletedFilter: true });
  }

  cardSeeker = () => {
    const { todos, searchValue, isSearchOn } = this.state;
    todos.forEach( todo => 
      todo.text.includes(searchValue) ?
        todo.isVisible = true :
        todo.isVisible = false 
    );
    this.setState({ todos: todos, searchValue: '', isSearchOn: !isSearchOn })
  }

  dateCardsFilter = () => {
    const { todos, minDateValue, maxDateValue } = this.state;

    let min = parseInt(minDateValue);
    let max = parseInt(maxDateValue);
    todos.forEach( todo => {
      let num = parseInt(todo.date);
        (min <= num) && (num <= max) ?
        todo.isVisible = true:
        todo.isVisible = false 
    });
    this.setState({ todos: todos, minDateValue: '', maxDateValue: ''})
  }

  statusFixer = () => {
    const { todos, isCompletedFilter, isDateFilter, isSearchOn } = this.state;

    todos.forEach( todo => {
      (isCompletedFilter&&todo.isCompleted || todo.isVisible&&(isSearchOn || isDateFilter)) ?
        todo.isActive = true :
        todo.isActive = false
    })
    this.setState({ todos: todos })
  }

  render() {
    const { 
      todos,
      inputValue, 
      searchValue, 
      changeValue,
      minDateValue,
      maxDateValue 
    } = this.state;
    
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
          <DateFilter 
            minDateValue={minDateValue}
            maxDateValue={maxDateValue}
            minDateHandler={this.minDateHandler}
            maxDateHandler={this.maxDateHandler}
            dateCardsFilter={this.dateCardsFilter}
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
          )}
        </div>
      </div>
    );
  }
}

export default App;
