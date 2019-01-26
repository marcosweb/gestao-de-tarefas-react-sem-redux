import React from 'react'
import IconButton from '../template/iconButton'

export default props => {
    
  const tableRows = () => {
    const list = props.list && props.list.data || []
    return list.map(todo => (
      <tr key={todo._id}>
        <td className={todo.done ? 'task-marked' : ''}>{todo.description}</td>
        <td className="table-actions">

          <IconButton
            style="success"
            icon="check"
            onClick={() => props.taskDone(todo)}
            hide={todo.done}>
          </IconButton>

          <IconButton
            style="warning"
            icon="undo"
            onClick={() => props.taskPending(todo)}
            hide={!todo.done}>
            
          </IconButton>

          <IconButton
            style="danger"
            icon="trash-o"
            onClick={() => props.taskDelete(todo)}
            hide={!todo.done}>
          </IconButton>

        </td>
      </tr>
    ))
  }

  return (
    <div className="container">
      <table className="table">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {tableRows()}
        </tbody>
      </table>
    </div>
  )
}