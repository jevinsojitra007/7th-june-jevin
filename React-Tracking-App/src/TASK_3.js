import React, { useState } from "react";

const TASK_3 = () => {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState("");
    const [tasks, setTasks] = useState([]);
    const [taskName, setTaskName] = useState("");
    const [timeSpent, setTimeSpent] = useState("");
    const [description, setDescription] = useState("");

    const createProject = () => {
        if (selectedProject.trim() !== "") {
            setProjects([...projects, selectedProject]);
            setSelectedProject("");
        }
    };

    const createTask = () => {
        if (taskName.trim() !== "" && timeSpent !== "" && description.trim() !== "") {
            const task = {
                name: taskName,
                time: parseFloat(timeSpent),
                description: description,
            };
            setTasks([...tasks, task]);
            setTaskName("");
            setTimeSpent("");
            setDescription("");
        }
    };

    const calculateTotalHours = () => {
        let total = 0;
        tasks.forEach((task) => {
            total += task.time;
        });
        return total;
    };

    return (
        <div>
            <h2>Create a Project</h2>
            <input
                type="text"
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                placeholder="Project Name"
            />
            <button className="btn btn-outline-success border" onClick={createProject}>Create Project</button>

            <h2>Create a Task</h2>
            <input
                type="text"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                placeholder="Task Name"
            />
            <input
                type="number"
                value={timeSpent}
                onChange={(e) => setTimeSpent(e.target.value)}
                placeholder="Time Spent (hours)"
            />
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
            />
            <button className="btn btn-outline-primary border" onClick={createTask}>Create Task</button>

            <h2>Projects</h2>
            <ul>
                {projects.map((project, index) => (
                    <li key={index}>{project}</li>
                ))}
            </ul>

            <h2>Tasks</h2>
            <ul>
                {tasks.map((task, index) => (
                    <li key={index}>
                        {task.name} - {task.time} hours - {task.description}
                    </li>
                ))}
            </ul>

            <h2>Total Hours for the Day</h2>
            <p>{calculateTotalHours()} hours</p>
        </div>
    );
};

export default TASK_3;