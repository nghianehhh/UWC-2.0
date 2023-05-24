import { VEHICLE } from "../index.js";
import { Vehicle } from "../model/VehicleModel.js";

export let renderViewVehicle = (vehicleList) => {
    let content = "";
    vehicleList.forEach((item, index) => {
        content += `
                <div class="col-2   p-1">
                    <div class="card   border-0 shadow-sm   rounded" >
                        <img src= ${
                            item.type == "Truck"
                                ? "./image/truck.png"
                                : "./image/large-bin.png"
                        } 
                        class="card-img-top" style="height:10rem">
                        <div class="card-body">
                            <h5 class="card-title">Name: ${item.name}</h5>
                            <div class=" ">
                                <h5 class="card-title">ID: #${item.id}</h5>
                                <h5 class=" card-title">Status: 
                                ${
                                    item.status == "Available"
                                        ? `<span class="text-success">${item.status}</span></h5>`
                                        : `<span class="text-danger">${item.status}</span></h5>`
                                }
                                
                            </div>

                        </div>
                    </div>
                </div>
            `;
    });

    document.getElementById("vehicle-content").innerHTML = content;
};

export let exportDataVehicle = (data) => {
    let vehicleData = [];
    vehicleData = data.map((vehicle) => {
        return new Vehicle(
            vehicle.name,
            vehicle.id,
            vehicle.status,
            vehicle.type
        );
    });
    return vehicleData;
};
