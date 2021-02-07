import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import NavigationBar from './componenets/NavigationBar';
import Login from './componenets/Login';
import Regsiter from './componenets/Register';
import Home from './componenets/Home';

function App() {
	return (
		<>
			<NavigationBar />
			<Router>
				<Switch>
					<Route path="/login" exact component={Login} />
					<Route path="/register" exact component={ Regsiter } />
					<Route path ="/" component = {Home} />
				</Switch>
			</Router>
		</>
	);
}

export default App;
