import React,{useState} from 'react';
import validation from "./validation";
import 'bootstrap/dist/css/bootstrap.min.css';


const SignUp = () => {

    const [userRegistration, setUserRegistration] = useState({
        username: "",
        email: "",
        phone: "",
        password: ""
    });
     //name,value
    const[errors, setErrors] = useState({})

    const [records, setRecords] = useState([]);

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        //console.log(name, value);
        
        setUserRegistration({ ...userRegistration, [name]: value });
    }
    async function postData() {
        try {
            let result = await fetch('http://mnipdrbhavanam:8088/LSForum/login/Entry',{
                method: 'post',
                mode:'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept':'application/json'
                },
                body:JSON.stringify({
                    username : userRegistration.username,
                    password : userRegistration.password,
                    email : userRegistration.email,
                    phone : userRegistration.phone
                })
            });
            
        }catch(e) {
            //console.log(e)
        }

	}
    const handleSubmit = (e) => {
        e.preventDefault();
		//console.log(userRegistration)
        setErrors(validation(userRegistration))
		if(Object.entries(errors).length === 0) {
			postData();
		}
		else{
			console.log("else")
			alert("Re-enter details")
			setUserRegistration("")
			setErrors("")
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
                     {errors.username && <p className="error">{errors.username}</p>}
                </div>
				<br />
                <div>
                    <label htmlFor="email" class="d-inline">Email : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label><input className="border-1 border-primary form-control d-inline col-sm-2" placeholder="email" type="text" autoComplete="off" value={userRegistration.email} onChange={handleInput} name="email" id="email"/>
                     {errors.email && <p className="error">{errors.email}</p>}
                </div>
				<br />
                <div>
                    <label htmlFor="phone" class="d-inline">Phone : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label><input className="d-inline border-1 border-primary form-control" placeholder="phone number"type="text" autoComplete="off" value={userRegistration.phone} onChange={handleInput} name="phone" id="phone"/>
                     {errors.phone && <p className="error">{errors.phone}</p>}
                </div>
 				<br />
                <div>
                    <label htmlFor="password" class="d-inline">Password : &nbsp;&nbsp;&nbsp;</label>
                    <input className="border-1 border-primary form-control d-inline" placeholder="password" type="password" autoComplete="off" value={userRegistration.password} onChange={handleInput} name="password" id="password"/>
                     {errors.password && <p className="error">{errors.password}</p>}
                </div>
				<br />
				<label class="d-inline">User :</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<select class="d-inline form-select form-control sm">
                    <option value="user">user</option>
                    <option value="moderator">moderator</option>
                    <option value="admin">admin</option>
              </select>
				<br />
				<br />
				<p class="d-inline">Already have an account!</p>&nbsp;&nbsp;<a class="d-inline" href="http://mnipdvkammari:3001/login">Login</a>
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