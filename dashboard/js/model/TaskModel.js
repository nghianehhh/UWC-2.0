export class Task {
    constructor(_taskID, _taskTitle, _staffInput, _startDate, _endDate) {
        this.title = _taskTitle;
        this.id = _taskID;
        this.staffInput = _staffInput;
        this.startDate = _startDate;
        this.endDate = _endDate;
    }
}
