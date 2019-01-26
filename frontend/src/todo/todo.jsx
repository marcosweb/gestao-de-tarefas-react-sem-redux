import React, { Component } from 'react'
import Axios from 'axios'

import PageHeader from '../template/pageHeader'
import TodoForm from './todoForm'
import TodoList from './todoList'

const url = 'http://localhost:3003/api/todo'

export default class Todo extends Component {

  constructor(props) {
    super(props)
    this.state = { description: '', list: [], search: false }
    this.taskAdd = this.taskAdd.bind(this)
    this.taskChange = this.taskChange.bind(this)
    this.taskDelete = this.taskDelete.bind(this)
    this.taskDone = this.taskDone.bind(this)
    this.taskPending = this.taskPending.bind(this)
    this.setTaskDone = this.setTaskDone.bind(this)
    this.taskSearch = this.taskSearch.bind(this)
    this.taskClearSearch = this.taskClearSearch.bind(this)
    this.getTasks()
  }

  taskAdd() {
    const description = this.state.description
    Axios.post(url, { description }).then(resp => this.getTasks())
  }

  taskChange(e) {
    this.setState({ description: e.target.value })
  }

  getTasks(description = '') {
    const search = description ? `&description__regex=/${description}/` : ''
    Axios.get(`${url}?sort=-createdAt${search}`).then(resp => {
      this.setState({ list: resp, description })
    })
  }

  taskDelete(todo) {
    Axios.delete(`${url}/${todo._id}`).then(() => this.getTasks(this.state.description))
  }

  taskDone(todo) {
    this.setTaskDone(todo, true)
  }

  taskPending(todo) {
    this.setTaskDone(todo, false)
  }

  setTaskDone(todo, type) {
    console.log('done')
    Axios.put(`${url}/${todo._id}`, { done: type }).then(() => this.getTasks(this.state.description))
  }

  taskSearch(e) {
    this.setState({ search: true })
    this.getTasks(this.state.description)
  }

  taskClearSearch() {
    this.setState({ search: false })
    this.getTasks()
  }

  render() {
    return (
      <div>
        <PageHeader name='Tarefas' small='Cadastro'></PageHeader>

        <TodoForm
          taskAdd={this.taskAdd}
          taskChange={this.taskChange}
          taskSearch={this.taskSearch}
          taskClearSearch={this.taskClearSearch}
          description={this.state.description}
          search={this.state.search}
        />

        <TodoList
          list={this.state.list}
          taskDelete={this.taskDelete}
          taskDone={this.taskDone}
          taskPending={this.taskPending}
        />

      </div>
    )
  }
}
