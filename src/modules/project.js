export function createProject(name) {
    return {
        id: crypto.randomUUID(),
        name,
        todos: []
    };
}

export function addTodoToProject(project, todo) {
    project.todos.push(todo);
}

export function removeTodoFromProject(project, todoID) {
    project.todos = project.todos.filter(todo => todoID != todo.id);
}