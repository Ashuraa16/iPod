import React from "react";
import "../css/Menu.css"
import game from "../static/game.jpg"
import music from '../static/music.jpg'
import settings from "../static/settings.png"

//Renders main menu
class Menu extends React.Component {
    render() {
        const { active, menuItems, songImgUrl } = this.props;
        return (
            <div className="menu-container">
                <div className="menu">
                    <ul>
                        {// Map over the menuItems array and generate a list of <li> elements
                            menuItems.map((element, index) => {
                                // Check if the current index matches the active index
                                return active === index ? (
                                    // If active, create a <li> element with "active" class
                                    <li key={index} className="active">
                                        {/* Add a non-breaking space before the element text */}
                                        &nbsp;{element}
                                    </li>
                                ) : (
                                    // If not active, create a regular <li> element
                                    <li key={index}>
                                        {/* Add a non-breaking space before the element text */}
                                        &nbsp;{element}
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>
                <div className="leaf">
                    {active === 0 && <img className="leaf-img" src={songImgUrl} alt=""></img>}
                    {active === 1 && <img className="leaf-img" src={music} alt=""></img>}
                    {active === 2 && <img className="leaf-img" src={game} alt=""></img>}
                    {active === 3 && <img className="leaf-img" src={settings} alt=""></img>}
                </div>

            </div>
        )
    }
}

export default Menu;
