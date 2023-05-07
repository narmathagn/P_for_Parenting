import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
                <div style={{textAlign:'center',backgroundColor:'black',position:"fixed",bottom:'0px',width:"100%",height:'30px'}}>
                    <a className="nav-link" aria-current="page" href="#" style={{color:'gray',fontSize:'12px'}}> @copy right P for Parenting</a>
                </div>
        );
    }
}

export default Footer;