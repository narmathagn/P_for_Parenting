import React, { Component } from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Home from './components/screens/Home';
import Expert from './components/screens/Expert';
import Parent from './components/screens/Parent';
import Questions from './components/screens/Questions';
import Searchresult from './components/screens/Searchresult';
import Faq from './components/screens/Faq';
import About from './components/screens/About';

class Routing extends Component {
    render() {
        return (
            <>
                 <BrowserRouter>
                    <Route path="/" component={Header}></Route>
                    <Switch>
                        <Route exact path="/" component={Home}></Route>
                        <Route exact path="/parentlogin" component={Parent}></Route>
                        <Route exact path="/expertlogin" component={Expert}></Route>
                        <Route exact path="/questions/:id" component={Questions}></Route>
                        <Route exact path="/faq" component={Faq}></Route>
                        <Route exact path="/about" component={About}></Route>
                        <Route exact path="/searchresults/:word" component={Searchresult}></Route>
                    </Switch>
                    <Route path='/' component={Footer}></Route>
                 </BrowserRouter>
            </>
        );
    }
}

export default Routing;