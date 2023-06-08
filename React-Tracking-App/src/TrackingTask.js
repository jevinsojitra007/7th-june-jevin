import React, { useState, createContext, useContext } from 'react';

// Create a context to store the project and task data
const AppContext = createContext();

// Custom hook to access the app context
const useAppContext = () => useContext(AppContext);

const TrackingTask = () => {
  // State to store the projects and tasks
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);

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

  return (
    <AppContext.Provider value={{ projects, tasks, createProject, createTask }}>
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
      {projects.map((project) => (
        <div key={project.id}>{project.name}</div>
      ))}
    </div>
  );
};

const TaskList = () => {
  const { tasks } = useAppContext();

  return (
    <div>
      <h2>Tasks</h2>
      {tasks.map((task) => (
        <div key={task.id}>
          <strong>{task.name}</strong> - {task.timeSpent} hours
          <p>Description:- {task}</p>
        </div>
      ))}
    </div>
  );
};

const DailyTotal = () => {
  const { tasks } = useAppContext();

  const calculateTotalHours = () => {
    let total = 0;
    tasks.forEach((task) => {
      total += parseFloat(task.timeSpent);
    });
    return total;
  };

  return (
    <div>
      <h2>Daily Total</h2>
      <p>Total Hours: {calculateTotalHours()}</p>
    </div>
  );
};

export default TrackingTask;
