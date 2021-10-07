import './App.css';
import './layout.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Questions from './components/questions.js';
import React,{Component} from 'react';
import About from './components/about.js';
import Users from './components/users.js';

class HomePage extends Component {
	constructor(props){ 
		super(props);
		this.state = {
			display: 'Home'
		}
		this.mainDisplay=this.mainDisplay.bind(this);
	}
	mainDisplay(event){
		const c = event.target.value;
		//console.log(c);
		this.setState({display: c});
		if(c != "Users "){
			if( c != "About"){
				window.location.reload()
				sessionStorage.setItem("mquestion","false")
				}
		}
	}
	about(){
		window.location.href="http://mnipdvkammari:3000/about"
	}
	async componentDidMount(){
		const token = sessionStorage.getItem("token")
		const url = "http://mnipdrbhavanam:8888/lsforum/login/userdetails?token="+token
		let result = await fetch(url,{
			method:'GET',
			mode:'cors',
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json"
			},
			body: JSON.stringify()
		})
		const res = await result.json()
		if(!res.username){
			console.log("pls login")
			sessionStorage.removeItem("token")
			alert("please login")
			window.location.href = "http://mnipdvkammari:3000/login"
		}
		
	}
	async logoutTime(){
		const token = sessionStorage.getItem("token")
		console.log(token)
		const url = "http://mnipdrbhavanam:8888/lsforum/login/logouttime?token="+token
		let result = await fetch(url,{
			method:'GET',
			mode:'cors',
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json"
			},
			body: JSON.stringify()
		})
		

		//const res = await result.json();
		
		//console.log("in logout")
	}
	displayModQues(){
		sessionStorage.setItem("mquestion","true")
		window.location.reload()
	}
	displayReports(){
		window.location.href = "http://mnipdvkammari:3000/reports"
	}
	render(){
	  return (
		<div className="layout">
			<nav class="navbar navbar-default">
			  <div class="container-fluid">
			    <div class="navbar-header">
			      {/*<a class="navbar-brand" href="#">Logo</a>*/}
			    </div>
			      <ul class="nav navbar-nav navbar-right">
			        <li><a href="http://mnipdvkammari:3000/login" onClick={this.logoutTime}><span class="glyphicon glyphicon-log-in"></span> Logout</a></li>
			      </ul>
			  </div>
			</nav>
			  
			<div class="container-fluid">    
			  <div class="row content">
			    <div class="col-sm-2 sidenav">
				  <input type="button" value="Home" class="btn-info btn-lg" onClick={this.mainDisplay}/>
				  <br />
		<br /> 
				  <input type="button" value="About" class="btn-info btn-lg" onClick={this.about}/>
				  <br />
		<br />
				  {sessionStorage.getItem("type") === "admin" && <input type="button" value="Users " class="btn-info btn-lg" onClick={this.mainDisplay}/>}
				  <br /> 
				  {sessionStorage.getItem("type") === "moderator" && <input type="button" value="My Space" class="btn-info btn-lg" onClick={this.displayModQues}/>}
		<br />
				  {sessionStorage.getItem("type") === "admin" && <input type="button" value="Reports " class="btn-info btn-lg" onClick={this.displayReports}/>}
			    </div>
			    <div class="col-sm-10 text-left"> 
					{this.state.display === "Home" && <Questions />}
					{this.state.display === "About" && <About />}
					{this.state.display === "Users " && <Users />}
					{/*this.state.display === "MySpace" && <ModeratorQuestions />*/}
			    </div>
			    <div class="col-sm-2 sidenav">
			    </div>
			  </div>
			</div>
		</div>
	  );
	}
}

export default HomePage;