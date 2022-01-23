import React, { useState, useRef, useEffect } from 'react';
import TodoList from './Todolist'
import { uuid } from 'uuidv4';
import './App.css'

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos]
    let todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuid(), name: name, complete: false}]
    })
    todoNameRef.current.value = null
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  function handletest(e){
    if(e.charCode===13){
      handleAddTodo()
    }
  }

  return (
    <>
      <div>
        <h2>TODO APP  📝</h2>
      </div>
      <input className='inputx' onKeyPress={handletest} ref={todoNameRef} type="text" />
      <button className='btn' onClick={handleAddTodo}>Add ➕</button>
      <button className='btn' onClick={handleClearTodos}>Delete ➖</button>
      <div className='field'>{todos.filter(todo => !todo.complete).length} item's left ✅</div> 
      <TodoList todos={todos} toggleTodo={toggleTodo} />
    </>
  )
}

export default App;