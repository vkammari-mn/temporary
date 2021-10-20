import React from 'react';
import { BrowserRouter,Switch,Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import SignUp from './components/SignUp';
import Login from './components/Login_comp_2';
import Reports from './components/reports';
import About from './components/about';
import SearchQuestions from './components/searchQuestions';

function App() {                                                                                               
		return(
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={Login} />
					<Route path="/login" component={Login} />
					<Route path="/home" component={HomePage}/>
					<Route path="/signup" component={SignUp}/>
					<Route path="/reports" component={Reports}/>
					<Route path="/about" component={About}/>
					<Route path="/search" component={SearchQuestions }/>
				</Switch>
			</BrowserRouter>
		)
	 
}

export default App;