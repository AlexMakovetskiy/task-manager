import { RootState } from "..";

const taskDataSelector = (state: RootState) => {
	return state.taskList;
};

export default taskDataSelector;
