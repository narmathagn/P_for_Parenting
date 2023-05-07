import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Expert extends Component {
    constructor() {
        super();
        this.questions = ["why baby is crying in night?", "why baby is not sleeping well?", "why baby is vomitting after taking its food?"];
        this.state = { openIndex: -1, disableButton: true, quesSet: [], currentques: "", answer: "",does:"" }
    }
    componentDidMount() {
        fetch('http://localhost:8080/api/v1/parenting/allques')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({ quesSet: data.advanced.data });
            })
    }
    answerContent(e) {
        if (e.target.value != "") {
            this.setState({ disableButton: false, answer: e.target.value })
        }
        else {
            this.setState({ disableButton: true })
        }
    }
    setOpen(i, id) {
        let value = !this.state.openAns
        this.setState({ openIndex: i, currentques: id });
    }
    setDoes(val){
        this.setState({does:val});
        console.log(val);
    }
    submitAnswer() {
        console.log("current ques id is", this.state.currentques);
        console.log("current ans is ", this.state.answer);
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ answer: this.state.answer,does:this.state.does })
        };
        fetch('http://localhost:8080/api/v1/parenting/ans/' + this.state.currentques, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.props.history.push('/');
            });
    }
    render() {
        let ques = this.state.quesSet.map((value, i) => {
            return (
                <div key={{ i }} style={{ backgroundColor: 'rgb(246, 248, 250)', margin: '20px', padding: '10px' }}>
                    <div className="form-check">
                        <input onChange={() => { this.setOpen(i, value._id) }} className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" defaultValue="option1" />&nbsp;
                        <label className="form-check-label" htmlFor="exampleRadios1">
                            {value.question}
                        </label>
                    </div>
                    {(this.state.openIndex === i) ?
                        <div>
                            <input style={{margin:'20px 5px 0 20px'}} onClick={() => { this.setDoes(true) }} className="form-check-input" type="radio" name="does" id="does" defaultValue={true} />&nbsp;
                            <label style={{margin:'20px 20px 0 0'}} className="form-check-label" htmlFor="does">
                                does
                            </label>
                            <input style={{margin:'20px 5px 0 20px'}} onClick={() => { this.setDoes(false) }} className="form-check-input" type="radio" name="does" id="does" defaultValue={false} />&nbsp;
                            <label style={{margin:'20px 20px 0 0'}} className="form-check-label" htmlFor="does">
                                don't
                            </label>
                            <textarea onChange={this.answerContent.bind(this)} style={{ margin: '20px', width: '90%', backgroundColor: 'rgb(226, 226, 226)', height: '200px' }} class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                            <button type="button" onClick={this.submitAnswer.bind(this)} style={{ width: "250px", margin: "20px" }} class="btn btn-primary" disabled={ (this.state.does === "") || this.state.disableButton}>Share my solution</button><br />
                        </div> : null}
                </div>
            )
        })
        return (
            <div className="leftalign" style={{ height: "800px", marginTop: "20px", marginBottom: "20px" }}>
                <span style={{ color: 'black', fontSize: 25, marginLeft: '20px' }}>
                    Please select your question and give solution down below:
                </span>
                <div style={{ padding: 5 }}>
                    {ques}
                </div>
            </div>
        );
    }
}

export default Expert;