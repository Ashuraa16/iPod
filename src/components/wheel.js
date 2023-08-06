import React from "react";
import '../css/wheel.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faForwardFast, faPlay, faPause, faBackwardFast } from '@fortawesome/free-solid-svg-icons'
import ZingTouch from 'zingtouch'


class Wheel extends React.Component {
    constructor() {
        super();
        this.angle = 0;
    }

    //Bind component with zingtouch logic
    componentDidMount() {
        const { changeMenuBackward, togglePlayPause, seekSongForward, seekSongReverse } = this.props;
        const wheelControll = this.wheelControll;
        const wheel = document.getElementById("wheel");
        const activeRegion = ZingTouch.Region(wheel);
        const menuIcon = document.getElementById("menu");
        const playPause = document.getElementById("play-pause");
        const forward = document.getElementById("forward");
        const reverse = document.getElementById("reverse");

        // Create a new instance of the long tap gesture from the ZingTouch library
        const longTapGesture = new ZingTouch.Tap({
            // Set the maximum delay (in milliseconds) for the gesture to be recognized as a long tap
            maxDelay: 10000,

            // Set the number of inputs (fingers or touch points) required for the gesture
            numInputs: 1,

            // Set the tolerance level for recognizing the gesture (lower values make it more sensitive)
            tolerance: 1,
        });

        activeRegion.bind(menuIcon, 'tap', function (e) {
            changeMenuBackward();
        });

        activeRegion.bind(wheel, 'rotate', function (e) {
            wheelControll(e);
        });

        activeRegion.bind(playPause, 'tap', function (e) {
            togglePlayPause();
        });

        activeRegion.bind(reverse, longTapGesture, function (e) {
            seekSongReverse(e);
        });

        activeRegion.bind(forward, longTapGesture, function (e) {
            seekSongForward(e);
        });



    }

    // control the wheel rotation action if rotation is more than 15 degrees and also check direction of rotation

    // Define a function called wheelControll that takes an event parameter (e)
    wheelControll = (e) => {
        // Get the updateActiveMenu and currentMenu functions from this.props
        const { updateActiveMenu, currentMenu } = this.props;

        // Check if the initial distance from touch/mouse down is 0
        if (e.detail.distanceFromOrigin === 0) {
            // Set the initial angle to the current angle of the touch/mouse event
            this.angle = e.detail.angle;
        }

        // Check if the difference in angles is more than 300 degrees
        if (Math.abs(this.angle - e.detail.angle) > 300) {
            // Update the angle to the absolute value of the current angle
            this.angle = Math.abs(e.detail.angle);

            // Check if the distance from the last event is 0
            if (e.detail.distanceFromLast === 0) {
                // If so, return and do nothing
                return;
            } else if (e.detail.distanceFromLast < 0) {
                // If the distance is negative, call the updateActiveMenu function with argument 1 to indicate clockwise rotation
                updateActiveMenu(1, currentMenu);
            } else {
                // If the distance is positive, call the updateActiveMenu function with argument 0 to indicate counterclockwise rotation
                updateActiveMenu(0, currentMenu);
            }
        }
        // If the difference in angles is more than 15 degrees but less than 300 degrees
        else if (Math.abs(this.angle - e.detail.angle) > 15) {
            // Update the angle to the absolute value of the current angle
            this.angle = Math.abs(e.detail.angle);

            // Check if the distance from the last event is 0
            if (e.detail.distanceFromLast === 0) {
                // If so, return 0
                return 0;
            } else if (e.detail.distanceFromLast > 0) {
                // If the distance is positive, call the updateActiveMenu function with argument 1 to indicate clockwise rotation
                updateActiveMenu(1, currentMenu);
            } else {
                // If the distance is negative, call the updateActiveMenu function with argument 0 to indicate counterclockwise rotation
                updateActiveMenu(0, currentMenu);
            }
        }
    }




    render() {
        const { changeMenuForward, active, currentMenu, theme, wheelColor } = this.props;

        return (
            <div className="wheel-container" id="wheel-container">
                <div style={{ background: wheelColor }} className="wheel" id="wheel">
                    <div className="controll" id="menu">
                        <div style={{ color: theme }}>MENU</div>
                    </div>
                    <div className="controll" id="forward">
                        <FontAwesomeIcon icon={faForwardFast} style={{ color: theme }} />
                    </div>
                    <div className="controll" id="play-pause">
                        <div>
                            {/* <i style={{color:theme}} className="fas fa-play"></i> */}
                            <FontAwesomeIcon icon={faPlay} style={{ color: theme }} />
                            {/* <i style={{color:theme}} className="fas fa-pause"></i> */}
                            <FontAwesomeIcon icon={faPause} style={{ color: theme }} />
                        </div>
                    </div>
                    <div className="controll" id="reverse">
                        <FontAwesomeIcon icon={faBackwardFast} style={{ color: theme }} />
                    </div>

                </div>

                <div style={{ backgroundColor: theme }} className="blank" id="blank" onClick={() => { changeMenuForward(active, currentMenu) }}></div>
            </div>

        )
    }



}
export default Wheel;
