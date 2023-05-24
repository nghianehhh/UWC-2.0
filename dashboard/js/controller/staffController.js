import { list, STAFF, totalPages } from "../index.js";
import { Staff } from "../model/StaffModel.js";

let start = 0;
let perPage = 12;
let end = perPage;
let currentPage = 1;

export let renderViewStaff = (staffList) => {
    let content = "";
    staffList.forEach((item, index) => {
        if (index >= start && index < end) {
            content += `
                <div class="col-2   p-1">
                    <div class="card   border-0 shadow-sm   rounded" >
                        <img src= ${
                            item.gender == "male"
                                ? "./image/img_avatar.png"
                                : "./image/img_avatar1.png"
                        } class="card-img-top" style="height:10rem">
                        <div class="card-body">
                            <h5 class="card-title">Name: ${item.name}</h5>
                            <div class="d-flex ">
                                <h5 class="card-title">ID: #${item.id}</h5>
                                <h5 class="ml-4 card-title">Status: N/A</h5></div>
                            <a href="#" class="btn btn-primary btn-sm modal-btn" data-toggle="modal" data-target="#staffModal">See Detail</a>
                        </div>
                    </div>
                </div>
            `;
        }
    });

    document.getElementById("staff-content").innerHTML = content;
};
export let renderListPage = (totalPages) => {
    let content = `<li class="page-item active"><a class="page-link " href="#">${1}</a></li>`;
    for (let i = 2; i <= totalPages; i++) {
        content += `<li class="page-item"><a class="page-link" href="#">${i}</a></li>`;
    }
    document.getElementById("list-page").innerHTML = content;
};
export let changePage = () => {
    let pages = document.querySelectorAll("#list-page li");
    for (let i = 0; i <= pages.length; i++) {
        pages[i].addEventListener("click", () => {
            let value = i + 1;
            currentPage = value;
            start = (currentPage - 1) * perPage;
            end = currentPage * perPage;
            renderViewStaff(STAFF);
            addDataTarget(list, STAFF);
            for (let i = 0; i < pages.length; i++) {
                pages[i].classList.remove("active");
            }
            pages[i].classList.add("active");
        });
    }

    createModalForEachStaff(STAFF);
};
document.getElementById("btn-prev").addEventListener("click", () => {
    let pages = document.querySelectorAll("#list-page li");
    for (let i = 0; i < pages.length; i++) {
        pages[i].classList.remove("active");
    }
    currentPage--;
    if (currentPage < 1) {
        currentPage = 1;
    }
    start = (currentPage - 1) * perPage;
    end = currentPage * perPage;

    pages[currentPage - 1].classList.add("active");
    renderViewStaff(STAFF);
    addDataTarget(list, STAFF);
    createModalForEachStaff(STAFF);
});
document.getElementById("btn-next").addEventListener("click", () => {
    let pages = document.querySelectorAll("#list-page li");
    for (let i = 0; i < pages.length; i++) {
        pages[i].classList.remove("active");
    }
    currentPage++;
    if (currentPage > totalPages) {
        currentPage = totalPages;
    }
    console.log("currentPage: ", currentPage);
    start = (currentPage - 1) * perPage;
    end = currentPage * perPage;

    pages[currentPage - 1].classList.add("active");
    renderViewStaff(STAFF);
    createModalForEachStaff(STAFF);
    addDataTarget(list, STAFF);
});

// add data-target (list: list of a tag)
export let addDataTarget = (list, staffList) => {
    let staffId = [];
    staffList.forEach((item, index) => {
        if (index >= start && index < end) {
            staffId.push(item.id);
        } else return;
    });
    // let staffId = staffList.map((item, index) => {
    //     if (index >= start && index < end) {
    //         return item.id;
    //     } else return;
    // });
    console.log("staffId: ", staffId);
    for (let i = 0; i < list.length; i++) {
        list[i].dataset.target = `#staffModal-${staffId[i]}`;
    }
};

export let createModalForEachStaff = (staffList) => {
    let staffId = staffList.map((item) => {
        return item.id;
    });
    let content = "";
    for (let i = 0; i < staffList.length; i++) {
        content += `
            <div  class="modal fade " id="staffModal-${
                staffId[i]
            }" tabindex="-1" role="dialog" aria-labelledby="staffModal-${
            staffId[i]
        }" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Staff Detail</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body d-flex justify-content-around">
                    
                        <div class="staff-ava m-2">
                            <img style="width: 10rem" src=${
                                staffList[i].gender == "male"
                                    ? "./image/img_avatar.png"
                                    : "./image/img_avatar1.png"
                            } alt="" />
                        </div>
                        <div class="mt-2">
                            <h5>Name: ${staffList[i].name}</h5>
                            <h5>ID: #${staffList[i].id}</h5>
                            <h5>Status: ${staffList[i].status}</h5>
                            <h5>Age: ${staffList[i].age}</h5>
                            <h5>Gender: ${staffList[i].gender}</h5>
                            <h5>Email: ${staffList[i].email}</h5>
                            <h5>Phone Number: ${staffList[i].phoneNo}</h5>
                        </div>
                   
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
       `;
    }
    document.getElementById("staff-modal").innerHTML = content;
};

export let exportDataStaff = (data) => {
    let staffData = [];
    staffData = data.map((staff) => {
        return new Staff(
            staff.name,
            staff.id,
            staff.status,
            staff.age,
            staff.email,
            staff.phoneNo,
            staff.gender
        );
    });
    return staffData;
};
