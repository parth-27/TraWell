import './App.css';

import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

import Home from "./components/pages/Home";
import Navbar from "./components/components/Navbar/Navbar";

function App() {
	return (
		<>
			<Router>
				<Navbar />
				<Switch>
					<Route path='/' exact component={Home} />
				</Switch>
			</Router>
		</>
	);
}

export default App;
