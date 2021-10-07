import React,{ useState } from 'react';
import { BrowserRouter,Link,Switch,Route } from 'react-router-dom';
import HomePage from './HomePage';
import SignUp from './SignUp';
import Login from './Login_comp_2';
import Reports from './components/reports';
import About from './components/about';

function App() {   
	const [token, setToken] = useState();
	/*if(!token) {
		return(
			<BrowserRouter>
				<Switch>
					<Route path="/signup" component={SignUp}/>
					<Route exact path="/home"><Login setToken = {setToken}/></Route>
					<Route path="/login"><Login setToken = {setToken}/></Route>
					<Route path="/"><Login setToken = {setToken}/></Route>
				</Switch>
			</BrowserRouter>
	)}  */                                                                                              
		return(
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={Login} />
					<Route path="/login" component={Login} />
					<Route path="/home" component={HomePage}/>
					<Route path="/signup" component={SignUp}/>
					<Route path="/reports" component={Reports}/>
					<Route path="/about" component={About}/>
				</Switch>
			</BrowserRouter>
		)
	 
}

export default App;