import React, {Component} from 'react';
import AnswerData from './answer-text.js';

class Answers extends Component {
	constructor(props){
		super(props)
		this.state = {
			answers: []
		}
	}
	async componentDidMount(){
		const url = "http://mnipdrbhavanam:8888/lsforum/login/answer?qid="+this.props.qid
		//console.log(this.props.qid)
		let result = await fetch(url,{
			method:'GET',
			mode:'cors',
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json"
			},
			body: JSON.stringify()
		})
		const answer = await result.json()
		for (let i in answer){
			const p = answer[i]
			const ans = p['answer']
			const aid = p['aid']
			const username = p['username']
			const date = p['dateOfPosted']
			console.log(p)
			this.setState({pre : [ans,aid,username,date]})
			let {answers, pre} = this.state
			answers.push(pre)
			//console.log(ans,aid)
		}
		//console.log(this.state.answers)
	}
	render(){
		return(
			<div>
			<br />
			  		{this.state.answers.map((item,index)=>{
				return <div key={index}><AnswerData answerText={item[0]} aid={item[1]}
				user={item[2]} dateOfPosted={item[3]} no={index+1}/>
						</div>
					})}
			</div>
		)
	}
}
export default Answers;