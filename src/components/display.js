import React from 'react';
import '../css/display.css';
import Navbar from './Navbar';
import LockScreen from './LockScreen';
import Menu from './Menu';
import Music from './Music';
import Settings from './Setting';
import Songs from './Songs';
import Playing from './Playing';
import Themes from './Themes';
import Wallpaper from './Wallpaper';
import WheelColor from './WheelColor';


// On the basis of what the current menu is this item will render only that component
// Also this displays the navigation bar
// Key for displaying menu
// {-2: lock screen, -1 : main menu, 0 : now playing, 1: music menu, 2,5,6 : dummy menu, 3: setings menu,4:songs menu, 7:music playing, 8 :themes menu, 9:wheel color menu, 10:wallpaper menu}

class Display extends React.Component {
    render() {
        const { active, currentMenu, menuItems, musicItems, songItems, playing, songIndex, audio, songUrl, songImgUrl, wallpaper, wallpapersItems, noty, setNoty, notifyText } = this.props;
        return (
            <div style={{ backgroundImage: `url(${wallpapersItems[wallpaper]})` }} className="display">
                <Navbar noty={noty} setNoty={setNoty} playing={playing} notifyText={notifyText} />
                {currentMenu === -2 && <LockScreen />}
                {currentMenu === -1 && <Menu songImgUrl={songImgUrl} menuItems={menuItems} active={active} />}
                {currentMenu===1 &&<Music musicItems={musicItems} active={active}/>}
                {currentMenu===2 && <div className='blank-div'><h1 className='empty-text'>Games</h1></div>}
                {currentMenu===3 && <Settings active={active}/>}
                {currentMenu===4 && <Songs songItems={songItems} active={active}/>}
                {currentMenu===5 && <div className='blank-div'><h1 className='empty-text'>Artist</h1></div>}
                {currentMenu===6 && <div className='blank-div'><h1 className='empty-text'>Albums</h1></div>}
                {(currentMenu===0||currentMenu===7) && <Playing songItems={songItems} songImgUrl={songImgUrl} audio={audio} songUrl={songUrl} playing={playing} songIndex={songIndex}/>}
                {currentMenu===8&&<Themes active={active}/>}
                {currentMenu===9&&<WheelColor active={active}/>}
                {currentMenu===10&&<Wallpaper active={active}/>}
            </div>
        );
    }
}

export default Display;