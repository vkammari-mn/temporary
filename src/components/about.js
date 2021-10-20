import React, {Component} from 'react';
import '../App.css';
import '../layout.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class About extends React.Component{
	constructor(props){ 
		super(props);
		this.state = {
			display: 'Home'
		}
	}
	home(){
		window.location.href="http://mnipdvkammari:3000/home"
	}
	async componentDidMount(){
		/*const token = sessionStorage.getItem("token")
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
		*/
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
				  <input type="button" value="Home" class="btn-info btn-lg bttn" onClick={this.home}/>
				  <br />
		<br />
				  
			    </div>
			    <div class="col-sm-10 text-left"> 
					<div>
					<h2>About</h2>
				<h6><pre class="text-wrap"><p>Forum for life sciences (stack-overflow like platform for life science
students/research)
Build a question-and-answer platform for professional and life science student/ scholars
Roles in this project
• Normal User
o post question/answer, user will get rewarded with points based on votes for
answers
o publish article about specific area based on his research, points will be
awarded based on no claps he receives
o can be a moderator after reaching specific reward points
o user can cast only vote per answer/question or one clap for article
o can report question/article
• Moderator
o Moderator user will have initial reputation/score
o Review question/answer or article and approve.
o Reputation of the moderator will be awarded based on no of claps/votes
received for his approved articles/questions/answers
o One article can be approved by only one moderator
o Approved article or question/answer is reported by threshold limit of people
then moderator reputation/score will be reduced
• Admin
o Delete or create users/moderators
Backend tasks
• Workflow should be defined to route article/questions to specific
moderator(s) based on topic
• Email should be sent to moderators
Nice to have dashboard for each role to showcase the reward points and his questions
Non-Functional Requirements
•
•
•
•
Unit Test (through Junit or other equivalent frameworks)
Continuous Integration (CI) / Continuous Deployment (CD) - using Jenkins or any other tool
Performance
Security - SAST</p></pre></h6>
			</div>
			    </div>
			    <div class="col-sm-2 sidenav">
			    </div>
			  </div>
			</div>
		</div>
	  );
	}
}

export default About;