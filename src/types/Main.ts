import { taskStatuses } from "../helpers/Main";

export interface ITaskListItem {
	id: string;
	taskName: string;
	description: string;
	isCompleted: boolean;
}

export type TaskStatuses = keyof typeof taskStatuses;
