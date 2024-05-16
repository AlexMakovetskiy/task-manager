import { Reorder } from "framer-motion";

import useAppSelector from "../../hooks/useAppSelector";
import useAppDispatch from "../../hooks/useAppDispatch";

import { ITaskListItem } from "../../types/Main";
import TaskCard from "../taskCard/TaskCard";
import taskDataSelector from "../../redux/taskData/TaskDataSelector";
import { setTaskSequence } from "../../redux/taskData/TaskDataSlice";

import styles from "./Main.module.scss";

function Main() {
	const taskList = useAppSelector(taskDataSelector).taskList;
	const dispatch = useAppDispatch();

	const handleSetTaskSequence = (taskSequence: ITaskListItem[]) => {
		dispatch(setTaskSequence(taskSequence));
	};

	// a function that displays a list of tasks indicating their status
	function renderTaskList() {
		return (
			<Reorder.Group axis="y" values={taskList} onReorder={handleSetTaskSequence} className={styles.taskListWrap}>
				{taskList.map((item) => (
					<Reorder.Item key={item.id} value={item}>
						<TaskCard key={crypto.randomUUID()} taskData={item} />
					</Reorder.Item>
				))}
			</Reorder.Group>
		);
	}

	return (
		<section className={styles.mainPageWrap}>
			{/* Total number of completed and uncompleted tasks */}
			<div className={styles.statusbarWrap}>
				<p>Выполнено: {taskList.filter((taskData) => taskData.isCompleted).length}</p>
				<p>Не выполнено: {taskList.filter((taskData) => !taskData.isCompleted).length}</p>
			</div>
			{renderTaskList()}
		</section>
	);
}

export default Main;
