import useAppSelector from "../../hooks/useAppSelector";

import TaskCard from "../taskCard/TaskCard";
import taskDataSelector from "../../redux/taskData/TaskDataSelector";

import styles from "./Main.module.scss";

function Main() {
	const taskList = useAppSelector(taskDataSelector).taskList;

	return (
		<section className={styles.mainPageWrap}>
			<div className={styles.statusbarWrap}>
				<p>Выполнено: {taskList.filter((taskData) => taskData.isCompleted).length}</p>
				<p>Не выполнено: {taskList.filter((taskData) => !taskData.isCompleted).length}</p>
			</div>
			<div className={styles.taskListWrap}>
				{taskList.map((item) => (
					<TaskCard key={crypto.randomUUID()} taskData={item} />
				))}
			</div>
		</section>
	);
}

export default Main;
