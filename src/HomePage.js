import './App.css';
import './layout.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Questions from './components/questions.js';
import React,{Component} from 'react';
import About from './components/about.js';

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
		console.log(c);
		this.setState({display: c});
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
			        <li><a href="http://mnipdvkammari:3001"><span class="glyphicon glyphicon-log-in"></span> Logout</a></li>
			      </ul>
			  </div>
			</nav>
			  
			<div class="container-fluid">    
			  <div class="row content">
			    <div class="col-sm-2 sidenav">
				  <input type="button" value="Home" class="btn-info btn-lg" onClick={this.mainDisplay}/>
				  <br />
		<br />
				  <input type="button" value="About" class="btn-info btn-lg" onClick={this.mainDisplay}/>
				  <br />
				  <br />
				  <input type="button" value="............." class="btn-info btn-lg" />
			    </div>
			    <div class="col-sm-8 text-left"> 
					{this.state.display === "Home" && <Questions />}
					{this.state.display === "About" && <About />}
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