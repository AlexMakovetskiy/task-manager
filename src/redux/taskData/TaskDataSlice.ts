import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { ITaskDataInitialState } from "../../types/StoreTypes";
import { ITaskListItem } from "../../types/Main";

const initialStateTaskData: ITaskDataInitialState = {
	taskList: [],
};

const TaskDataSlice = createSlice({
	name: "taskData",
	initialState: initialStateTaskData,
	reducers: {
		createTask: (state: ITaskDataInitialState, action: PayloadAction<ITaskListItem>) => {
			state.taskList = [...state.taskList, action.payload];
		},
		setTaskComplete: (state: ITaskDataInitialState, action: PayloadAction<string>) => {
			state.taskList.find((taskData) => {
				if (taskData.id === action.payload) {
					taskData.isCompleted = !taskData.isCompleted;
				}
				return taskData.id === action.payload;
			});
		},

		removeTask: (state: ITaskDataInitialState, action: PayloadAction<string>) => {
			state.taskList = state.taskList.filter((taskData) => action.payload !== taskData.id);
		},
	},
});

export const { createTask, setTaskComplete, removeTask } = TaskDataSlice.actions;
export default TaskDataSlice.reducer;
