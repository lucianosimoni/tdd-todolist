const { TodoList } = require('../src/todolist')

describe('Test of TodoList class', () => {
  let todoList
  beforeEach(() => {
    todoList = new TodoList()
  })

  // newTodo
  it('expects newTodo to return nothing if empty value is given to it', () => {
    todoList.newTodo('')
    todoList.newTodo(null)
    expect(todoList.todos).toHaveSize(0)
  })
  it('expects newId of newTodo() to always be new', () => {
    todoList.newTodo('first todo')
    todoList.newTodo('second todo')
    const secondTodo = todoList.todos[1]
    expect(secondTodo.id).toBe(2)
  })
  it('expects newTodo to push to this.todos', () => {
    todoList.newTodo('do something')
    todoList.newTodo('do second something')
    expect(todoList.todos).toHaveSize(2)
  })

  // getAllTodos
  it('expects the array with all todos inside', () => {
    todoList.newTodo('do something')
    todoList.newTodo('do second something')
    expect(todoList.getAllTodos()).toHaveSize(2)
  })

  // getIncompleteTodos
  it('expects to receive list of incompleted todos', () => {
    todoList.newTodo('jump')
    todoList.updateTodo(1, true)
    todoList.newTodo('jump')
    todoList.updateTodo(2, true)
    todoList.newTodo('travel')
    expect(todoList.getIncompleteTodos()).toEqual([
      { id: 3, text: 'travel', checked: false }
    ])
  })
  it('expects incompleteList returned to be empty if no todos stored', () => {
    expect(todoList.getIncompleteTodos()).toHaveSize(0)
  })

  // getCompleteTodos
  it('expects to receive list of completed todos', () => {
    todoList.newTodo('dream')
    todoList.updateTodo(1, true)
    todoList.newTodo('jump')
    todoList.newTodo('travel')
    expect(todoList.getCompleteTodos()).toEqual([
      { id: 1, text: 'dream', checked: true }
    ])
  })
  it('expects completeList returned to be empty if no todos stored', () => {
    expect(todoList.getCompleteTodos()).toHaveSize(0)
  })

  // updateTodo
  it('expects the updateTodo to return false if id does not exist', () => {
    expect(todoList.updateTodo(1, true)).toBeFalse()
  })
  it('expects false if checked is not of type bool', () => {
    todoList.newTodo('do something')
    expect(todoList.updateTodo(1, 1234)).toBeFalse()
  })

  // searchById
  it('expects a todo item to be returned when its id is passed', () => {
    todoList.newTodo('do something')
    todoList.newTodo('do something')
    expect(todoList.searchById(2)).toEqual({
      id: 2,
      text: 'do something',
      checked: false
    })
    expect(todoList.searchById(3)).toBeFalse()
  })
  it('expects return of false when called with an id that does not exist')

  // removeTodo
  it('expects the removeTodo to return false if id does not exist', () => {
    expect(todoList.removeTodo(1)).toBeFalse()
  })
  it('expects the return of removeTodo to have length of 0 due to the removal by id', () => {
    todoList.newTodo('do something')
    expect(todoList.removeTodo(1)).toHaveSize(0)
  })
})
