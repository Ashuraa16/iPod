import React from "react";
import "../css/Setting.css"


//Render settings

class Settings extends React.Component{
    render(){
        const {active} = this.props;
        return(
            
            <div className="settings">
            <h2>Settings</h2>
            <ul>
                {active===0?<li className="active">Themes</li>:<li>Themes</li>}
                {active===1?<li className="active">Wheel Color</li>:<li>Wheel Color</li>}
                {active===2?<li className="active">Wallpaper</li>:<li>Wallpaper</li>}
                {active===3?<li className="active">Background</li>:<li>Background</li>}
                
            </ul>
            </div>
        )
    }
}

export default Settings;