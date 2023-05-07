import React, { Component } from 'react';

class Questions extends Component {
    constructor() {
        super();
        this.state = { data: [], answers: [] };
    }
    componentDidMount() {
        fetch('http://localhost:8080/api/v1/parenting/ques/' + this.props.match.params.id)
            .then(response => response.json())
            .then(res => {
                console.log(res);
                var ans = res.answer.sort(function (a, b) { return b.count - a.count });
                this.setState({ data: res, answers: ans })
            })
        // console.log(this.props.match.params.id)
    }
    componentDidUpdate = (prevProps) => {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            // fetch the new product based and set it to the state of the component
            fetch('http://localhost:8080/api/v1/parenting/ques/' + this.props.match.params.id)
                .then(response => response.json())
                .then(res => {
                    console.log(res);
                    this.setState({ data: res, answers: res.answer })
                })
        };
    };
    render() {
        var ansElement = null;
        console.log(this.state.answers.length)
        if (this.state.answers.length > 0) {
            ansElement = this.state.data.answer.map((value, i) => {
                return (
                    <div style={{ backgroundColor: 'rgb(246, 248, 250)', margin: '20px', padding: '20px' }}>
                        <span>
                            {value.does ? <i class="fas fa-check" style={{ color: 'green' }}></i> : <i class="fas fa-times" style={{ color: 'red' }}></i>}
                            &nbsp;&nbsp;
                            {value.solution}
                            <span style={{ fontWeight: 'bold', color: 'rgba(93, 170, 166, 0.788)' }}>&nbsp;({value.count})</span>
                        </span>
                    </div>
                )
            })
        }
        else {
            ansElement = (
                <div style={{ backgroundColor: 'rgb(246, 248, 250)', margin: '20px', padding: '20px' }}>
                    <span>No answer available
                    </span>
                </div>
            )
        }

        return (
            <div>
                <div style={{ marginBottom: 20, marginTop: 20, marginRight: 12, padding: '15px 15px', height: '100%', marginBottom: "20px" }}>
                    <div className="row" style={{ margin: '0px 20px' }}>
                        <div className="col-sm-12 col-md-8 mx-auto" style={{ backgroundColor: 'rgb(226, 226, 226)', borderRadius: 10 }}>
                            <div style={{ marginLeft: 20, marginBottom: 10, margin: 20 }}>
                                <span style={{ color: 'black', fontSize: 25 }}>
                                    {this.state.data.question}
                                </span>
                                <br /><br />
                                <div style={{ padding: 5 }}>
                                    {ansElement}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default Questions;