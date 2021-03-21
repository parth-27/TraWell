import './App.css';

import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

import Home from "./components/pages/Home";
import Navbar from "./components/components/Navbar/Navbar";
import { Authenticate } from "./components/pages/Auth/index.js";
import Main from "./components/pages/Main";

function App() {
	return (
		<>
			<Router>
				<Navbar />
				<Switch>
					<Route path='/' exact component={Home} />
					<Route path='/user/signup' exact render={(props) => <Authenticate {...props} signup={true} />}/>
					<Route path='/user/signin' exact render={()=> <Authenticate /> }/>
					<Route path='/rent' exact component={Main} />
					{/* <Route path='/sign-up' exact component={Signup} /> */}
				</Switch>
			</Router>
		</>
	);
}

export default App;
