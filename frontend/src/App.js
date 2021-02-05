import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import NavigationBar from './componenets/NavigationBar';
import Login from './componenets/Login';

function App() {
	return (
		<>
			<NavigationBar />
			<Router>
				<Switch>
					<Route path="/login" exact component={ Login } />
				</Switch>
			</Router>
		</>
	);
}

export default App;
