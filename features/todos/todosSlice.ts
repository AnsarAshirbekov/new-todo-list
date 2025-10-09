import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface Todo {
    id: string,
    title: string,
    completed: boolean
}

export interface TodosState {
    todos: Todo[]
}

const initialState: TodosState = {
    todos: [],
}

export const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<{ id: string, title: string }>) => {
            const newTodo: Todo = {
                id: action.payload.id,
                title: action.payload.title,
                completed: false
            }
            state.todos.push(newTodo)
        },
        deleteTodo: (state, action) => {
            state.todos = state.todos.filter(el => el.id !== action.payload);
        },
    },
})

export const { addTodo, deleteTodo } = todosSlice.actions

export default todosSlice.reducer