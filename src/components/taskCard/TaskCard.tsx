import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import cn from "classnames/dedupe";

import useAppDispatch from "../../hooks/useAppDispatch";

import { ITaskCard } from "../../types/TaskCard";
import { removeTask, setTaskComplete } from "../../redux/taskData/TaskDataSlice";

import styles from "./TaskCard.module.scss";

function TaskCard({ taskData }: ITaskCard) {
	const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

	const dispatch = useAppDispatch();

	const iconSizeValueList = {
		firstTabletValue: 20,
		defaultValue: 30,
	};

	const deviceWidthValues = {
		firstTabletValue: 630,
	};

	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};

		handleResize();
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	function getIconSize() {
		if (windowWidth <= deviceWidthValues.firstTabletValue) {
			return iconSizeValueList.firstTabletValue;
		}

		return iconSizeValueList.defaultValue;
	}

	const handleTaskComplete = () => {
		dispatch(setTaskComplete(taskData.id));
	};

	const handleTaskRemove = () => {
		dispatch(removeTask(taskData.id));
	};

	return (
		<div className={cn(styles.taskCardWrap, { [styles.taskCardWrap_completed]: taskData.isCompleted })}>
			<div className={styles.infoWrap}>
				<input type="checkbox" checked={taskData.isCompleted} onChange={handleTaskComplete} />

				<div className={styles.taskContent}>
					<h3
						className={cn(styles.taskContent__title, { [styles.taskContent__title_completed]: taskData.isCompleted })}>
						{taskData.taskName}
					</h3>
					<p
						className={cn(styles.taskContent__subtitle, {
							[styles.taskContent__subtitle_completed]: taskData.isCompleted,
						})}>
						{taskData.description}
					</p>
				</div>
			</div>
			<button onClick={handleTaskRemove} className={styles.taskCardWrap__removeAction}>
				<AiOutlineDelete size={getIconSize()} color="#fff" />
			</button>
		</div>
	);
}

export default TaskCard;
