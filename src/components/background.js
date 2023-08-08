import React from "react";
import "../css/Themes.css"


//renders background

class Background extends React.Component{
    render(){
        const {active} =this.props;
        return(
            <div className="music">
            <h2>Background Select</h2>
            <ul>
                {["Stormy Gray","Teal Blue", "Antique Gold", "Moss Green", "Deep Slate"].map((element,index)=>{
                    return active===index?<li key={index} className="active theme-li">{element}</li>:<li key={index} className="theme-li">{element}</li>
                })}
            </ul>

            </div>
        )
    }
}

export default Background;