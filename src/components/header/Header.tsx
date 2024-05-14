import { useState } from "react";

import styles from "./Header.module.scss";

function Header() {
	const [isShowDescription, setIsShowDescription] = useState<boolean>(false);
	const [taskName, setTaskName] = useState<string>();
	const [taskDescription, setTaskDescription] = useState<string>();

	function toggleDescriptionArea() {
		return setIsShowDescription(!isShowDescription);
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
				<button onClick={toggleDescriptionArea} className={styles.toolbarWrap__descriptionAreaAction}>
					Добавить описание
				</button>
				<button className={styles.toolbarWrap__taskAction}>Создать</button>
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
