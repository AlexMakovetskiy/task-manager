import { AiOutlineDelete } from "react-icons/ai";

import { ITaskCard } from "../../types/TaskCard";

import styles from "./TaskCard.module.scss";

function TaskCard({ taskData }: ITaskCard) {
	const handleTaskComplete = () => {
		// dispatch(toggleTaskDone(task.title));
	};

	const handleTaskRemove = () => {
		// dispatch(removeTask(task.title));
	};

	return (
		<div className={styles.taskCardWrap} style={{ backgroundColor: taskData.isCompleted ? "#e0ffe0" : "#051956" }}>
			<div className={styles.infoWrap}>
				<input type="checkbox" checked={taskData.isCompleted} onChange={handleTaskComplete} />

				<div className={styles.taskContent}>
					<h3 className={styles.taskContent__title}>{taskData.taskName}</h3>
					<p className={styles.taskContent__subtitle}>{taskData.description}</p>
				</div>
			</div>
			<button onClick={handleTaskRemove} className={styles.taskCardWrap__removeAction}>
				<AiOutlineDelete size={30} color="#fff" />
			</button>
		</div>
	);
}

export default TaskCard;
