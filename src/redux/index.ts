import { configureStore } from "@reduxjs/toolkit";

import TaskDataReducer from "./taskData/TaskDataSlice";

const store = configureStore({
	reducer: {
		taskList: TaskDataReducer,
	},
	devTools: true,
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
