import React from 'react';
import editUser from './images/editImage.png';
import deleteUser from './images/removeImage.png';

class UserData extends React.Component{
	constructor(props){
		super(props);
		this.state={
			display_Inner: false,
			old_username: "",
			username: "",
			type:"",
			name:""
		}
		this.editUserDetails = this.editUserDetails.bind(this)
		this.submit = this.submit.bind(this);
		this.deleteUser = this.deleteUser.bind(this);
	}
	async deleteUser(){
		this.setState({old_username: this.props.username})
		const url = "http://mnipdrbhavanam:8888/lsforum/login/deleteuser?username="+this.state.old_username
		
		await fetch(url,{
			method:'GET',
			mode:'cors',
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json"
			},
			body: JSON.stringify()
		})
		this.setState({display_Inner: false})
		//console.log(url)
		window.location.reload()
	}
	editUserDetails(){
		/*sessionStorage.setItem("display_edit","0")
		sessionStorage.setItem("username_edit",this.props.username) */
		this.setState({display_Inner: true})
		this.setState({username: this.props.username})
		this.setState({old_username: this.props.username})
		this.setState({type: this.props.type})
		this.setState({name: this.props.name})
	}
	async submit(){
		try {
            await fetch('http://mnipdrbhavanam:8888/lsforum/login/edituserdetails',{
                method: 'post',
                mode:'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept':'application/json'
                },
                body:JSON.stringify({
                    username : this.state.username,
					oldusername : this.state.old_username,
					type : this.state.type,
					fullname : this.state.name
                })
            });
			window.location.reload()
        }catch(e) {
            //console.log(e)
        }
		this.setState({display_Inner: false})
	}
	componentDidMount(){
		this.setState({old_username: this.props.username})
	}
	render(){
		return(
			<div class="container">
			<div class="row">
			<div class="col-sm-4">
			<input type="image" alt="Edit User Image" src={editUser} onClick={this.editUserDetails}/>&nbsp;<input type="image" alt="Delete User Image" src={deleteUser} onClick={this.deleteUser}/>&nbsp;<p class="inline">{this.props.index}. {this.props.username}</p>
			</div>
			<div class="col-sm-4">
			<p class="inline">{this.props.name}</p></div>
			<div class="col-sm-4">
			<p class="inline">{this.props.type}</p></div>
			</div>
			{this.state.display_Inner && 
			<div class="container">
			<div class="row">
			<div class="col-sm-8">
			<div >
			  <div class="form-group">
				<h6>Edit</h6>
			    <label  class="d-inline">Username :</label>&nbsp;&nbsp;&nbsp;&nbsp;<input className="border-1 border-primary form-control d-inline col-sm-2" placeholder="username" type="text" value={this.state.username}  onChange={(e)=>this.setState({username: e.target.value})} />
			  </div>
			  <br />
			  <div class="form-group">
			    <label  class="d-inline">Fullname :</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input className="border-1 border-primary form-control d-inline col-sm-2" placeholder="username" type="text" value={this.state.name}  onChange={(e)=>this.setState({name: e.target.value})} />
			  </div>
			  <br />
			  <div class="form-group">
			    <label  class="d-inline">Type :</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				<select value={this.state.type} class="d-inline form-select border-1 border-primary form-control sm" onChange={(e)=>this.setState({type: e.target.value})} name="type">
					<option>select</option>
                    <option value="user">user</option>
                    <option value="moderator">moderator</option>
              </select>			  </div>
			  <br />
			  <button onClick={this.submit} className="btn btn-primary">Commit Changes</button>&nbsp;&nbsp;&nbsp;<button onClick={this.deleteUser} className="btn btn-danger" >Delete User</button>
			</div>
			</div>
			<div class="col-sm-4">
			</div>
			</div>
			</div>}
			</div>
		)
	}
}
export default UserData;