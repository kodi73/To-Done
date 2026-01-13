import { format } from "date-fns";

export function createTodo(title, description, dueDate, priority) {
    return {
        id: crypto.randomUUID(),
        title,
        description,
        dueDate,
        priority,
        completed: false
    };
}

export function toggleTodo(todo) {
    todo.completed = !todo.completed; 
}

export function getFormattedDate(todo) {
    return format(new Date(todo.dueDate), "dd MM yyyy");
}