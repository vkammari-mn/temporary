import '../App.css';
import '../layout.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Questions from './questions.js';
import React,{Component} from 'react';
import About from './about.js';
import Users from './users.js';
import SearchQuestions from './searchQuestions.js';
import DisplayArticles from './DisplayArticles.js';

class HomePage extends Component {
	constructor(props){ 
		super(props);
		this.state = {
			display: 'Home',
			trigger: "0",
			search: "",
			boolSearch: false
		}
		this.mainDisplay=this.mainDisplay.bind(this);
		this.onSearch = this.onSearch.bind(this);
	}
	mainDisplay(event){
		const c = event.target.value;
		//console.log(c);
		this.setState({display: c});
		if(c !== "Users "){
			if( c !== "About"){
				if( c !== "Articles"){
					window.location.reload()
					sessionStorage.setItem("mquestion","false")
				}
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
		/*if(this.state.trigger === "0"){
			window.location.reload()
			this.setState({trigger: "1"})
		}*/
		
	}
	async logoutTime(){
		const token = sessionStorage.getItem("token")
		console.log(token)
		const url = "http://mnipdrbhavanam:8888/lsforum/login/logouttime?token="+token
		await fetch(url,{
			method:'GET',
			mode:'cors',
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json"
			},
			body: JSON.stringify()
		})
	}
	displayModQues(){
		sessionStorage.setItem("mquestion","true")
		window.location.reload()
	}
	displayReports(){
		window.location.href = "http://mnipdvkammari:3000/reports"
	}
	async onSearch(){
		this.setState({display: "Search"})
	}
	render(){
	  return (
		<div className="layout">
			<nav class="navbar navbar-default">
			  <div class="container-fluid">
			    <div class="navbar-header">
					<div class="input-group rounded">
					  <input type="search" class="form-control rounded" value={this.state.search} onChange={(e)=>this.setState({search:e.target.value})} placeholder="Search" aria-label="Search"
					  aria-describedby="search-addon" />
					  <button type="submit" class="btn-primary rounded" onClick={this.onSearch}>
					    <i class="fa fa-search"></i></button>
					</div>				 
			    </div>
			      <ul class="nav navbar-nav navbar-right">
			        <li><a href="http://mnipdvkammari:3000/login" onClick={this.logoutTime}><span class="glyphicon glyphicon-log-in"></span> Logout</a></li>
			      </ul>
			  </div>
			</nav>
			  
			<div class="container-fluid">    
			  <div class="row content">

			    <div class="col-sm-2 sidenav">
				  <input type="button" value="Home" class="btn-info btn-lg bttn" onClick={this.mainDisplay}/>
				  <br />
		<br /> 
				  <input type="button" value="About" class="btn-info btn-lg bttn" onClick={this.about}/>
				  <br />
		<br />
				  <input type="button" value="Articles" class="btn-info btn-lg bttn" onClick={this.mainDisplay}/>
		<br />
		<br />
				  {sessionStorage.getItem("type") === "admin" && <input type="button" value="Users " class="btn-info btn-lg bttn" onClick={this.mainDisplay}/>}
				  <br /> 
				  {sessionStorage.getItem("type") === "moderator" && <input type="button" value="My Space" class="btn-info btn-lg bttn" onClick={this.displayModQues}/>}
		<br />
				  {sessionStorage.getItem("type") === "admin" && <input type="button" value="Reports " class="btn-info btn-lg bttn" onClick={this.displayReports}/>}
		
			    </div>
			    <div class="col-sm-10 text-left"> 
					{this.state.display === "Home" && <Questions searchText={this.state.search} boolSearch={this.state.boolSearch}/>}
					{this.state.display === "About" && <About />}
					{this.state.display === "Users " && <Users />}
					{this.state.display === "Search" && <SearchQuestions searchText={this.state.search}/>}
					{this.state.display === "Articles" && <DisplayArticles />}
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