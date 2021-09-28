import React, {Component} from 'react';
import Question_text from './question-text.js';
import Answers from './answers';
class Questions extends Component {
	constructor(props){
		super(props);
		this.state={
			display_tb :true,
			qArr: [],
			state:[],
			anw : [],
			question :""
		}
		this.delete = this.delete.bind(this);
		this.act = this.act.bind(this);
		this.displayQuestions = this.displayQuestions.bind(this);
		this.returnAnswer = this.returnAnswer.bind(this);	
		this.postQuestion = this.postQuestion.bind(this);	
		this.eraseQuestion = this.eraseQuestion.bind(this);
	}
	async displayQuestions(){
		const url = "http://mnipdrbhavanam:8088/LSForum/login/questions"
		
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
			this.setState({[qid]: false})
			this.setState({inp : [question,qid]})
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
	act(e){
		this.setState({
			display_tb : false
		})
		//console.log(this.state.question)
	}
	componentDidMount() {
		this.displayQuestions()
	}
	returnAnswer(event) {
		//console.log(this.state[event.target.value])
		this.setState({[event.target.value]:true})
		//console.log(this.state[event.target.value])
		//this.setState({anw : true})
		//console.log(event.target.value)
		
	}
	async postQuestion() {
		//console.log("in",this.state.question)
		try {
            let result = await fetch('http://mnipdrbhavanam:8088/LSForum/login/EnterQuestion',{
                method: 'post',
                mode:'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept':'application/json'
                },
                body:JSON.stringify({
					question: this.state.question,
					username: "vamshi",
					dateOfPosted : "22-09-2021",
					rating : 4
                })
            });
			console.log(result.json())
            
        }catch(e) {
            console.log(e)
        }
		this.eraseQuestion()
	}
	eraseQuestion(){
		this.setState({question:""})
	}
	render(){
		return(
			<div>
			{this.state.display_tb && <input type="button" value="Post A Question" onClick={this.act} class="btn-danger but-pos btn-sm" />}
			{!this.state.display_tb && <div><input type = "text" placeholder="Enter your question" onChange={(e)=>this.setState({question:e.target.value})} value={this.state.question} class="but-pos form-group"/>&nbsp;<input type="button" value="Add Question" onClick={this.postQuestion} class="btn-danger but-pos"/></div>}
		      <h1 >Questions</h1>
			<ul>
			  {this.state.qArr.map((item,index)=>{
				return <div key={index}>{<Question_text data={item[0]} qid={item[1]} no={index+1} rclick={this.delete} bclick={this.returnAnswer}/>}
				{/*<Answers qid={item[1]}/>*/}
				{this.state[item[1]] && <Answers qid={item[1]}/>}
				</div>
			})}
			</ul>
			</div>
		);
	}
}

export default Questions;