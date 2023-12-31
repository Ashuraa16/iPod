import React from "react";

// import logo from './logo.svg';
import "../css/App.css";

// import Wheel from './wheel';
import Case from "./case";
import KnowMore from "./KnowMore";

//import songs
import song3 from "../static/songs/Jai Shri Ram.mp3";
import song2 from "../static/songs/Shape-of-You-(Lofi)(PagalWorldl).mp3";
import song1 from "../static/songs/Faded (Slowed And Reverb)(audiosong.in).mp3";
import song4 from "../static/songs/XXXTENTACION-Hope.mp3";
import song5 from "../static/songs/Rap-God---Eminem-320(PagalWorld).mp3";

//Import song cover images
import song3Img from "../static/jai shree ram.jpg";
import song2Img from "../static/shap of you.webp";
import song1Img from "../static/faded.jpg";
import song4Img from "../static/XXXTENTACION.jpg";
import song5Img from "../static/Rap God - Eminem.jpg";

//import wallpapers
import Wallpaper1 from "../static/wallpaper1.jpg";
import Wallpaper2 from "../static/wallpaper2.jpg";
import Wallpaper3 from "../static/wallpaper3.jpg";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      active: 0, //Active list item
      menuItems: ["Now Playing", "Music", "Games", "Settings"], //menu Items
      musicItems: ["All Songs", "Artist", "Albums"], //Items in music
      songItemsUrl: [song1, song2, song3, song4, song5], //songs list
      songImgItemsUrl: [song1Img, song2Img, song3Img, song4Img, song5Img], //song image list
      wallpapersItems: [Wallpaper1, Wallpaper2, Wallpaper3], //wallpapers
      songItems: [
        "Faded - Alan Walker",
        "Shape of You - Ed Sheeran",
        "Jai Shri Ram - Adipurush",
        "Hope - XXXTENTACION",
        "Rap God - Eminem",
      ], //song names
      songIndex: 0, //current song
      lengthMenuKey: { "-1": 3, 1: 2, 4: 4, 8: 4, 3: 3, 9: 4, 10: 2, 11: 4 }, //length of particular menu
      menuMapping: { "-1": [0, 1, 2, 3], 1: [4, 5, 6], 3: [8, 9, 10, 11] }, //which menu can be rendered by key menu
      currentMenu: -2, //current menu which is lockscreen initially
      navigationStack: [], //Used for navigation forward and backward
      songUrl: song1, //current song url
      playing: false, //playing or not
      theme: "rgb(244, 227, 177)", //current body theme
      audio: new Audio(song1), //current audio file
      songImgUrl: song1Img, //current song img for now playing
      wheelColor: "rgb(70, 70, 70)", //current wheel color
      wallpaper: 0, //current wallpaper
      noty: false, //has to show notification or not
      notifyText: "Wallpaper Changed", //notification text
      backGround: "#46515e",
    };
  }

  //FUNCTION FOR : ON LONG PRESS OF FORWARD BUTTON TRACKS ARE SEEKED FORWARD
  seekSongForward = (e) => {
    if (this.state.currentMenu === -2) {
      return;
    }
    if (this.state.playing === false) {
      return;
    }
    if (e.detail.interval < 250) {
      this.state.audio.pause();
      let songIndex = this.state.songIndex;
      if (songIndex === this.state.songItemsUrl.length - 1) {
        songIndex = 0;
      } else {
        songIndex++;
      }
      const songUrl = this.state.songItemsUrl[songIndex];
      const songImgUrl = this.state.songImgItemsUrl[songIndex];
      this.setState(
        {
          songIndex: songIndex,
          songImgUrl: songImgUrl,
          songUrl: songUrl,
          audio: new Audio(songUrl),
        },
        () => {
          this.state.audio.play();
        }
      );
    } else if (e.detail.interval > 250 && e.detail.interval < 10000) {
      const interval = e.detail.interval / 100;
      this.setState((prevState) => {
        prevState.audio.currentTime += interval;
        return prevState;
      });
    }
  };

  //FUNCTION FOR : ON LONG PRESS OF BACKWARD BUTTON TRACKS ARE SEEKED BACKWARD
  seekSongReverse = (e) => {
    if (this.state.currentMenu === -2) {
      return;
    }
    if (this.state.playing === false) {
      return;
    }
    console.log(e.detail.interval);
    if (e.detail.interval < 250) {
      this.state.audio.pause();
      let songIndex = this.state.songIndex;
      if (songIndex === 0) {
        songIndex = this.state.songItemsUrl.length - 1;
      } else {
        songIndex--;
      }
      const songUrl = this.state.songItemsUrl[songIndex];
      const songImgUrl = this.state.songImgItemsUrl[songIndex];
      this.setState(
        {
          songIndex: songIndex,
          songImgUrl: songImgUrl,
          songUrl: songUrl,
          audio: new Audio(songUrl),
        },
        () => {
          this.state.audio.play();
        }
      );
    } else if (e.detail.interval > 250 && e.detail.interval < 10000) {
      const interval = e.detail.interval / 100;
      this.setState((prevState) => {
        prevState.audio.currentTime -= interval;
        return prevState;
      });
    }
  };

  //FUNCTION FOR : TOGGLE SONG AND PAUSE
  togglePlayPause = () => {
    if (this.state.currentMenu === -2) {
      return;
    }
    if (this.state.playing === true) {
      this.setState({ playing: false });
      this.state.audio.pause();
    } else {
      this.setState({ playing: true });
      this.state.audio.play();
    }
  };

  //FUNCTION FOR : UPDATE ACTIVE MENU WHILE ROTATING ON THE TRACK-WHEEL
  updateActiveMenu = (direction, menu) => {
    console.log(direction, menu);
    if (
      menu !== -1 &&
      menu !== 1 &&
      menu !== 4 &&
      menu !== 8 &&
      menu !== 3 &&
      menu !== 9 &&
      menu !== 10 &&
      menu !== 11
    ) {
      return;
    }
    let min = 0;
    let max = 0;

    max = this.state.lengthMenuKey[menu];
    if (direction === 1) {
      if (this.state.active >= max) {
        this.setState({ active: min });
      } else {
        this.setState({ active: this.state.active + 1 });
      }
    } else {
      if (this.state.active <= min) {
        this.setState({ active: max });
      } else {
        this.setState({ active: this.state.active - 1 });
      }
    }
  };

  //FUNCTION FOR : CHANGE THE THEME OF iPod BODY
  setTheme = (id) => {
    let theme = "";
    if (id === 0) {
      theme = "#f0f8ff";
    } else if (id === 1) {
      theme = "#f7ede2"; //black
    } else if (id === 2) {
      theme = "#c7c7c7";
    } else if (id === 3) {
      theme = "#f4e3b1";
    } else if (id === 4) {
      theme = "#d2d2d2";
    }

    this.setState({ theme: theme, noty: true, notifyText: "Theme Changed" }); //Notifaction
    return;
  };

  // FUNCTION FOR : CHANGE COLOR OF WHEEL
  setWheelColor = (id) => {
    let wheelColor = "";
    if (id === 0) {
      wheelColor = "#5f9ea0";
    } else if (id === 1) {
      wheelColor = "#a3c3d9";
    } else if (id === 2) {
      wheelColor = "#464646";
    } else if (id === 3) {
      wheelColor = "#e27a3f";
    } else if (id === 4) {
      wheelColor = "#3a3a3a";
    }
    this.setState({
      wheelColor: wheelColor,
      noty: true,
      notifyText: "Wheel Color Changed",
    });
    return;
  };

  // FUNCTION FOR : CHANGE COLOR OF WHEEL
  setBackgroundColor = (id) => {
    let backGround = "";
    if (id === 0) {
      backGround = "#808a87";
    } else if (id === 1) {
      backGround = "#3b6e6d";
    } else if (id === 2) {
      backGround = "#8b786d";
    } else if (id === 3) {
      backGround = "#6b8e23";
    } else if (id === 4) {
      backGround = "#46515e";
    }
    this.setState({
      backGround: backGround,
      noty: true,
      notifyText: "Background Changed",
    });
    return;
  };

  // FUNCTION FOR : SET WALLPAPER OF iPod BODY
  setWallpaper = (id) => {
    this.setState({
      wallpaper: id,
      noty: true,
      notifyText: "Wallpaper Changed",
    });
    return;
  };

  //FUNCTION FOR : CHANGE PLAYING MUSIC
  chagePlayingSongFromMusicMenu = (id, navigationStack) => {
    const songUrl = this.state.songItemsUrl[id];
    const songImgUrl = this.state.songImgItemsUrl[id];
    this.state.audio.pause();
    this.setState(
      {
        currentMenu: 7,
        songUrl: songUrl,
        navigationStack: navigationStack,
        active: 0,
        playing: true,
        songIndex: id,
        audio: new Audio(songUrl),
        songImgUrl: songImgUrl,
      },
      () => {
        this.state.audio.play();
      }
    );
    return;
  };

  // FUNCTION FOR : CHANGE MENU BACKWARDS on ORESS OF CENTRE BUTTON
  changeMenuBackward = () => {
    // Create a shallow copy of the navigationStack array from the component's state
    // This is done to ensure immutability and avoid direct modifications to the state
    const navigationStack = this.state.navigationStack.slice();
    if (this.state.currentMenu === -2) {
      return;
    } else {
      const prevId = navigationStack.pop();
      this.setState({
        currentMenu: prevId,
        navigationStack: navigationStack,
        active: 0,
      });
      return;
    }
  };

  //FUNCTION FOR : CHANGE MENU FORWARD on PRESS OF CENTRE using NAVIGATION STACK
  changeMenuForward = (id, fromMenu) => {
    const navigationStack = this.state.navigationStack.slice();
    if (
      fromMenu !== -2 &&
      fromMenu !== -1 &&
      fromMenu !== 1 &&
      fromMenu !== 4 &&
      fromMenu !== 3 &&
      fromMenu !== 8 &&
      fromMenu !== 9 &&
      fromMenu !== 0 &&
      fromMenu !== 7 &&
      fromMenu !== 10 &&
      fromMenu !== 11
    ) {
      return;
    }

    if (fromMenu === -2) {
      navigationStack.push(this.state.currentMenu);
      this.setState({
        currentMenu: -1,
        navigationStack: navigationStack,
        active: 0,
      });
      return;
    }

    if (fromMenu === -1) {
      navigationStack.push(this.state.currentMenu);
      this.setState({
        currentMenu: id,
        navigationStack: navigationStack,
        active: 0,
      });
      return;
    }

    if (fromMenu === 7 || fromMenu === 0) {
      this.togglePlayPause();
      return;
    }
    if (fromMenu === 8) {
      this.setTheme(id);
      return;
    }
    if (fromMenu === 9) {
      this.setWheelColor(id);
      return;
    }
    if (fromMenu === 10) {
      this.setWallpaper(id);
      return;
    }
    if (fromMenu === 11) {
      console.log(id);
      this.setBackgroundColor(id);
      return;
    }

    navigationStack.push(this.state.currentMenu);

    if (fromMenu === 4) {
      this.chagePlayingSongFromMusicMenu(id, navigationStack, fromMenu);
      return;
    }

    const currentMenuID = this.state.menuMapping[fromMenu][id];
    this.setState({
      currentMenu: currentMenuID,
      navigationStack: navigationStack,
      active: 0,
    });
  };

  //FUNCTION FOR : SET NOTIFICATION AS FALSE AFTER SENDING NOTIFICATION
  setNoty = () => {
    this.setState({ noty: false });
    return;
  };

  //FUNCTION FOR : RENDERING APP
  render() {
    const {
      audio,
      active,
      currentMenu,
      menuItems,
      musicItems,
      songItems,
      playing,
      songIndex,
      theme,
      songUrl,
      songImgUrl,
      wheelColor,
      wallpaper,
      wallpapersItems,
      noty,
      notifyText,
    } = this.state;
    {
      document.body.style.backgroundColor = this.state.backGround;
    }
    return (
      <div className="App">
        <KnowMore />
        <Case
          songIndex={songIndex}
          active={active}
          menuItems={menuItems}
          musicItems={musicItems}
          currentMenu={currentMenu}
          changeMenuForward={this.changeMenuForward}
          changeMenuBackward={this.changeMenuBackward}
          updateActiveMenu={this.updateActiveMenu}
          togglePlayPause={this.togglePlayPause}
          songItems={songItems}
          playing={playing}
          theme={theme}
          audio={audio}
          songUrl={songUrl}
          songImgUrl={songImgUrl}
          seekSongForward={this.seekSongForward}
          seekSongReverse={this.seekSongReverse}
          wheelColor={wheelColor}
          wallpaper={wallpaper}
          wallpapersItems={wallpapersItems}
          noty={noty}
          setNoty={this.setNoty}
          notifyText={notifyText}
        />
      </div>
    );
  }
}

export default App;
