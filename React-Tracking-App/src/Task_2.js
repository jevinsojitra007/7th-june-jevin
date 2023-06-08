import React, { useState, createContext, useContext, useEffect } from 'react';

// Create a context to store the project and task data
const AppContext = createContext();

// Custom hook to access the app context
const useAppContext = () => useContext(AppContext);

const Task_2 = () => {
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
      <div>
        <h1>Tracking Application</h1>
        <ProjectForm />
        <TaskForm />
        <ProjectList />
        <TaskList />
        <DailyTotal />
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
    <form onSubmit={handleSubmit}>
      <h2>Create Project</h2>
      <input
        type="text"
        placeholder="Project Name"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
      />
      <button type="submit">Create</button>
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
    <form onSubmit={handleSubmit}>
      <h2>Create Task</h2>
      <select
        value={projectId}
        onChange={(e) => setProjectId(e.target.value)}
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
        placeholder="Task Name"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Time Spent (hours)"
        value={timeSpent}
        onChange={(e) => setTimeSpent(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Create</button>
    </form>
  );
};

const ProjectList = () => {
  const { projects } = useAppContext();

  return (
    <div>
      <h2>Projects</h2>
      <ul>
        {projects.map((project) => (
          <div key={project.id}>{project.name}</div>
        ))}
      </ul>
    </div>
  );
};

const TaskList = () => {
  const { tasks } = useAppContext();

  return (
    <div>
      <h2>Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <div key={task.id}>
            <strong>{task.name}</strong> - {task.timeSpent} hours -{' '}
            {task.description}
          </div>
        ))}
      </ul>
    </div>
  );
};

const DailyTotal = () => {
  const { calculateDailyTotal } = useAppContext();

  return (
    <div>
      <h2>Daily Total</h2>
      <p>Total Hours: {calculateDailyTotal()}</p>
    </div>
  );
};

export default Task_2;
