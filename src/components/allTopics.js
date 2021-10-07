import React,{Component} from 'react';

class AllTopics extends Component{
	constructor(props){
		super(props);
		this.state={
			topics : [],
			selectTopics : [],
			dummy : "Sdsd"
		}
		this.addTopic = this.addTopic.bind(this)
	}
	async componentDidMount(){
		const url = "http://mnipdrbhavanam:8888/lsforum/login/topics"
		
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
			const topic = v['topic']
			this.setState({inp : [topic]})
			let {topics, inp} = this.state
			topics.push(inp)
		}
		var update = {}
		update["1wqwq"] = true
		this.setState(update)
		//console.log(this.state.topics)
	}
	/*addTopic(event){
		const name = event.target.name;
		const value = event.target.value;
		//console.log(this.state.selectTopics)
		this.setState({inpp : [value]})
		//console.log(this.state)
		let {selectTopics,inpp} = this.state 
		selectTopics.push(inpp)
		console.log(this.state.selectTopics)
		//console.log(this.state.selectTopics)
	}*/
	addTopic(event){
		var opt = event.target.options
		var select = []
		for(var i = 0;i<opt.length;i++){
			if(opt[i].selected){
				select.push(opt[i].value)
			}
		}
		//console.log(select)
		sessionStorage.setItem("topics",select)
	}
	render(){
		return(
		<div>
			<label class="d-inline">Choose Topics</label>
			<br/>
            <select class="d-inline border-1 border-primary form-select form-control" multiple onChange={this.addTopic} name="topics">            
            {this.state.topics.map((item, index) => <option value={item[0]} id={index}>{item[0]}</option>)}
            </select>
        </div>			 
		)
	}
}

export default AllTopics