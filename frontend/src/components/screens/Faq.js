import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class Faq extends Component {
    constructor() {
        super();
        this.state = { quesSet: [], sorted: [] };
    }
    componentDidMount() {
        fetch('http://localhost:8080/api/v1/parenting/allques?viewCount[gte]=10&page=1&limit=10')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({ quesSet: data.advanced.data, sorted: data.data });
            })
        // console.log(this.props.match.params.id)
    }
    render() {
        let ques = this.state.quesSet.map((value, i) => {
            let index = this.state.sorted.findIndex(x => x._id === value._id);
            var ans = "no answer available";

            if (index >= 0) {
                ans = this.state.sorted[index].answer;
                console.log(ans[0].does)
            }
            return (
                <div style={{ marginLeft: "20px", marginBottom: "10px" }}>
                    <Link to={"/questions/" + value._id} style={{ textDecoration: 'none' }}><span style={{ color: 'blue', fontSize: "20px" }}>{value.question}({value.viewCount})</span></Link><br />
                    <span>
                        {ans[0].does && index >= 0 ? <><i class="fas fa-check" style={{ color: 'green' }}></i>&nbsp; </> : null}
                        {!ans[0].does && index >= 0 ? <><i class="fas fa-times" style={{ color: 'red' }}></i>&nbsp;&nbsp;</> : null}
                        {index < 0 ? <><i class="fas fa-minus" style={{ color: 'gray' }}></i>&nbsp;&nbsp;</> : null}
                        {index >= 0 ? ans[0].solution + "(" + ans[0].count + ")" : "no answer available"}
                    </span>
                </div>
            )
        })
        return (
            <div className="leftalign" style={{ marginTop: "20px", marginBottom: "20px", height: '100%' }}>
                <div>
                    <h2 style={{ textAlign: 'center' }}>Most Frequently Asked Questions</h2>
                    <div style={{ marginBottom: '20px', marginTop: '20px', marginRight: '38px', marginLeft: '20px', padding: "35px 10%", height: "100%", backgroundColor: 'rgb(226, 226, 226)' }}>
                        <div className="row">
                            <div className="col-sm-12 col-md-12" >
                                {/* <span style={{ fontSize: '20px', width: "250px", margin: '20px auto', display: 'block', textAlign: 'center' }}>Queries</span> */}
                                {ques}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}
