import { getState, addProject, setActiveProject, addTodo, deleteTodo } from "./app";

const appContainer = document.getElementById("app");

export function renderApp() {
  appContainer.innerHTML = "";

  const header = createHeader();
  const layout = createLayout();

  appContainer.appendChild(header);
  appContainer.appendChild(layout);

  renderProjects();
  renderTodos();
}

function createHeader() {
  const header = document.createElement("header");
  header.textContent = "Todo List";
  header.classList.add("header");
  return header;
}

function createLayout() {
  const container = document.createElement("div");
  container.classList.add("container");

  const sidebar = document.createElement("div");
  sidebar.classList.add("sidebar");
  sidebar.id = "sidebar";

  const main = document.createElement("div");
  main.classList.add("main");
  main.id = "main";

  container.appendChild(sidebar);
  container.appendChild(main);

  return container;
}

function renderProjects() {
  const sidebar = document.getElementById("sidebar");
  sidebar.innerHTML = "";

  const state = getState();

  const title = document.createElement("h3");
  title.textContent = "Projects";
  sidebar.appendChild(title);

  state.projects.forEach(project => {
    const projectBtn = document.createElement("button");
    projectBtn.textContent = project.name;

    if (project.id === state.activeProjectId) {
  projectBtn.style.background = "#ddd";
}


    projectBtn.onclick = () => {
      setActiveProject(project.id);
      renderTodos();
    };

    sidebar.appendChild(projectBtn);
  });

  const addBtn = document.createElement("button");
  addBtn.textContent = "+ Add Project";

  addBtn.onclick = () => {
    const name = prompt("Project name:");
    if (name) {
      addProject(name);
      renderApp();
    }
  };

  sidebar.appendChild(addBtn);
}

function renderTodos() {
  const main = document.getElementById("main");
  main.innerHTML = "";

  const state = getState();
  const project = state.projects.find(p => p.id === state.activeProjectId);
  if (!project) return;

  const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;

    checkbox.onchange = () => {
    todo.completed = checkbox.checked;
    renderTodos();
    };


  const title = document.createElement("h2");
  title.textContent = project.name;
  main.appendChild(title);

  const addBtn = document.createElement("button");
  addBtn.textContent = "+ Add Todo";
  addBtn.onclick = showTodoForm;
  main.appendChild(addBtn);

  project.todos.forEach(todo => {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const todoTitle = document.createElement("span");
    todoTitle.textContent = `${todo.title} (${todo.dueDate})`;

    const expandBtn = document.createElement("button");
    expandBtn.textContent = "View";

    expandBtn.onclick = () => showTodoDetails(todo);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => {
      deleteTodo(todo.id);
      renderTodos();
    };

    todoDiv.append(todoTitle, expandBtn, deleteBtn);
    main.appendChild(todoDiv);
  });
}

function showTodoForm() {
  const main = document.getElementById("main");

  const form = document.createElement("div");
  form.classList.add("todo-form");

  form.innerHTML = `
    <h3>New Todo</h3>
    <input placeholder="Title" id="todo-title"/>
    <input placeholder="Description" id="todo-desc"/>
    <input type="date" id="todo-date"/>
    <select id="todo-priority">
      <option value="Low">Low</option>
      <option value="Medium">Medium</option>
      <option value="High">High</option>
    </select>
    <button id="save-todo">Save</button>
  `;

  main.prepend(form);

  document.getElementById("save-todo").onclick = () => {
    const title = document.getElementById("todo-title").value;
    const desc = document.getElementById("todo-desc").value;
    const date = document.getElementById("todo-date").value;
    const priority = document.getElementById("todo-priority").value;

    if (!title || !date) {
        alert("Please provide both title and due date.");
        return;
    }

    addTodo(title, desc, date, priority);
    renderTodos();
  };
}

function showTodoDetails(todo) {
  const modal = document.createElement("div");
  modal.classList.add("modal");

  modal.innerHTML = `
    <div class="modal-content">
      <h3>${todo.title}</h3>
      <p><strong>Description:</strong> ${todo.description || "None"}</p>
      <p><strong>Due Date:</strong> ${todo.dueDate}</p>
      <p><strong>Priority:</strong> ${todo.priority}</p>
      <button id="close-modal">Close</button>
    </div>
  `;

  document.body.appendChild(modal);

  document.getElementById("close-modal").onclick = () => {
    modal.remove();
  };
}
