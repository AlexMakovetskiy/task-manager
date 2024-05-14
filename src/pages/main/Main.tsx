import { ITaskListItem } from "../../types/Main";
import TaskCard from "../../components/taskCard/TaskCard";

import styles from "./Main.module.scss";

function Main() {
	const list: ITaskListItem[] = [
		{
			taskName: "sdfsdf",
			description: "sdfsdf",
			isCompleted: false,
		},
		{
			taskName: "sdfg",
			description: "sdsdfgsdfgfsdf",
			isCompleted: false,
		},
	];

	return (
		<section className={styles.mainPageWrap}>
			<div className={styles.statusbarWrap}>
				<p>Выполнено: 0</p>
				<p>Не выполнено: 0</p>
			</div>
			<div className={styles.taskListWrap}>
				{list.map((item) => (
					<TaskCard key={crypto.randomUUID()} taskData={item} />
				))}
			</div>
		</section>
	);
}

export default Main;
