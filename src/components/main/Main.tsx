import useAppSelector from "../../hooks/useAppSelector";

import TaskCard from "../taskCard/TaskCard";
import taskDataSelector from "../../redux/taskData/TaskDataSelector";

import styles from "./Main.module.scss";

function Main() {
	const taskList = useAppSelector(taskDataSelector).taskList;

	// a function that displays a list of tasks indicating their status
	function renderTaskList() {
		return taskList.map((item) => <TaskCard key={crypto.randomUUID()} taskData={item} />);
	}

	return (
		<section className={styles.mainPageWrap}>
			{/* Total number of completed and uncompleted tasks */}
			<div className={styles.statusbarWrap}>
				<p>Выполнено: {taskList.filter((taskData) => taskData.isCompleted).length}</p>
				<p>Не выполнено: {taskList.filter((taskData) => !taskData.isCompleted).length}</p>
			</div>
			<div className={styles.taskListWrap}>{renderTaskList()}</div>
		</section>
	);
}

export default Main;
