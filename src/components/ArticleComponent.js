import React from 'react';

class ArticleComponent extends React.Component{
	constructor(props){
		super(props);
		this.state={
			display : false
		}
		this.change = this.change.bind(this)
	}
	change(){
		this.setState({display: true})
	}
	render(){
		return(
			<div>
			<div class="row">
			<div class="col-sm-12">
			{/*<input type="image" src={editQuestion} onClick=""/>&nbsp;&nbsp;*/}
			<h4>{this.props.no}. {this.props.title}</h4>
			{this.state.display && <pre><h6>{this.props.data}</h6></pre>}
			<br />
			{!this.state.display && <button onClick={this.change} class="btn-primary btn-sm">Show article</button>}	
			</div>
			<div class="col-sm-1">
			
			</div>
			<div class="col-sm-1">
			</div>
			</div>
			<div class="row">
			<div class="col-sm-3">
			</div>
			<div class="col-sm-3"></div>
			<div class="col-sm-6 text-end"><small class="text-danger">Posted by: {this.props.user}-{this.props.date}</small></div>
			</div>
			</div>
		)
	}
}

export default ArticleComponent;