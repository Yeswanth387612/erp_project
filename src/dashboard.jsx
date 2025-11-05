import React, { Component } from 'react';
import './dashboard.css';
import { BASEURL, callApi, getSession, setSession } from './lib';

class Dashboard extends Component {
    constructor(){
        super();
        this.state = {
            username: getSession("sid"),
            fullName: ""
        };
        this.getFullName = this.getFullName.bind(this);
    }
    componentDidMount(){
        if(this.state.username === ""){
            this.logout();
            return;
        }       

        let data = JSON.stringify({
            email: this.state.username
        });
        callApi("POST", BASEURL + "getfullname", data, this.getFullName);
    }
    getFullName(res){
        let rdata = JSON.parse(res);
        if(res.includes("::")){
            alert(rdata.split("::")[1]);
            return;
        }
        this.setState({fullName: rdata.firstName + " " + rdata.lastName});
    }
    logout(){
        setSession("sid", "", -1);
        window.location.replace("/");
    }
    render() {
        const{fullName} = this.state;
        return (
            <div className='dashboard'>
                <div className='header'>
                    <div className='logo'>Koneru Lakshmaiah Education Foundation</div>
                    <div className='userInfo'>{fullName} <img src="/logout.png" alt="" onClick={()=>this.logout()} /></div>
                </div>
                <div className='menu'>Menu</div>
                <div className='workspace'>Workspace</div>
                <div className='footer'>Copyright @ 2025. All rights reserved.</div>
            </div>
        );
    }
}

export default Dashboard;