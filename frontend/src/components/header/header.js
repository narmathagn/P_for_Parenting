import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
    constructor() {
        super();
        this.state = { open: "collapse navbar-collapse", word: "", result: [] }
    }
    toggleCollape() {
        if (this.state.open === "collapse navbar-collapse") {
            this.setState({ open: "collapse navbar-collapse show" })
        }
        else {
            this.setState({ open: "collapse navbar-collapse" })
        }
    }
    wordCapture(e) {
        if (e.target.value.length > 2) {
            fetch('http://localhost:8080/api/v1/parenting/allques?sort=-viewCount&question[regex]=' + e.target.value)
                .then(response => response.json())
                .then(data => {
                    this.setState({ result: data.advanced.data });
                    console.log(this.state.result);
                })
        }
        else
        {
            this.setState({ result: [] });
        }
        this.setState({ word: e.target.value })
    }
    searchWord() {
        if (this.state.word !== "") {
            fetch('http://localhost:8080/api/v1/parenting/allques?sort=-viewCount&question[regex]=' + this.state.word)
                .then(response => response.json())
                .then(data => {
                    this.setState({ result: data.data });
                    console.log(this.state.result);
                    this.props.history.push('/searchresults/'+this.state.word);
                    this.setState({ result: [],word:'' });
                })
        }
    }
    clickQuestion(id)
    {
        this.setState({result:[],word:''})
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch('http://localhost:8080/api/v1/parenting/ques/'+id,requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.props.history.push('/questions/'+id);
            });
    }
    render() {
        var results = this.state.result.slice(0,10).map((value,key)=>{
            return <Link to={"/questions/" + value._id} onClick={this.clickQuestion.bind(this,value._id)} className="dropdown-item" href="#">{value.question}</Link>
        })
        return (
            <div style={{ height: "10%", position: "sticky", top: '0px', width: "100%", marginBottom: '20px' }}>
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary ">
                    <div className="container-fluid">
                        <Link to="/" style={{ textDecoration: "none" }}><a className="navbar-brand" style={{ fontSize: "22px", marginLeft: '20px' }}>P for Parenting</a></Link>
                        <button onClick={this.toggleCollape.bind(this)} className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className={this.state.open} id="navbarColor01">
                            <ul className="navbar-nav me-auto">

                            </ul>
                            <form className="d-flex">
                                <ul className="navbar-nav" style={{ marginLeft: '20px' }}>
                                    <li className="nav-item">
                                        <Link to={'/faq'} className="nav-link" href="#">FAQ&nbsp;<i class="fas fa-question-circle"></i></Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={'/about'} className="nav-link" href="#">About&nbsp;<i class="fas fa-info-circle"></i></Link>
                                    </li>
                                </ul>
                            </form>
                            <form className="d-flex" style={{marginLeft: '20px', marginRight: '10px', paddingRight: '22px' }}>
                                <input onChange={this.wordCapture.bind(this)} value={this.state.word} className="form-control me-sm-2" type="text" placeholder="Search" style={{ height: '40px',width:'100%', marginBottom: '0px' }} />
                                {this.state.result.length>0 &&
                                <div className="dropdown-menu show" data-popper-placement="bottom-start" style={{width:'300px', transform: 'translate(0px, 42px)' }}>
                                    {results}
                                </div> }
                                <button onClick={this.searchWord.bind(this)} className="btn btn-secondary" type="button" style={{ height: '40px' }}><i class="fas fa-search"></i></button>
                            </form>

                        </div>
                    </div>
                </nav>

                {/* <nav className="navbar navbar-expand-lg navbar-dark bg-primary" style={{ position: 'fixed', top: '0', width: '100%' }}>
                    <div className="container-fluid">
                        <Link to="/" style={{ textDecoration: "none" }}><a className="navbar-brand leftalign">P for Parenting</a></Link>
                        <div class="collapse navbar-collapse" id="navbarColor01">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link" href="#">FAQ&nbsp;<i class="fas fa-question-circle"></i></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">About&nbsp;<i class="fas fa-info-circle"></i></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav> */}

            </div>
        );
    }
}


export default Header;