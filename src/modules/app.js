import { createProject } from "./project";
import { saveAppState, loadAppState } from "./storage";
import { createTodo } from "./todo";

let state = {
    projects: [],
    activeProjectID: null
};

export function initApp() {
    const saved = loadAppState();
    
    if (saved) {
        state = saved;
    } else {
        const defaultProject = createProject("Default");
        state.projects.push(defaultProject);
        state.activeProjectID = defaultProject.id;
        saveAppState(state);
    }
}

export function getState() {
    return state;
}

export function addProject(name) {
    if (!name || name.trim() === "") return alert("Project name required");

    const project = createProject(name);
    state.projects.push(project);
    saveAppState(state);
}

export function setActiveProject(projectID) {
    state.activeProjectID = projectID;
    saveAppState(state);
}

export function addTodo(title, description, dueDate, priority) {
    const todo = createTodo(title, description, dueDate, priority);
    const project = state.projects.find(p => p.id === state.activeProjectID);
    project.todos.push(todo);
    saveAppState();
}

export function deleteTodo(todoID) {
    const project = state.projects.find(p => p.id === state.activeProjectID);
    project.todos = project.todos.filter(todos => todo.id !== todoID);
    saveAppState();
}

export function updateState() {
  saveAppState(state);
}
