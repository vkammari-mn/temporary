import React, { useState, useEffect} from 'react';
import PropTypes from 'prop-types';

function Login() {
	const [user,setUser]=useState('');
	const [password, setPassword]=useState(''); 
	//const [type, setType] = useState('');
	/*const hist = useHistory();
	useEffect (() => { if (localStorage.getItem('user-info')) {
	hist.push("/add")
	}
	}, [])*/
	
	useEffect(() => {
		sessionStorage.removeItem("qid")
		sessionStorage.removeItem("type")
		sessionStorage.removeItem("question")
		sessionStorage.removeItem("token")
		sessionStorage.removeItem("username")
		//setType("user")
		//console.log(type)
	});
	
	async function login(){
		//console.warn(user,password);
		if(user == "" || password ==  ""){
			alert("please enter username or password")
			return;
		}
		const url = "http://mnipdrbhavanam:8888/lsforum/login/Validation?username="+user+"&password="+password
		
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
		console.log(res.token,res)
		if(res.token){
			//alert('valid')
			sessionStorage.setItem("token",res.token)
			sessionStorage.setItem("username",res.username)
			sessionStorage.setItem("type",res.type)
			sessionStorage.setItem("modTopics",res.topic)
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
		<label class="d-inline">Usser</label><br /><input type="text" placeholder="user" onChange={(e)=>setUser(e.target.value)} value={user} className="d-inline border-1 border-primary form-control" required/>
		<br />
		
		<label class="d-inline">Password</label><br /><input type="password" placeholder="password"
		 onChange={(e)=>setPassword(e.target.value)} value={password} className="d-inline border-1 border-primary form-control" required/>
		<br/>
		{/*<label class="d-inline">User Type</label>
		<br/>
		<select class="d-inline border-1 border-primary form-select form-control sm" onChange={(e)=>setType(e.target.value)} name="type">
                    <option value="">select</option>
					<option value="user">user</option>
                    <option value="moderator">moderator</option>
                    <option value="admin">admin</option>
       </select>*/}
		<br />
		<label>Don't have an account?</label>&nbsp;&nbsp;<a href="http://mnipdvkammari:3000/signup">Sign up</a>
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