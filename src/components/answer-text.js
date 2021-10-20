import React from 'react';
import editAnswer from './images/editImage.png';
import deleteAnswer from './images/removeImage.png';
import reportAnswer from './images/reportImage.png';
class AnswerData extends React.Component{
	constructor(props){
		super(props);
		this.state={
			display_Inner: false,
			answer: "",
			answer_id: "",
			dummy:""
		}
		this.submit = this.submit.bind(this);
		this.editAnswer = this.editAnswer.bind(this);
		this.deleteAnswer = this.deleteAnswer.bind(this);
		this.commitChange = this.commitChange.bind(this);
		this.reportAnswer = this.reportAnswer.bind(this);
	}
	async deleteAnswer(){
		const url = "http://mnipdrbhavanam:8888/lsforum/login/deleteanswer?aid="+this.props.aid
		//console.log("SDsd")
		await fetch(url,{
			method:'GET',
			mode:'cors',
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json"
			},
			body: JSON.stringify()
		})
		this.setState({dumm:"sds"})
		window.location.reload()
	}
	async submit(){
		try {
            let result = await fetch('http://mnipdrbhavanam:8888/lsforum/login/edituserdetails',{
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
			await result.json()
			//console.log(result)
			/*if(result.status == 200){
				alert("user created!, do login")
				window.location.href = "http://mnipdvkammari:3000/login"
			}*/
            
        }catch(e) {
            //console.log(e)
        }
		this.setState({display_Inner: false})
	}
	editAnswer(){
		this.setState({display_Inner: true})
		this.setState({answer: this.props.answerText})
		this.setState({answer_id: this.props.aid})
		this.setState({username: this.props.user})
	}
	async commitChange(){
		try {
            let result = await fetch('http://mnipdrbhavanam:8888/lsforum/login/editanswer',{
                method: 'post',
                mode:'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept':'application/json'
                },
                body:JSON.stringify({
                    answer : this.state.answer,
					aid : this.state.answer_id
                })
            });
            
        }catch(e) {
            //console.log(e)
        }
		window.location.reload()
	}
	async reportAnswer(){
		try {
            await fetch('http://mnipdrbhavanam:8888/lsforum/login/reportanswer',{
                method: 'post',
                mode:'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept':'application/json'
                },
                body:JSON.stringify({
                    postedUsername:this.props.user,
					reportedUsername:sessionStorage.getItem("username"),
					aid:this.props.aid
                })
            });
            
        }catch(e) {
        }
		alert("Answer Reported")
	}
	render(){
		return(
			<div class="container">
			<div><div class="row">
			<div class="col-sm-12">
			<h5>{this.props.no}. {this.props.question}</h5>
			<pre ><p class="inline ">A:-{this.props.answerText}</p></pre>
			
			</div>
			<div class="col-sm-1">
			
			</div>
			<div class="col-sm-1">
			
			</div>
			</div>
			<div class="row">
			<div class="col-sm-5">
			{sessionStorage.getItem("type") != "user" && <div class="d-inline"><input type="image" src={editAnswer} title="Edit Answer" onClick={this.editAnswer}/>&nbsp;&nbsp;<input type="image" src={deleteAnswer} onClick={this.deleteAnswer} title="Delete Answer"/>
			</div>}&nbsp;&nbsp;{this.props.bool != "true" && <input type="image" src={reportAnswer} title="Report Answer" onClick={this.reportAnswer} />}
			</div>
			<div class="col-sm-3"><small class="text-danger">{this.props.reportedUsername}</small></div>
			<div class="col-sm-4">
			<div class="text-end"><small class="text-danger">Answered By: {this.props.user}- {this.props.dateOfPosted}</small></div></div>
			</div>
			</div>
			<br />
			{this.state.display_Inner && 
			<div class="container">
			<div class="row">
			<div class="col-sm-8">
			<hr />
			<div >
			  <div class="form-group">
				<h6>Edit</h6>
			    <label  class="d-inline">Answer :</label>&nbsp;&nbsp;&nbsp;&nbsp;<textarea className="border-1 border-primary form-control d-inline col-sm-2" placeholder="username" type="text" value={this.state.answer}  onChange={(e)=>this.setState({answer: e.target.value})} />
			  </div>
	{/*<AllTopics />*/}
			  
			  <br />
			  {this.props.bool != "true" && <button onClick={this.commitChange} className="btn btn-primary">Commit Changes</button>}
			  {this.props.bool == "true" &&<button onClick={this.commitChange} className="btn btn-primary">Save and remove report</button>}<hr />
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
export default AnswerData;