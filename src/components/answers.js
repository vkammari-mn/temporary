import React, {Component} from 'react';

class Answers extends Component {
	constructor(props){
		super(props)
		this.state = {
			answers: []
		}
	}
	async componentDidMount(){
		const url = "http://mnipdrbhavanam:8088/LSForum/login/answer?qid="+this.props.qid
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
			this.setState({pre : [ans,aid]})
			let {answers, pre} = this.state
			answers.push(pre)
			//console.log(ans,aid)
		}
		//console.log(this.state.answers)
	}
	render(){
		return(
			<div>
				<ul>
			  		{this.state.answers.map((item,index)=>{
				return <p key={index} class="d-inline"><li><label id={index}>{item[0]}</label></li>
						</p>
					})}
			</ul>
			</div>
		)
	}
}
export default Answers;