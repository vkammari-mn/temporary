import React, {Component} from 'react';

class Question_text extends Component {
	constructor(props){
		super(props);
		/*this.state={
			q1: 'first question',
			q2: 'second queion',
			q3: 'third question',
			q4: 'fourth question',
			q5: 'fifth qusetion'
			{`qArr[${this.props.no-1}]`}
		}*/
	}
	/*delete(event){
		var update	= {};
		update[event.target.id]="";
		this.setState(update);
	}*/
	render(){
		return(
			<div>
		      <label>{this.props.no}. {this.props.data}</label> <button onClick={this.props.rclick} value={this.props.qid} class="btn-sm btn-primary but-pos">Close </button> <button onClick={this.props.bclick} value={this.props.qid} class="btn-sm but-pos btn-success">Answers </button>
			<br />
			<br />
			</div>
		);
	}
}

export default Question_text;