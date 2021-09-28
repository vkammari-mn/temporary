/**
 * Created by vkammari on 9/5/21.
 */
import React, {Component} from 'react';

class Text_comp extends Component {
    constructor(props){
        super(props);
    }
    render()
    {
        return(
            <div class="form-group fw-bold" >
                <label for={this.props.id}>{this.props.lbl}</label>
                <input type={this.props.typ} value={this.props.val} id={this.props.id} class={this.props.cls} onChange={this.props.change} onClick={this.props.click}/>
            </div>
        );
    }
}

export default Text_comp;