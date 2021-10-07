import React,{useState, useEffect} from 'react';
import validation from "./validation";
import 'bootstrap/dist/css/bootstrap.min.css';
import AllTopics from "./components/allTopics.js"

const SignUp = () => {

    const [userRegistration, setUserRegistration] = useState({
        username: "",	
        email: "",
        phone: "",
        password: "", 
		type: "user",
		fullname : ""
 
    });
	useEffect(() => {
		sessionStorage.removeItem("topics")
		/*sessionStorage.removeItem("type")
		sessionStorage.removeItem("question")
		sessionStorage.removeItem("token")
		sessionStorage.removeItem("username")*/
		//setType("user")
		//console.log(type)
	});
     //name,value
    const[errors, setErrors] = useState({})

    const [records, setRecords] = useState([]);

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        //console.log(name, value);
        
        setUserRegistration({ ...userRegistration, [name]: value });
		setErrors({ ...errors,[name]: ""});
    }
    async function postData() {
        try {
            let result = await fetch('http://mnipdrbhavanam:8888/lsforum/login/Entry',{
                method: 'post',
                mode:'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept':'application/json'
                },
                body:JSON.stringify({
                    username : userRegistration.username,	
					fullname : userRegistration.fullname,
                    password : userRegistration.password,
                    email : userRegistration.email,
                    phone : userRegistration.phone,
					type : userRegistration.type,
					topics : sessionStorage.getItem("topics")
                })
            });
			//const res = result.json()
			if(result.status == 200){
				alert("user created!, do login")
				window.location.href = "http://mnipdvkammari:3000/login"
			}
            
        }catch(e) {
            //console.log(e)
        }

	}
    const handleSubmit = (e) => {
        e.preventDefault();
		//console.log(userRegistration)
        setErrors(validation(userRegistration))
		const errors = validation(userRegistration) 
		console.log("submit")
		console.log(errors)
		if(errors.username || errors.fullname || errors.password || errors.email || errors.phone){
			console.log("else")
			//alert("Re-enter details")
			setUserRegistration("")
			//setErrors("")
		}
		else{
			postData();
		}
		
    }

    return (
        <div className="split col-sm-4 offset-sm-4">
			<br />
			<h2>Sign Up</h2>
			<br/>
			
            <form action="" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username" class="d-inline">Username :</label>&nbsp;&nbsp;&nbsp;<input className="border-1 border-primary form-control d-inline col-sm-2" placeholder="username" type="text" value={userRegistration.username}  onChange={handleInput} name="username" id="username"/>
                     {errors.username && <p className="text-danger">{errors.username}</p>}
                </div>
				<br />
				<div className="form-group">
                    <label htmlFor="fullname" class="d-inline">Full Name :</label>&nbsp;&nbsp;&nbsp;<input className="border-1 border-primary form-control d-inline col-sm-2" placeholder="fullname" type="text" value={userRegistration.fullname}  onChange={handleInput} name="fullname" id="fullname"/>
                     {errors.fullname && <p className="text-danger">{errors.fullname}</p>}
                </div>
				<br />
                <div>
                    <label htmlFor="email" class="d-inline">Email : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label><input className="border-1 border-primary form-control d-inline col-sm-2" placeholder="email" type="text" autoComplete="off" value={userRegistration.email} onChange={handleInput} name="email" id="email"/>
                     {errors.email && <p className="text-danger">{errors.email}</p>}
                </div>
				<br />
                <div>
                    <label htmlFor="phone" class="d-inline">Phone : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label><input className="d-inline border-1 border-primary form-control" placeholder="phone number"type="text" autoComplete="off" value={userRegistration.phone} onChange={handleInput} name="phone" id="phone"/>
                     {errors.phone && <p className="text-danger">{errors.phone}</p>}
                </div>
 				<br />
                <div>
                    <label htmlFor="password" class="d-inline">Password : &nbsp;&nbsp;&nbsp;</label>
                    <input className="border-1 border-primary form-control d-inline" placeholder="password" type="password" autoComplete="off" value={userRegistration.password} onChange={handleInput} name="password" id="password"/>
                     {errors.password && <p className="text-danger">{errors.password}</p>}
                </div>
				<br />
				<label class="d-inline">User :</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			  <select class="d-inline form-select border-1 border-primary form-control sm" onChange={handleInput} name="type">
					<option>select</option>
                    <option value="user">user</option>
                    <option value="moderator">moderator</option>
                    <option value="admin">admin</option>
              </select>
			  <br />
	<br />
			  {userRegistration.type === "moderator" && <div>
			  <AllTopics />
			  </div>}
				<br />
				<br />
				<p class="d-inline">Already have an account!</p>&nbsp;&nbsp;<a class="d-inline" href="http://mnipdvkammari:3000">Login</a>
				<br />
				<br />
                <button type="submit" class="btn-sm btn-primary">Registration</button> &nbsp;&nbsp;
                <button type=	"reset" class="bnt-sm btn-danger" onClick={()=>(setUserRegistration(""),setErrors(""))}>Cancel</button> 
            </form>
            <div>
                {
                    records.map((curElem) => {
                        const { id, username, email, phone, password } = curElem;
                        return (
                            <div className="showDataStyle" key={id} >
                                <p>{username}</p>
                                <p>{email}</p>
                                <p>{phone}</p>
                                <p>{password}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )   
}

export default SignUp