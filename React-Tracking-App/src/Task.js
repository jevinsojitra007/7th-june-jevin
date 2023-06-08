import React, { useState, createContext, useContext, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Create a context to store the project and task data
const AppContext = createContext();

// Custom hook to access the app context
const useAppContext = () => useContext(AppContext);

const Task = () => {
  // State to store the projects and tasks
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  // Load data from local storage on initial render
  useEffect(() => {
    const storedProjects = localStorage.getItem('projects');
    if (storedProjects) {
      setProjects(JSON.parse(storedProjects));
    }

    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Update local storage when projects or tasks change
  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Function to create a new project
  const createProject = (name) => {
    const newProject = {
      id: new Date().getTime().toString(),
      name: name,
    };

    setProjects([...projects, newProject]);
  };

  // Function to create a new task
  const createTask = (projectId, name, timeSpent, description) => {
    const newTask = {
      id: new Date().getTime().toString(),
      projectId: projectId,
      name: name,
      timeSpent: timeSpent,
      description: description,
    };

    setTasks([...tasks, newTask]);
  };

  // Calculate the total hours spent on a daily basis
  const calculateDailyTotal = () => {
    const today = new Date().toLocaleDateString();
    const filteredTasks = tasks.filter(
      (task) => new Date(task.date).toLocaleDateString() === today
    );
    let total = 0;
    filteredTasks.forEach((task) => {
      total += parseFloat(task.timeSpent);
    });
    return total;
  };

  return (
    <AppContext.Provider
      value={{ projects, tasks, createProject, createTask, calculateDailyTotal }}
    >
      <div className="container">
        <h1 className='text-center'>Tracking Application</h1> <hr/>
        <div className="row">
          <div className="col-md-6">
            <ProjectForm />
            <ProjectList />
          </div>
          <div className="col-md-6">
            <TaskForm />
            <TaskList />
          </div>
        </div>
      </div>
    </AppContext.Provider>
  );
};

const ProjectForm = () => {
  const { createProject } = useAppContext();
  const [projectName, setProjectName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (projectName) {
      createProject(projectName);
      setProjectName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h2>Create Project</h2>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </div>
    </form>
  );
};

const TaskForm = () => {
  const { projects, createTask } = useAppContext();
  const [projectId, setProjectId] = useState('');
  const [taskName, setTaskName] = useState('');
  const [timeSpent, setTimeSpent] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (projectId && taskName && timeSpent && description) {
      createTask(projectId, taskName, timeSpent, description);
      setProjectId('');
      setTaskName('');
      setTimeSpent('');
      setDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h2>Create Task</h2>
      <div className="input-group">
        <select
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
          className="form-select"
        >
          <option value="">Select Project</option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          className="form-control"
          placeholder="Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <input
          type="number"
          className="form-control"
          placeholder="Time Spent (hours)"
          value={timeSpent}
          onChange={(e) => setTimeSpent(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </div>
    </form>
  );
};

const ProjectList = () => {
  const { projects } = useAppContext();

  return (
    <div>
      <h2>Projects</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Project Name</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>{project.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const TaskList = () => {
  const { tasks } = useAppContext();
  var totalTime = 0;
  tasks.forEach(x => totalTime += parseFloat(x.timeSpent));
  return (
    <div>
      <h2>Tasks</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Time Spent (hours)</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.name}</td>
              <td>{task.timeSpent}</td>
              <td>{task.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
      <h2>Daily Total</h2>
      <p>Total Hours: {totalTime}</p>
    </div>
    </div>
    
  );
};

export default Task;
