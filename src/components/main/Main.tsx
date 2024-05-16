import { ChangeEvent, useState } from "react";
import { Reorder } from "framer-motion";
import cn from "classnames/dedupe";

import useAppSelector from "../../hooks/useAppSelector";
import useAppDispatch from "../../hooks/useAppDispatch";

import { ITaskListItem, TaskStatuses } from "../../types/Main";
import TaskCard from "../taskCard/TaskCard";
import taskDataSelector from "../../redux/taskData/TaskDataSelector";
import { setSearchValue, setTaskSequence } from "../../redux/taskData/TaskDataSlice";
import { taskStatuses } from "../../helpers/Main";

import styles from "./Main.module.scss";

function Main() {
	const [searchLine, setSearchLine] = useState<string>("");
	const [currentFilter, setCurrentFilter] = useState<TaskStatuses>(taskStatuses.allTasks);

	const taskList = useAppSelector(taskDataSelector).taskList;
	const searchValue = useAppSelector(taskDataSelector).searchValue;
	const dispatch = useAppDispatch();

	const filteredTasks = taskList
		.filter((task) => {
			if (currentFilter === taskStatuses.completed) {
				return task.isCompleted;
			}
			if (currentFilter === taskStatuses.notCompleted) {
				return !task.isCompleted;
			}
			return true;
		})
		.filter((task) => task.taskName.toLowerCase().includes(searchValue.toLowerCase()));

	const handleSetTaskSequence = (taskSequence: ITaskListItem[]) => {
		dispatch(setTaskSequence(taskSequence));
	};

	// a function that displays a list of tasks indicating their status
	function renderTaskList() {
		return (
			<Reorder.Group axis="y" values={taskList} onReorder={handleSetTaskSequence} className={styles.taskListWrap}>
				{filteredTasks.map((item) => (
					<Reorder.Item key={item.id} value={item}>
						<TaskCard key={crypto.randomUUID()} taskData={item} />
					</Reorder.Item>
				))}
			</Reorder.Group>
		);
	}

	const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		const value = event.target.value;
		setSearchLine(value);
		dispatch(setSearchValue(value)); // Dispatch the action to update the query in the store
	};

	return (
		<section className={styles.mainPageWrap}>
			{/* Total number of completed and uncompleted tasks */}
			<div className={styles.headerWrap}>
				<div className={styles.statusbarWrap}>
					<p>Выполнено: {taskList.filter((taskData) => taskData.isCompleted).length}</p>
					<p>Не выполнено: {taskList.filter((taskData) => !taskData.isCompleted).length}</p>
				</div>
				<div className={styles.headerContainer}>
					<input
						type="text"
						value={searchLine}
						onChange={handleChangeInput}
						placeholder="Найти задание"
						className={styles.headerContainer__searchLine}
					/>
					<div className={styles.toolbarWrap}>
						<button
							onClick={() => setCurrentFilter(taskStatuses.allTasks)}
							className={cn(styles.actionElement, {
								[styles.actionElement_selected]: currentFilter === taskStatuses.allTasks,
							})}>
							Все
						</button>
						<button
							onClick={() => setCurrentFilter(taskStatuses.completed)}
							className={cn(styles.actionElement, {
								[styles.actionElement_selected]: currentFilter == taskStatuses.completed,
							})}>
							Выполненные
						</button>
						<button
							onClick={() => setCurrentFilter(taskStatuses.notCompleted)}
							className={cn(styles.actionElement, {
								[styles.actionElement_selected]: currentFilter == taskStatuses.notCompleted,
							})}>
							Не выполненные
						</button>
					</div>
				</div>
			</div>
			{renderTaskList()}
		</section>
	);
}

export default Main;
