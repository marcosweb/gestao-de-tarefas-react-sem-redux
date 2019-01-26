import React from 'react'
import Grid from '../template/grid'
import IconButton from '../template/iconButton'

export default props => {

  const keyHandler = e => {
    if (e.key === 'Enter') {
      e.shiftKey ? props.taskSearch() : props.taskAdd()
    } else if (e.key === 'Escape') {
      props.taskClearSearch()
    }
  }

  return (

    <div role="form" className="todo-form">
  
      <Grid cols="12 9 10">
        <input
          id="description"
          className="form-control"
          placeholder="Adicione uma tarefa"
          value={props.description}
          onChange={props.taskChange}
          onKeyUp={keyHandler}
        />
      </Grid>
  
      <Grid cols="12 3 2">
        <IconButton style="primary" icon="plus" onClick={props.taskAdd}></IconButton>
        <IconButton style="info" icon="search" onClick={props.taskSearch} hide={props.search}></IconButton>
        <IconButton style="default" icon="close" onClick={props.taskClearSearch} hide={!props.search}></IconButton>
      </Grid>
  
    </div>
  )
}
