import './App.css';

import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

import Home from "./components/pages/Home";
import Navbar from "./components/components/Navbar/Navbar";
import { Authenticate } from "./components/Auth/index";

function App() {
	return (
		<>
			<Router>
				<Navbar />
				<Switch>
					<Route path='/' exact component={Home} />
					<Route path='/login' exact component={Authenticate} />
					{/* <Route path='/sign-up' exact component={Signup} /> */}
				</Switch>
			</Router>
		</>
	);
}

export default App;
