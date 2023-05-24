import {
    addDataTarget,
    changePage,
    createModalForEachStaff,
    exportDataStaff,
    renderListPage,
    renderViewStaff,
} from "./controller/staffController.js";
import {
    createModalForTask,
    getTaskInfo,
    renderTaskTable,
    showTaskInfo,
} from "./controller/taskController.js";
import {
    exportDataVehicle,
    renderViewVehicle,
} from "./controller/vehicleController.js";
import { staffData } from "./Data/StaffData.js";
import { vehicleData } from "./Data/VehicleData.js";
// import { Staff } from "./model/StaffModel.js";

const TASK = [];

var navLinks = document.querySelectorAll(".navlink");
var navContent = document.querySelectorAll(".nav-content");

navLinks.forEach((el) => {
    el.addEventListener("click", openNav);
});
function showNotify() {
    if (document.getElementById("noti").style.display == "none") {
        document.getElementById("noti").style.display = "block";
    } else {
        document.getElementById("noti").style.display = "none";
    }
}
window.showNotify = showNotify;

// menu
const allMenu = document.querySelectorAll("main .content-data .head .menu");
allMenu.forEach((item) => {
    const icon = item.querySelector(".icon");
    const menuLink = item.querySelector(".menu-link");
    icon.addEventListener("click", function () {
        menuLink.classList.toggle("show");
    });
});

window.addEventListener("click", function (e) {
    allMenu.forEach((item) => {
        const icon = item.querySelector(".icon");
        const menuLink = item.querySelector(".menu-link");
        if (e.target !== icon) {
            if (e.target !== menuLink) {
                if (menuLink.classList.contains("show")) {
                    menuLink.classList.remove("show");
                }
            }
        }
    });
});

// navlink
function openNav(el) {
    var btn = el.currentTarget; // lắng nghe sự kiện và hiển thị các element
    var content = btn.dataset.content; // lấy giá trị trong data-electronic
    navContent.forEach(function (el) {
        el.classList.remove("active");
    });

    navLinks.forEach(function (el) {
        el.classList.remove("active");
    });

    document.querySelector("#" + content).classList.add("active");

    btn.classList.add("active");
}

// calendar
let calendar;
initCalendar();
function initCalendar() {
    var calendarEl = document.getElementById("calendar");

    calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: "dayGridMonth",
        initialDate: "2022-12-07",
        headerToolbar: {
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
        },
        events: [],
    });
    calendar.render();
}

// test

createModalForTask("add");

let addTask = () => {
    let newTask = getTaskInfo();

    TASK.push(newTask);
    renderTaskTable(TASK);

    calendar.addEvent({
        title: newTask.title,
        start: newTask.startDate,
        end: newTask.endDate,
    });
    document.getElementById("task-form").reset();
};
window.addTask = addTask;

let deleteTask = (index) => {
    TASK.splice(index, 1);
    renderTaskTable(TASK);
};
let changeTask = (index) => {
    createModalForTask("change");
    showTaskInfo(TASK[index]);
    document.getElementById("taskID").disabled = true;
};
let saveChanges = () => {
    let editedTask = getTaskInfo();
    let index = TASK.findIndex(function (task) {
        return task.id == editedTask.id;
    });

    TASK[index] = editedTask;
    renderTaskTable(TASK);
    document.getElementById("taskID").disabled = false;
    createModalForTask("add");
};
window.saveChanges = saveChanges;

window.deleteTask = deleteTask;
window.changeTask = changeTask;

export const STAFF = exportDataStaff(staffData);
export const VEHICLE = exportDataVehicle(vehicleData);
renderViewStaff(STAFF);
renderViewVehicle(VEHICLE);

export const list = document.getElementsByClassName("modal-btn");

addDataTarget(list, STAFF);

createModalForEachStaff(STAFF);
export const totalPages = Math.ceil(STAFF.length / 12);
console.log("totalPages: ", totalPages);

renderListPage(totalPages);

changePage();
