import React, {Component} from 'react';
import editQuestion from './images/editImage.png';
import deleteQuestion from './images/removeImage.png';
import SingleTopic from './singleTopic.js';
import reportQuestion from './images/reportImage.png';
class Question_text extends Component {
	constructor(props){
		super(props);
		this.state={
			displayQuestionEdit:false
		}
		this.questionClickEdit = this.questionClickEdit.bind(this)
		this.commitChanges = this.commitChanges.bind(this)
		this.reportQuestion = this.reportQuestion.bind(this)
	}
	questionClickEdit(){
		this.setState({displayQuestionEdit : true})
		this.setState({username : this.props.user})
		this.setState({question : this.props.data})
		this.setState({topic : this.props.topic})
		this.setState({qid: this.props.qid})
		//console.log(this.props)
		sessionStorage.setItem("topics",this.props.topic)
	}
	async commitChanges(){
		try {
            let result = await fetch('http://mnipdrbhavanam:8888/lsforum/login/editquestion',{
                method: 'post',
                mode:'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept':'application/json'
                },
                body:JSON.stringify({
                    question : this.state.question,
					qid : this.state.qid,
					topic: sessionStorage.getItem("topics")
                })
            });

            
        }catch(e) {
        }
		this.setState({display_Inner: false})
		//sessionStorage.setItem("mquestion","false")
		window.location.reload()
	}
	async reportQuestion(){
		try {
            let result = await fetch('http://mnipdrbhavanam:8888/lsforum/login/reportquestion',{
                method: 'post',
                mode:'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept':'application/json'
                },
                body:JSON.stringify({
                    postedUsername:this.props.user,
					reportedUsername:sessionStorage.getItem("username"),
					qid:this.props.qid,
					topic:this.props.topic
                })
            });
            
        }catch(e) {
        }
		alert("Question Reported")
	}
	render(){
		return(
			<div class="pad">
			<div><div class="row">
			<div class="col-sm-8	">
			{/*<input type="image" src={editQuestion} onClick=""/>&nbsp;&nbsp;*/}
			<pre><h6>{this.props.no}. {this.props.data}</h6></pre>
					
			</div>
			<div class="col-sm-3">
			
			</div>
			<div class="col-sm-1">
			<button onClick={this.props.aclick} name={this.props.data} value={this.props.qid} class="btn-sm but-pos btn-success">Answers </button>
			</div>
			</div>
			<div class="row">
			<div class="col-sm-6">
			{sessionStorage.getItem("type") === "admin" && <input title="Edit Question" type="image" src={editQuestion} onClick={this.questionClickEdit}/>}{sessionStorage.getItem
			("mquestion") === "true" && <input title="Edit Question" type="image" src={editQuestion}  onClick={this.questionClickEdit}/>}&nbsp;{sessionStorage.getItem("type") === "admin" && <input type="image" title="Delete Question" src = {deleteQuestion} value={this.props.qid} onClick={this.props.iclick}></input>}&nbsp;{sessionStorage.getItem
			("mquestion") === "true" && <input type="image" title="Delete Question" src = {deleteQuestion} value={this.props.qid} onClick={this.props.iclick}/>}&nbsp;&nbsp;
			{this.props.bool != "true" &&<input type="image" title="Report Question" src={reportQuestion} onClick={this.reportQuestion} />}
			</div>
			<div class="col-sm-3"><small class="text-danger">{this.props.reporteduser}</small></div>
			<div class="col-sm-3 text-end"><small class="text-danger ">Asked by: {this.props.user}-{this.props.date}</small></div>
			</div>
			</div>
			<br />
			{this.state.displayQuestionEdit && 
			<div class="container">
			<div class="row">
			<div class="col-sm-8">
			<hr />
			<div >
			  <div class="form-group">
				<h6>Edit</h6>
			    <label  class="d-inline">Question :</label>&nbsp;&nbsp;&nbsp;&nbsp;<input className="border-1 border-primary form-control d-inline col-sm-2" placeholder="question" type="text" value={this.state.question}  onChange={(e)=>this.setState({question: e.target.value})} />
			  </div>
		<br />
		<p>Current Topic : {this.state.topic}</p>
		<SingleTopic />
			  
			  <br />
			  {this.props.bool != "true" && <button onClick={this.commitChanges} className="btn btn-primary">Commit Changes</button>}
			  {this.props.bool == "true" && <button onClick={this.commitChanges} className="btn btn-primary">Save and remove report</button>}
			<hr />
			</div>
			</div>
			<div class="col-sm-4">
			</div>
			</div>
			</div>}
			</div>
		);
	}
}

export default Question_text;