import React from 'react';
import '../css/case.css'
import Wheel from './wheel';
import Display from './display';


// This component is the outer case of ipod it does noting special just renders display and wheel components
class Case extends React.Component {
    render() {
        const { active, updateActiveMenu, currentMenu, changeMenuBackward, changeMenuForward, menuItems, musicItems, togglePlayPause, songItems, playing, songIndex, theme, audio, songUrl, songImgUrl, seekSongForward, seekSongReverse, wheelColor, wallpaper, wallpapersItems, noty, setNoty, notifyText } = this.props;
        return (
            
            <div className='case-container'>
                <div className='case' style={{backgroundColor:theme}}>
                    <Display songIndex={songIndex} playing={playing} active={active} musicItems={musicItems} menuItems={menuItems} currentMenu={currentMenu} songItems={songItems} audio={audio} songUrl={songUrl} songImgUrl={songImgUrl} wallpaper={wallpaper} wallpapersItems={wallpapersItems} noty={noty} setNoty={setNoty} notifyText={notifyText} />
                    <Wheel theme={theme} active={active} menuItems={menuItems} currentMenu={currentMenu} changeMenuForward={changeMenuForward} changeMenuBackward={changeMenuBackward} updateActiveMenu={updateActiveMenu} togglePlayPause={togglePlayPause} seekSongForward={seekSongForward} seekSongReverse={seekSongReverse} wheelColor={wheelColor}/>

                </div>
            </div>
        )
    }
}

export default Case;