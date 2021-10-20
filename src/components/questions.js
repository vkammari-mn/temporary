import React, {Component} from 'react';
import Question_text from './question-text.js';
import Answers from './answers';
class Questions extends Component {
	constructor(props){
		super(props);
		this.state={
			display_qb :true,
			display_ab :true,
			qArr: [],
			question :"",
			answer_display : false,
			answer : "",
			topic : ""
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
		this.displaymodQuestions = this.displaymodQuestions.bind(this);
	}
	async displayQuestions(){
		const url = "http://mnipdrbhavanam:8888/lsforum/login/questions"
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
			const username = v['username']
			const topic = v['topic']
			const date = v['dateOfPosted']
			this.setState({[qid]: false})
			this.setState({inp : [question,qid,username,topic,date]})
			let {qArr, inp} = this.state
			qArr.push(inp)
		}
		console.log(this.state.qArr)
		//window.location.reload()
		var update = {}
		update["1wqwq"] = true
		this.setState(update)
	}
	async displaymodQuestions(){
		const url = "http://mnipdrbhavanam:8888/lsforum/login/mquestions"
		let result = await fetch(url,{
			method:'POST',
			mode:'cors',
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json"
			},
			body: JSON.stringify({
				topic: sessionStorage.getItem("modTopics")
			})
		})
		const q = await result.json()
		for (let i in q){
			const v = q[i]
			const question = v['question']
			const qid = v['qid']
			const username = v['username']
			const topic = v['topic']
			const date = v['dateOfPosted']
			console.log(date)
			this.setState({[qid]: false})
			this.setState({inp : [question,qid,username,topic,date]})
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
	componentDidMount() {
		if(sessionStorage.getItem("mquestion")==="false")
		{
			this.displayQuestions()
		}
		else{
			this.displaymodQuestions()
		}
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
		let result = await fetch(url,{
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
	render(){
		return(
			<div>
			{this.state.display_qb && <div>
			{this.state.display_qb && <div>{!this.state.answer_display && <input type="button" value="Post A Question" onClick={this.qb_act} class="btn-danger but-pos btn-lg" />}</div>}
			
		      {!this.state.answer_display && <div><h1 >Questions</h1>
			<br />
			<ul>
			  {this.state.qArr.map((item,index)=>{
				return <div key={index}>{<Question_text data={item[0]} qid={item[1]} user={item[2]} topic={item[3]} date={item[4]} no={index+1} cclick={this.delete} iclick={this.removeQuestion} aclick={this.returnAnswer}/>}
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
			</div>
		);
	}
}

export default Questions;