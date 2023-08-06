import React from 'react';
import '../css/Navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWifi, faBatteryFull, faPlay, faPause } from '@fortawesome/free-solid-svg-icons'


class Navbar extends React.Component {
    constructor() {
        super();
        this.state = {
            time: this.getCurrentTime(),
        }
        this.stateId = "";
    }

    // if there is no notification then ipod logo,time and battery icon
    //If there is a notification show it for 1 second and clear it
    componentDidMount() {
        const { noty } = this.props;
        if (noty === true) {
            return;
        }
        this.stateId = setInterval(() => {
            this.setState({ time: this.getCurrentTime() });
        }, 60000);
    }

    componentDidUpdate() {
        const { setNoty, noty } = this.props;
        if (noty === true) {
            setTimeout(function () {
                setNoty();
            }, 1000)
        }
    }

    //Clear the update time interval
    componentWillUnmount() {
        const { noty } = this.props;
        if (noty !== true) {
            clearInterval(this.stateId);
        }
    }



    // first setting current time in string 
    getCurrentTime() {
        const today = new Date();
        var time = today.getHours() + ":" + today.getMinutes();
        if (today.getMinutes() < 10) {
            time = today.getHours() + ":0" + today.getMinutes();
        }
        return time;
    }


    //Render navbar to show either ipod logo, time or Notification
    render() {
        const { time } = this.state;
        const { playing, noty, notifyText } = this.props;
        return (
            <div className='bar'>
                {<h5 className='heading'>iPod <FontAwesomeIcon icon={faWifi} /></h5>}
                {noty === true && <h5 className="notification">{notifyText}</h5>}
                {noty === false && <h3 className='time' style={{fontSize: '1.0em'}}>{time}</h3>}
                {<div className='right-container-nav'>
                    {playing ? <h5 className='play-pause-nav' style={{}}><FontAwesomeIcon icon={faPlay} /></h5> : <h5 className='play-pause-nav'><FontAwesomeIcon icon={faPause} /></h5>}
                    <FontAwesomeIcon icon={faBatteryFull} style={{ fontSize: 20 }} />
                </div>}
            </div>
        );
    }
}

export default Navbar;

