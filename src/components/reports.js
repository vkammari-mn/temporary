import React, {Component} from 'react';
import Question_text from './question-text.js';
import Answers from './answers';
import '../App.css';
import '../layout.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AnswerData from './answer-text.js';
class Reports extends Component {
	constructor(props){
		super(props);
		this.state={
			display_qb :true,
			display_ab :true,
			qArr: [],
			question :"",
			answer_display : false,
			answer : "",
			topic : "",
			display_answerReport: false,
			answers : []
		}
		this.delete = this.delete.bind(this);
		this.qb_act = this.qb_act.bind(this);
		this.ab_act = this.ab_act.bind(this);
		this.displayQuestions = this.displayQuestions.bind(this);
		this.returnAnswer = this.returnAnswer.bind(this);	
		this.postQuestion = this.postQuestion.bind(this);	
		this.postAnswer = this.postAnswer.bind(this);
		this.eraseQuestion = this.eraseQuestion.bind(this);
		this.eraseAnswer = this.eraseAnswer.bind(this);
		this.removeQuestion = this.removeQuestion.bind(this);
		this.repAnswers = this.repAnswers.bind(this);
		this.repQuestions = this.repQuestions.bind(this);
	}
	async displayQuestions(){
		const url = "http://mnipdrbhavanam:8888/lsforum/login/reportedquestions"
		
		let result = await fetch(url,{
			method:'GET',
			mode:'cors',
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json"
			},
			body: JSON.stringify()
		})
		const q = await result.json()
		for (let i in q){
			const v = q[i]
			const question = v['question']
			const qid = v['qid']
			const postedUsername = v['postedUsername']
			const reportedUsername = "Reported By :"+v['reportedUsername']+"-"+v['reportedDate']
			const topic = v['topic']
			const date = v['dateOfPosted']
			const reporteddate = v['reportedDate']
			this.setState({[qid]: false})
			this.setState({inp : [question,qid,postedUsername,topic,date,reportedUsername,reporteddate]})
			let {qArr, inp} = this.state
			qArr.push(inp)
		}
		var update = {}
		update["1wqwq"] = true
		this.setState(update)
	}
	
	delete(event){
		this.setState({[event.target.value]:false})
	}
	qb_act(){
		this.setState({
			display_qb : false
		})
		//console.log(this.state.question)
	}
	ab_act(){
		this.setState({
			display_ab : false
		})
	}
	async componentDidMount() {
		this.displayQuestions()
		const token = sessionStorage.getItem("token")
		const url = "http://mnipdrbhavanam:8888/lsforum/login/userdetails?token="+token
		let result = await fetch(url,{
			method:'GET',
			mode:'cors',
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json"
			},
			body: JSON.stringify()
		})
		const res = await result.json()
		if(!res.username){
			console.log("pls login")
			sessionStorage.removeItem("token")
			alert("please login")
			window.location.href = "http://mnipdvkammari:3000/login"
		}
		const url1 = "http://mnipdrbhavanam:8888/lsforum/login/reportedanswers"
		//console.log(this.props.qid)
		let result1 = await fetch(url1,{
			method:'GET',
			mode:'cors',
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json"
			},
			body: JSON.stringify()
		})
		const answer = await result1.json()
		for (let i in answer){
			const p = answer[i]
			const ans = p['answer']
			const aid = p['aid']
			const postedusername = p['postedUsername']
			const reportedusername = "Reported By: "+p['reportedUsername']+"-"+p['reportedDate']
			const posteddate = p['dateOfPosted']
			const question = p['question']
			//console.log(p)
			this.setState({pre : [ans,aid,postedusername,posteddate,reportedusername,question]})
			let {answers, pre} = this.state
			answers.push(pre)
		}
		var update = {}
		update["1wqwq"] = true
		this.setState(update)
		
		//console.log(this.state.)
	}
	returnAnswer(event) {
		//console.log(this.state[event.target.value])
		//this.setState({[event.target.value]:true})
		sessionStorage.setItem("qid",event.target.value)
		this.setState({answer_display : true})
		sessionStorage.setItem("question",event.target.name)
		//console.log(this.state[event.target.value])
		//this.setState({anw : true})
		//console.log(event.target.value)
		
	}
	async postQuestion() {
		//console.log("in",this.state.question)
		if(this.state.question === ""){
			alert("enter a question")
			this.setState({display_qb: true})
		}
		else{
		try {
            await fetch('http://mnipdrbhavanam:8888/lsforum/login/EnterQuestion',{
                method: 'post',
                mode:'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept':'application/json'
                },
                body:JSON.stringify({
					question: this.state.question,
					topic: this.state.topic,
					username: sessionStorage.getItem("username"),
					dateOfPosted : "",
					rating : 0
                })
            });
			//console.log(result.json())
            
        }catch(e) {
            console.log(e)
        }
		this.eraseQuestion()
		this.setState({topic: ""})
		this.setState({display_qb: true})
		}
		window.location.reload()
	}
	eraseQuestion(){
		this.setState({question:""})
	}
	eraseAnswer(){
		this.setState({answer:""})
	}
	async postAnswer() {
		//console.log("in",this.state.question)
		//console.log(this.state.answer)
		try {
            await fetch('http://mnipdrbhavanam:8888/lsforum/login/EnterAnswer',{
                method: 'post',
                mode:'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept':'application/json'
                },
                body:JSON.stringify({
					answer : this.state.answer,
					username: sessionStorage.getItem("username"),
					qid: sessionStorage.getItem("qid"),
					dateOfPosted : "",
					rating : 0,
					aid : 0
                })
            });
			//console.log(result.json())
			this.setState({answer: ""})
            
        }catch(e) {
            console.log(e)
        }
		window.location.reload()
		//this.eraseAnswer()
	}
	async removeQuestion(event){
		//sessionStorage.setItem("qid",event.target.value)
		const qid = event.target.value
		const url = "http://mnipdrbhavanam:8888/lsforum/login/deletequestion?qid="+qid
		await fetch(url,{
			method:'GET',
			mode:'cors',
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json"
			},
			body: JSON.stringify()
		})
		//sessionStorage.setItem("mquestion","true")
		window.location.reload()
		/*const res = await result.json()
		console.log("hello")
		window.location.reload()*/
	}
	home(){
		window.location.href = "http://mnipdvkammari:3000/home"
	}
	about(){
		window.location.href = "http://mnipdvkammari:3000/about"
	}
	async logoutTime(){
		const token = sessionStorage.getItem("token")
		console.log(token)
		const url = "http://mnipdrbhavanam:8888/lsforum/login/logouttime?token="+token
		await fetch(url,{
			method:'GET',
			mode:'cors',
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json"
			},
			body: JSON.stringify()
		})
	}
	repQuestions(){
		this.setState({display_answerReport: false})	
		window.location.reload()
	}
	repAnswers(){
		this.setState({display_answerReport: true})
		//console.log(this.state.answers)
	}
	render(){
		return(
			<div className="layout">
			<nav class="navbar navbar-default">
			  <div class="container-fluid">
			    <div class="navbar-header">
			      {/*<a class="navbar-brand" href="#">Logo</a>*/}
			    </div>
			      <ul class="nav navbar-nav navbar-right">
			        <li><a href="http://mnipdvkammari:3000/login" onClick={this.logoutTime}><span class="glyphicon glyphicon-log-in"></span> Logout</a></li>
			      </ul>
			  </div>
			</nav>
			  
			<div class="container-fluid">    
			  <div class="row content">
			    <div class="col-sm-2 sidenav">
				  <input type="button" value="Home" class="btn-info btn-lg bttn" onClick={this.home}/>
				  <br />
				  <br /> 
				  <input type="button" value="About" class="btn-info btn-lg bttn" onClick={this.about}/>
				  <br />
				  <br />
				  <input type="button" value="Questions" class="btn-info btn-lg bttn" onClick={this.repQuestions}/>
				  <br />
				  <br />
				  <input type="button" value="Answers" class="btn-info btn-lg bttn" onClick={this.repAnswers}/>
				  <br />
				  <br />
			    </div>
			    <div class="col-sm-10 text-left"> 
					{!this.state.display_answerReport && <div>
			{this.state.display_qb && <div>
			{/*this.state.display_qb && <input type="button" value="Post A Question" onClick={this.qb_act} class="btn-danger but-pos btn-lg" />*/}
		      {!this.state.answer_display && <div><h1>Reported Questions</h1>
			<br />
			<ul>
			  {this.state.qArr.map((item,index)=>{
				return <div key={index}>{<Question_text data={item[0]} qid={item[1]} user={item[2]} reporteduser={item[5]} reporteddate={item[6]} topic={item[3]} date={item[4]} no={index+1} bool="true" cclick={this.delete} iclick={this.removeQuestion} aclick={this.returnAnswer}/>}
				</div>
			})}
			</ul>
			</div>}
			{this.state.answer_display && <div>
			<h3>{sessionStorage.getItem("question")}</h3>
			<Answers qid={sessionStorage.getItem("qid")}/>
			{/*this.dummy_ravi()*/}
			{this.state.display_ab && <input type="button" value="post answer" onClick={this.ab_act} class="btn-danger btn-lg" />}
			<br/>
			{!this.state.display_ab && <div><textarea type = "textarea" placeholder="Enter your answer" onChange={(e)=>this.setState({answer:e.target.value})} value={this.state.answer} class="form-group btn-lg"/>&nbsp;<input type="button" value="Add Answer" onClick={this.postAnswer} class="btn-danger btn-lg but-pos"/></div>}
			</div>}
			</div>}
			{!this.state.display_qb && <div><div><h3>Add Question</h3></div><br/><div><textarea type = "text" placeholder="Enter your question" onChange={(e)=>this.setState({question:e.target.value})} value={this.state.question} class="btn-lg form-group border-1 border-primary"/><br /><br /><input type = "text" placeholder="Topic for your question" onChange={(e)=>this.setState({topic:e.target.value})} value={this.state.topic} class="border-1 border-primary btn-lg form-group"/><input type="button" value="Add Question" onClick={this.postQuestion} class="btn-danger but-pos btn-lg"/></div></div>}
			</div>}
			{this.state.display_answerReport && <div>
			<h1>Reported Answers</h1>
			<br />
			  		{this.state.answers.map((item,index)=>{
				return <div key={index}><AnswerData answerText={item[0]} aid={item[1]}
				user={item[2]} dateOfPosted={item[3]} no={index+1} reportedUsername={item[4]} bool="true" question={item[5]}/>
						</div>
					})}
			</div>}
			    </div>
			    <div class="col-sm-2 sidenav">
			    </div>
			  </div>
			</div>
		</div>
		);
	}
}

export default Reports;