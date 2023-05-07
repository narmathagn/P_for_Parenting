import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Parent extends Component {
    constructor()
    {
        super();
        this.state = {disableButton:true,question:""}
    }
 
    questionContent(e)
    {
        if(e.target.value!="")
        {
            this.setState({disableButton:false,question:e.target.value})
        }
        else
        {
            this.setState({disableButton:true})
        }
    }
    submitQuestion()
    {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question: this.state.question })
        };
        fetch('http://localhost:8080/api/v1/parenting/ques', requestOptions)
            .then(response => response.json())
            .then(data =>{
                console.log(data);
                this.props.history.push('/');
            });
    }
    render() {
        return (
            <div className="leftalign" style={{ height: "800px", marginTop: "20px",marginBottom:"20px" }}>
                <span style={{ color: 'black', fontSize: 25,margin:'20px' }}>
                    Please ask your concern down below:
                </span>
                <div style={{ backgroundColor: 'rgb(226, 226, 226)', margin: '20px',width:'80%' }}>
                    <textarea onChange={this.questionContent.bind(this)} style={{width:'100%', backgroundColor: 'rgb(226, 226, 226)',height:'300px' }} class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
                <div>
                {/* <Link to="/" style={{textDecoration:'none'}}> */}
                    <button type="button" style={{width:"250px",margin:"20px"}} class="btn btn-primary" onClick={this.submitQuestion.bind(this)} disabled={this.state.disableButton}>Submit my concern</button>
                {/* </Link> */}
                <br/>
                </div>
            </div>
        );
    }
}

export default Parent;