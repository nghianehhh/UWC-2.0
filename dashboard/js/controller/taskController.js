import { Task } from "../model/TaskModel.js";

export let createModalForTask = (key) => {
    let content = "";

    content = `
            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Task Management</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="task-form">
                        <div class="form-group row">
                            <div class="col-6"><label for="taskTitle">Title:</label>
                                <input type="text" class="form-control" id="taskTitle" aria-describedby="taskTitle"
                                    placeholder="Enter title">
                            </div>
                            <div class="col-6"><label for="taskID">ID:</label>
                                <input type="number" class="form-control" id="taskID" placeholder="Enter ID">
                            </div>

                        </div>

                        <div class="form-group">
                            <label for="staffInput">Staff Group:</label>
                            <input type="text" class="form-control" id="staffInput" placeholder="">
                        </div>

                        <div class="form-group row">
                            <div class="col-6"><label for="startDate">Start Date:</label>
                                <input type="date" class="form-control" id="startDate" placeholder="Enter Date">
                            </div>
                            <div class="col-6"><label for="endDate">End Date:</label>
                                <input type="date" class="form-control" id="endDate" placeholder="Enter Date">
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  
                        ${
                            key == "add"
                                ? `<button onclick="addTask()" data-dismiss="modal" type="button" class="btn btn-primary">Add Task</button>`
                                : `<button onclick="saveChanges()" data-dismiss="modal" type="button" class="btn btn-primary">Save changes  </button>`
                        }
                </div>
            </div>
        </div>
    </div>

       `;

    document.getElementById("task-modal").innerHTML = content;
};
export let getTaskInfo = () => {
    let taskTitle = document.getElementById("taskTitle").value;
    let staffInput = document.getElementById("staffInput").value;
    let startDate = document.getElementById("startDate").value;
    let endDate = document.getElementById("endDate").value;
    let taskID = document.getElementById("taskID").value;
    let task = new Task(taskID, taskTitle, staffInput, startDate, endDate);
    return task;
};

export let showTaskInfo = (task) => {
    document.getElementById("taskTitle").value = task.title;
    document.getElementById("staffInput").value = task.staffInput;
    document.getElementById("startDate").value = task.start;
    document.getElementById("endDate").value = task.end;
    document.getElementById("taskID").value = task.id;
};

export let renderTaskTable = (TASK) => {
    let content = "";
    TASK.forEach((task, index) => {
        return (content += `
                <tr>
                    <td>${task.id}</td>
                    <td>${task.title}</td>
                    <td>${task.staffInput}</td>
                    <td>${task.startDate}</td>
                    <td>${task.endDate}</td>
                    <td>
                        <button onclick="deleteTask(${index})" class="btn btn-danger">Delete</button>
                        <button data-toggle="modal" data-target="#exampleModal" onclick="changeTask(${index})" class="btn btn-success">Change</button>
                    </td>
                </tr>
             `);
    });
    document.getElementById("tableBody").innerHTML = content;
};
