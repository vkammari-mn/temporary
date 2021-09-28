/**
 * Created by vkammari on 9/5/21.
 */
import React, {Component} from 'react';
import Text_comp from './textip-comp.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { unstable_concurrentAct } from 'react-dom/test-utils';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

 
class Login_comp extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: 'vamshi',
            password: 'modeln',
        }
        this.clickTextPass = this.clickTextPass.bind(this);
        this.clickTextUser = this.clickTextUser.bind(this);
        this.clickClear = this.clickClear.bind(this);
		this.login = this.login.bind(this);
   }
    refresh() {
        window.location.reload(false);
    }
    clickTextUser(event) {
        const c = event.target.value;
        this.setState({username: c});
    }
    clickTextPass(event) {
        const p = event.target.value;
        this.setState({password: p});
    }
    clickClear(){
		console.log(this.state.username,this.state.password)
        this.setState({password: ''});
        this.setState({username: ''});
    }
	/*componentDidMount(){
	    axios.get('https://jsonplaceholder.typicode.com/posts')
	    .then(response => {
	        this.setState({postList: response.data})
			console.log(this.state.postList)
	    })
	    .catch(error => {
	        console.log(error)
	    })
	}*/
	/*componentDidMount(){
	    axios.post('https://jsonplaceholder.typicode.com/posts',this.state)
	    .then(response => {
			console.log(response)
	    })
	}*/
	async login(){
		const user = this.state.username;
		const pass = this.state.password;
		//console.warn(user,pass);
		this.clickClear();
		let item = {user,pass}
		let result = await fetch("http://localhost:8080/validation/webapi/checks/check/username/password?username=vamshi&password=modeln",{
			method:'POST',
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json"
			},
			body: JSON.stringify(item)
		});
		result = await result.json();
		localStorage.setItem("",JSON.stringify(result))
		//history.push("/add")
	}
    render(){
        return(
            <div>
                <Text_comp lbl="Username : &nbsp;" change={this.clickTextUser} val={this.state.username} typ="text" click={this.clickTextUser}/>
                <br />
                <Text_comp lbl="Password &nbsp;: &nbsp;" change={this.clickTextPass} val={this.state.password} typ="password" click={this.clickTextPass}/>
                <br />
                <input type="button" class="btn btn-primary btn-lg" value="clear" id="btn" onClick={this.clickClear}/><input id="lgn" type="submit" class="btn btn-primary btn-lg" value="login" onClick={this.login} />
                <br/>
				<br/>
				<p class="small fw-bold mt-2 pt-1 mb-0 inline">Don't have an account ? &nbsp; </p> <a href="http://mnipdigupta:3001/" target="_blank" class="link-danger inline">Sign up!</a>
            </div>
        );
    }
}

export default Login_comp;