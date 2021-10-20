import React,{Component} from 'react';
import UserData from './user_data.js';
import SignUp from './SignUp.js';

class Users extends Component{
	constructor(props){
		super(props);
		this.state={
			userArray: [],
			createUser: false
		}
		this.get_users = this.get_users.bind(this)
		this.createUser = this.createUser.bind(this)
	}
	async get_users(){
		const url = "http://mnipdrbhavanam:8888/lsforum/login/username"
		
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
		for (let i in res){
			const v = res[i]
			const username = v['username']
			const fullname = v['fullname']
			const type = v['type']			
			//this.setState({[qid]: false})
			this.setState({inp : [username,fullname,type]})
			let {userArray, inp} = this.state
			userArray.push(inp)
		}
		var update = {}
		update["1wqwq"] = true
		this.setState(update)
		}
		componentDidMount(){
			this.get_users()
			sessionStorage.setItem("display_edit","1")
			//console.log(this.state.userArray)
		
		}
		createUser(){
			this.setState({createUser: true})
		}
	render(){
		return(
			<div>
			{ !this.state.createUser && <div>
			<ul>
			<div class="container">
			<div class="row">
			<button type="button" onClick={this.createUser} class="btn-sm btn-primary "><b>Create User</b></button>
			<div class="col-sm-4">
			&nbsp;&nbsp;&nbsp;&nbsp;<b class="inline">User-Name</b></div>
			<div class="col-sm-4">
			<b class="inline">Full-Name</b></div>
			<div class="col-sm-4">
			<b class="inline">User-Type</b></div>
			</div>
			</div>
			<br />
			  {this.state.userArray.map((item,index)=>{
				return <div key={index}><UserData index={index+1} username={item[0]} name={item[1]} type={item[2]}/>
				<br />
				</div>
			})}
			</ul>
			</div>}
			{this.state.createUser && <div>
			<SignUp admin="true" /></div>}
			</div>
		)
	}
}

export default Users