import { createProject } from "./project";
import { saveAppState, loadAppState } from "./storage";

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
    const project = createProject(name);
    state.projects.push(project);
    saveAppState(state);
}

export function setActiveProject(projectID) {
    state.activeProjectID = projectID;
    saveAppState(state);
}