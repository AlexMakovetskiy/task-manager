import { useState } from "react";

import useAppDispatch from "../../hooks/useAppDispatch";

import { ITaskListItem } from "../../types/Main";
import { createTask } from "../../redux/taskData/TaskDataSlice";

import styles from "./Header.module.scss";

function Header() {
	const [isShowDescription, setIsShowDescription] = useState<boolean>(false);
	const [taskName, setTaskName] = useState<string>("");
	const [taskDescription, setTaskDescription] = useState<string>();

	const dispatch = useAppDispatch();

	function toggleDescriptionArea() {
		return setIsShowDescription(!isShowDescription);
	}

	function handleCreateTask() {
		const taskData: ITaskListItem = {
			id: crypto.randomUUID(),
			taskName: !taskName.length ? "Новая задача" : taskName,
			description: taskDescription ?? "",
			isCompleted: false,
		};

		setTaskName("");
		setTaskDescription("");

		return dispatch(createTask(taskData));
	}

	return (
		<header className={styles.headerWrap}>
			<div className={styles.toolbarWrap}>
				<input
					type="text"
					placeholder="Название задачи"
					value={taskName}
					onChange={(e) => setTaskName(e.target.value)}
					className={styles.toolbarWrap__textLine}
				/>
				<div className={styles.actionWrap}>
					<button onClick={toggleDescriptionArea} className={styles.actionWrap__descriptionAreaAction}>
						Добавить описание
					</button>
					<button className={styles.actionWrap__taskAction} onClick={handleCreateTask}>
						Создать
					</button>
				</div>
			</div>
			{isShowDescription && (
				<textarea
					placeholder="Описание задачи"
					value={taskDescription}
					onChange={(e) => setTaskDescription(e.target.value)}
					className={styles.headerWrap__descriptionArea}
				/>
			)}
		</header>
	);
}

export default Header;
