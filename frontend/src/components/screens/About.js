import React, { Component } from 'react'

export default class About extends Component {
    render() {
        return (
            <div className="leftalign" style={{ marginTop: "20px", marginBottom: "20px", height: '100%' }}>
            <div>
                <h2 style={{ textAlign: 'center' }}>Most Frequently Asked Questions</h2>
                <div style={{ marginBottom: '20px', marginTop: '20px', marginRight: '38px', marginLeft: '20px', padding: "35px 10%", height: "100%", backgroundColor: 'rgb(226, 226, 226)' }}>
                    <div className="row">
                        <div className="col-sm-12 col-md-12" >
                            {/* <span style={{ fontSize: '20px', width: "250px", margin: '20px auto', display: 'block', textAlign: 'center' }}>Queries</span> */}
                            About Page
                        </div>
                    </div>
                </div>

            </div>
        </div>
        )
    }
}
