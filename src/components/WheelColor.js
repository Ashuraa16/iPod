import React from "react";
import "../css/Themes.css"

//Render wheel color change menu
class WheelColor extends React.Component{
    render(){
        const {active}=this.props;
        return(
            <div className="music">
            <h2>
                Wheel Color Select
            </h2>
            <ul>
                {["Teal","Pale Blue","Dark Gray","Coral","Charcoal Gray"].map((element,index)=>{
                    return active===index?<li key={index} className="active theme-li">{element}</li>:<li key={index} className="theme-li">{element}</li>
                })}
            </ul>

            </div>
        )
    }
}


export default WheelColor;