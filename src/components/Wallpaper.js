import React from "react";

// Renders wallpaper menu 
class Wallpaper extends React.Component{
    render(){
        const {active}=this.props;
        return(
            <div className="music">
            <h2>Wallpaper Select</h2>
            <ul>
                {["Wallpaper 1","Wallpaper 2","Wallpaper 3"].map((element,index)=>{
                    return active===index?<li key={index} className="active theme-li">{element}</li>:<li key={index} className="theme-li">{element}</li>
                })}
            </ul>

            </div>
        )
    }
}


export default Wallpaper;

