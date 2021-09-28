import React, { useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
//import Header from './Header'

function Login({ setToken }) {
	const [user,setUser]=useState('');
	const [password, setPassword]=useState(''); 
	/*const hist = useHistory();
	useEffect (() => { if (localStorage.getItem('user-info')) {
	hist.push("/add")
	}
	}, [])*/
	async function login(){
		//console.warn(user,password);
		if(user == "" || password ==  ""){
			alert("please enter username or password")
			return;
		}
		const url = "http://mnipdrbhavanam:8088/LSForum/login/Validation?username="+user+"&password="+password	
		
		let result = await fetch(url,{
			method:'GET',
			mode:'cors',
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json"
			},
			body: JSON.stringify()
		})


		const res = await result.json();
		
		if(res.token){
			//alert('valid')
			sessionStorage.setItem("token",res.token)
			window.location.href = "http://mnipdvkammari:3000/home"			
		}		
		else{
			alert('invalid login')
		}
		
		}

	return( 
	        <div>
            <h1 class="container container-md">Login Page</h1>
          <div class="split left">
            <div class="centered">
            </div>
          </div>

          <div class="split right">
            <div class="centered">
		<div>
		<div className="col-sm-6 offset-sm-3"> 
		<label class="d-inline">User</label><br /><input type="text" placeholder="user" onChange={(e)=>setUser(e.target.value)} value={user} className="d-inline border-1 border-primary form-control" />
		<br />
		
		<label class="d-inline">Password</label><br /><input type="password" placeholder="password"
		 onChange={(e)=>setPassword(e.target.value)} value={password} className="d-inline border-1 border-primary form-control" />
		<br/>
		<label>Don't have an account?</label>&nbsp;<a href="http://mnipdvkammari:3001/signup">Sign up</a>
		<br/>
		<button onClick={login} className="btn btn-primary " >Login</button>&nbsp;&nbsp;&nbsp;<button onClick={(e)=>(setUser(""),setPassword(""))} className="btn btn-danger" >clear</button>
		</div>
		</div>
            </div>
          </div>
        </div>
		)
		}
		
Login.propTypes = {
	setToken : PropTypes.func.isRequired
}
export default Login;