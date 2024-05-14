import Main from "./pages/main/Main";
import Header from "./components/header/Header";

import "./App.css";

function App() {
	return (
		<div className="appWrap">
			<main className="appContainer">
				<Header />
				<Main />
			</main>
		</div>
	);
}

export default App;
