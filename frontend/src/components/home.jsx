import React, {useEffect, useState, useLayoutEffect} from 'react';
import background from "/home/nils/Documents/projects/worldMassage/frontend/src/ale2.jpg";
import './home.css';
import Arrow from "./arrow"

function Home() {
  const [imgDimensions, setImageDimensions] = useState({height:0, width:0});
  const [init, setInit] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", applyImageDimensions);
    window.addEventListener('wheel', scrollPage, { passive: false });
  }, [])
  useLayoutEffect(() => window.addEventListener('load', initialize));
  
  return ( 
    <>
      <div className="home">
          <div className="home__image__container"
                id="home__image__container" 
                >
            <img className={`home__image${!init ? ' init' : ''}`}
                  id="home__image" 
                  src={background} 
                  alt="Person getting a massage"
                  style={{width:`${imgDimensions.width}px`, 
                      height:`${imgDimensions.height}px` 
                      }}
                  />
          </div>
          <div className="home__info">
            <h1 className="title">Välkommen till WorldMassage</h1>
            <button className="booking">Boka</button>
          </div>
          <Arrow arrowText={"Info"}></Arrow>
      </div>
    </>
  )
      
  function applyImageDimensions() {
    let img = document.getElementById("home__image");
    let container = document.getElementById("home__image__container");
    let containerRatio = container.offsetHeight / container.offsetWidth;
    let imgRealWidth = img.naturalWidth;
    let imgRealHeight = img.naturalHeight;
    if(imgRealHeight/imgRealWidth > containerRatio) {
      let width = container.offsetWidth;
      let height = width * imgRealHeight/imgRealWidth;
      setImageDimensions({height:height, width:width})
    };
    if(imgRealHeight/imgRealWidth <= containerRatio) {
      let height = container.offsetHeight;
      let width = height * imgRealWidth/imgRealHeight;
      setImageDimensions({height:height, width:width})
    };
  }

  function initialize() {
      applyImageDimensions();
      setInit({init:true});
    }

  function scrollPage(event) {
    if(event.deltaY > 0 || event.deltaY === undefined) {
      let footer = document.getElementById("footer");
      footer.scrollIntoView({ behavior: 'smooth', block: 'start'});
    }
    if(event.deltaY < 0) {
      let menu = document.getElementById("menu");
      menu.scrollIntoView({ behavior: 'smooth', block: 'start'});
    }
  }

      // scrollPageTouch(event) {
      //   console.log(event)
      //   // let elapsedTime = new Date().getTime();
      //   // if(event.changedTouches[0].pageY < (touch) && (elapsedTime - touchTime) < 100000000) {
      //   // }
      //   let footer = document.getElementById("footer");
      //   footer.scrollIntoView({ behavior: 'smooth', block: 'start'});
      //   // if(event.changedTouches[0].pageY > (touch) && (elapsedTime - touchTime) < 100000000) {
      //   //   let menu = document.getElementById("menu");
      //   //   menu.scrollIntoView({ behavior: 'smooth', block: 'start'});
      //   // }
      // }

      // onTouch(event) {
      //   let startTime = new Date().getTime();
      //   setState( {touch:event.changedTouches[0].pageY, touchTime:startTime} )
      // }
  }
   
  export default Home;