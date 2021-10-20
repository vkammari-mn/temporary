import React from 'react';
import ArticleComponent from './ArticleComponent';
class DisplayArticles extends React.Component{
	constructor(props){
		super(props)
		this.state={
			writearticle: false,
			article: "",
			topic: "",
			title: "",
			articleArr: []
		}
		this.writeArticle = this.writeArticle.bind(this)
		this.postArticle = this.postArticle.bind(this)
		this.displayArticles = this.displayArticles.bind(this)
	}
	async displayArticles(){
		const url = "http://mnipdrbhavanam:8888/lsforum/login/articles"
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
			const article = v['article']
			const articleid = v['articleid']
			const username = v['username']
			const topic = v['topic']
			const date = v['dateOfPosted']
			const title = v['title']
			this.setState({inp : [article,articleid,username,topic,date,title]})
			let {articleArr, inp} = this.state
			articleArr.push(inp)
		}
		console.log(this.state.qArr)
		//window.location.reload()
		var update = {}
		update["1wqwq"] = true
		this.setState(update)
	}
	componentDidMount(){
		this.displayArticles()
		console.log(this.state.articleArr)
	}
	writeArticle(){
		this.setState({writearticle: true})
	}
	async postArticle(){
		if(this.state.article === ""){
			alert("enter a article")
			this.setState({writearticle: false})
		}
		else{
		try {
            await fetch('http://mnipdrbhavanam:8888/lsforum/login/Enterarticle',{
                method: 'post',
                mode:'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept':'application/json'
                },
                body:JSON.stringify({
					article: this.state.article,
					topic: this.state.topic,
					username: sessionStorage.getItem("username"),
					title: this.state.title,
					dateOfPosted : "",
					rating : 0
                })
            });
			//console.log(result.json())
            
        }catch(e) {
            console.log(e)
        }
		this.setState({topic: ""})
		this.setState({writearticle: false})
		}
		window.location.reload()
	}
	render(){
		return(
			<div>{!this.state.writearticle && <div><input type="button" value="Post a Article" class="btn-danger but-pos btn-lg" onClick={this.writeArticle}/>
			<div><h1 >Articles</h1>
			<br />
			<ul>
			  {this.state.articleArr.map((item,index)=>{
				return <div key={index}>{<ArticleComponent data={item[0]} articleid={item[1]} user={item[2]} topic={item[3]} date={item[4]} title={item[5]} no={index+1}/>}
				</div>
			})}
			</ul>
			</div>
			</div>}
			{this.state.writearticle && <div><div><h3>Post Your Article</h3></div><br/><div><input type = "text" placeholder="Title for your article" onChange={(e)=>this.setState({title:e.target.value})} value={this.state.title} class="border-1 border-primary btn-lg form-group"/><br /><br /><textarea type = "text" placeholder="Enter your Article" onChange={(e)=>this.setState({article:e.target.value})} value={this.state.article} class="btn-lg form-group border-1 border-primary"/><br /><br /><input type = "text" placeholder="Topic for your article" onChange={(e)=>this.setState({topic:e.target.value})} value={this.state.topic} class="border-1 border-primary btn-lg form-group"/><input type="button" value="Post Article" onClick={this.postArticle} class="btn-danger but-pos btn-lg"/></div></div>}</div>
		)
	}
}

export default DisplayArticles;