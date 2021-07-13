import React, { Component, createRef } from 'react';
import Menu from './menu';
import ToolBox from './toolBox';
import Tags from './tags';
import Canvas from './canvas';
import axios from "axios";
import './workBench.css';
import logo from './logo192.png';
//"proxy": "http://127.0.0.1:8000/",
//https://ecentral.sharepoint.com/sites/Security/Sweden/P&S

class WorkBench extends Component {
  constructor(props) {
    super(props);
    this.rectRef = createRef()
    this.boundingRef = createRef()
    this.handleUploadedImages = this.handleUploadedImages.bind(this);
    this.updateCurrentTool = this.updateCurrentTool.bind(this);
    this.updateImage = this.updateImage.bind(this);
    this.updateStoredRects = this.updateStoredRects.bind(this);
    this.checkScaleFactor = this.checkScaleFactor.bind(this);
    this.updateCurrentTag = this.updateCurrentTag.bind(this);
    this.removeRect = this.removeRect.bind(this);
    this.findRect = this.findRect.bind(this);
    this.updateRectDrag = this.updateRectDrag.bind(this);
    this.updateClickLocation = this.updateClickLocation.bind(this);
    this.addCurrentRect = this.addCurrentRect.bind(this);
    this.storeRectModification = this.storeRectModification.bind(this);
    this.checkValue = this.checkValue.bind(this);
    this.activateShortcutMode = this.activateShortcutMode.bind(this);
    this.disableShortcutMode = this.disableShortcutMode.bind(this);
    this.addShortcutKey = this.addShortcutKey.bind(this);
    this.setKeyUp = this.setKeyUp.bind(this);
    this.setKeyDown = this.setKeyDown.bind(this);
    this.setScaleFactor = this.setScaleFactor.bind(this);
    this.checkScaleFactor = this.checkScaleFactor.bind(this);
    this.updateCurrentRectCoords = this.updateCurrentRectCoords.bind(this);
    this.getModifierCoords = this.getModifierCoords.bind(this);
    this.tryAxios = this.tryAxios.bind(this);
    // this.debugger = this.debugger.bind(this);
    this.zoomIn = this.zoomIn.bind(this);
    this.zoomOut = this.zoomOut.bind(this);
    this.toggleZenMode = this.toggleZenMode.bind(this);
    this.checkShortcuts = this.checkShortcuts.bind(this);
    this.removeShortcut = this.removeShortcut.bind(this);
    this.updateSettings = this.updateSettings.bind(this);
    this.automateRect = this.automateRect.bind(this);
    this.state = {
      index:0, 
      tool:"", 
      cursorX:null, 
      cursorY:null,
      clickLocation: null,
      annotations:[],
      currentScaleFactor:null,
      currentTag:[["Person", [255,0,0]]],
      idIndex:0,
      currentRect: null,
      currentRectModifier: null,
      currentRectModifiedCoords: null,
      shortcuts: {currentlyCreating:false,
                  currentShort:null, 
                  cursor:[["c"]], 
                  drawRect:[["r"]], 
                  // zoomOut:[["Control", "scrollBackward"]], 
                  // zoomIn:[["Control", "scrollForward"]], 
                  previousButton:[["ArrowLeft"]], 
                  nextButton:[["ArrowRight"]],
                  zenMode:[["z"]]
                  },
      generatingShortcut: [],
      keysDown: [],
      imgHeightLarger: false,
      imgDimensions: {width:1000, height:100},
      rendering: false,
      zoomFactor: 30,
      zoomValues: {scale:100, top:0, left:0},
      zoomArray: [],
      automaticAnnotation: false


      

    };
  }

  

    render() { 
        return ( 
          <div className={`workbench ${this.props.zenMode ? 'workbench__zenOn ' : 'workbench__zenOff'}`} >
            <Menu getUploadedImages={this.handleUploadedImages} 
                  shortcuts={this.state.shortcuts} 
                  activateShortcutMode={this.activateShortcutMode}
                  zenMode={this.props.zenMode}
                  arrayCompare={this.arrayCompare}
                  keysDown={this.state.keysDown}
                  removeShortcut={this.removeShortcut}
                  updateSettings={this.updateSettings}
                  zoomFactor={this.state.zoomFactor}
                  />
                  
            <div className={`mainbench__container ${this.props.zenMode ? 'mainbench__container__zenOn ' : 'mainbench__container__zenOff'}`}>
              <div className="mainbench">
                <ToolBox getCurrentTool={(currentTool) => (this.updateCurrentTool(currentTool))}
                         shortcuts={this.state.shortcuts}
                         zenMode={this.props.zenMode}
                         arrayCompare={this.arrayCompare}
                         keysDown={this.state.keysDown}
                         
                        />
                <Canvas rectRef={this.rectRef} 
                        boundingRef={this.boundingRef}
                        annotation={this.state.annotations[this.state.index]} 
                        annotations={this.state.annotations} 
                        cursorX={this.state.cursorX} 
                        cursorY={this.state.cursorY} 
                        tool={this.state.tool}
                        getRects={this.updateStoredRects}
                        currentScaleFactor={this.state.currentScaleFactor}
                        currentTag={this.state.currentTag}
                        removeRect={this.removeRect}
                        currentRect={this.state.currentRect}
                        currentRectModifier={this.state.currentRectModifier}
                        clickLocation={this.state.clickLocation}
                        updateClickLocation={this.updateClickLocation}
                        addCurrentRect={this.addCurrentRect}
                        storeRectModification={this.storeRectModification}
                        checkValue = {this.checkValue}
                        zenMode={this.props.zenMode}
                        imgDimensions={this.state.imgDimensions}
                        updateCurrentRectCoords={this.updateCurrentRectCoords}
                        currentRectModifiedCoords={this.state.currentRectModifiedCoords}
                        zoomFactor={this.state.zoomFactor}
                        zoomValues={this.state.zoomValues}
                        arrayCompare={this.arrayCompare}
                        keysDown={this.state.keysDown}
                        automaticAnnotation={this.state.automaticAnnotation}
                />
                        
              </div>
            </div>
            <Tags annotation={this.state.annotations[this.state.index]}
                  currentTag={this.state.currentTag} 
                  getCurrentTag={this.updateCurrentTag}
                  zenMode={this.props.zenMode}
                  arrayCompare={this.arrayCompare}
                  keysDown={this.state.keysDown}
                  
                  />
          </div>
         );
    }
    tryAxios() {
      console.log("click")
      // console.log(this.state.annotations[0].imgRef)


      // axios
      //   .get("/testing/hello")
      //   // .get("/api/annotations/")
      //   .then( (res) => console.log(res) )
      //   .catch( (err) => console.log("error" + err) );


      // document.getElementById("mainImage").src = res.data[8].image 
      // document.getElementById("mainImage").src = this.state.annotations[0].imgRef
      function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
      }
      const csrftoken = getCookie('csrftoken');
      
      const formData = new FormData();

      formData.append("title", "burritoo");
      formData.append("description", "nacho");
      formData.append("completed", true);
      // formData.append("image", this.state.annotations[0].imgRef);
      formData.append("csrfmiddlewaretoken", csrftoken)
      // {title: "burrito", description: "this is burrito", completed: false, image: logo}
      axios
        .post("/api/annotations/", formData)
        .then( (res) => console.log(res) )
    };

    checkValue(img, value, dimension, natural) {
      if(natural) {
        if(dimension === "x") {
          if(value > img.naturalWidth) {
            return img.naturalWidth;
          }
          if(value < 0) {
            return 0;
          }
          return value;
        };
        if(dimension === "y") {
          if(value > img.naturalHeight) {
            return img.naturalHeight;
          }
          if(value < 0) {
            return 0;
          }
          return value;
        };
      }
      else {
        if(dimension === "x") {
          if(value > img.width) {
            return img.width;
          }
          if(value < 0) {
            return 0;
          }
          return value;
        };
        if(dimension === "y") {
          if(value > img.height) {
            return img.height;
          }
          if(value < 0) {
            return 0;
          }
          return value;
        };

      }
    };

    arrayCompare(_arr1, _arr2) {
      if (
        !Array.isArray(_arr1)
        || !Array.isArray(_arr2)
        || _arr1.length !== _arr2.length
        ) {
          return false;
        }
      
      // .concat() to not mutate arguments
      const arr1 = _arr1.concat().sort();
      const arr2 = _arr2.concat().sort();
      
      for (let i = 0; i < arr1.length; i++) {
          if (arr1[i] !== arr2[i]) {
              return false;
           }
      }
      
      return true;
    }

    updateSettings(setting, value) {
      if(setting == "zoomProcent") {
        this.setState({zoomFactor: value});
      }
      if(setting == "algorithm") {
        // console.log(document.getElementById("algorithm").value)
        this.setState({automaticAnnotation: value});
      }

      
    }

    toggleZenMode() {
      this.setState({zoomArray:[], zoomValues: {scale:100, top:0, left:0}});
      this.props.updateZenMode();
      this.checkScaleFactor();
    }

    zoomIn(event) {
      console.log(event)
      // console.log(this.state.annotations[this.state.index].rects[0].x2)
      if(event.deltaY < 0 && event.shiftKey) {

        if( event.target.closest("#image__boundary") !== null ) {
          let copyArray = [...this.state.zoomArray];
          copyArray.push(this.state.zoomValues);
          this.setState({zoomArray:copyArray});
          let boundary = document.getElementById("image__boundary").getBoundingClientRect();
          let image = {height:boundary.height*this.state.zoomValues.scale/100, width:boundary.width*this.state.zoomValues.scale/100}
          let posLeft = this.state.zoomValues.left;
          let posTop = this.state.zoomValues.top;
          let widthIncrease = image.width*this.state.zoomFactor/100;
          let heightIncrease = image.height*this.state.zoomFactor/100;
          // let widthIncrease = image.width*(this.state.zoomFactor / this.state.zoomValues.scale);
          // let heightIncrease = image.height*(this.state.zoomFactor / this.state.zoomValues.scale);
          let clickExtraX = (this.state.cursorX - boundary.left)
          let clickExtraY = (this.state.cursorY - boundary.top)
          
          let newWidth = image.width + widthIncrease;
          let newHeight = image.height + heightIncrease;
          let fractionX = (-posLeft + clickExtraX) / image.width;
          let fractionY = (-posTop + clickExtraY) / image.height;
          
          let newLeft = ( posLeft - (widthIncrease * fractionX) ) 
          let newTop = ( posTop - (heightIncrease * fractionY) ) 
          
          // let scale = this.state.zoomValues.scale + this.state.zoomFactor;
          let scale = this.state.zoomValues.scale + this.state.zoomValues.scale*this.state.zoomFactor/100;
          this.setState( {zoomValues:{scale:scale,top:newTop,left:newLeft}} );
        }
      }
      }
      
      zoomOut(event) {
      if(event.deltaY > 0 && event.shiftKey) {
        if(this.state.zoomArray.length > 0) {
          let copyArray = [...this.state.zoomArray];
          let zoomValues = copyArray.pop();
          this.setState({zoomValues:zoomValues, zoomArray:copyArray});
        }
     }
      // let boundary = document.getElementById("image__boundary").getBoundingClientRect();
      // let partitionX = (this.state.cursorX - boundary.left) / boundary.width;
      // let partitionY = (this.state.cursorY - boundary.top) / boundary.height;
      // let scale = this.state.zoomValues.scale;
      // let top, left;
      // scale = scale - this.state.zoomFactor;
      // if(scale < 100) {
      //   scale = 100;
      // }
      // else {
      //   top = this.state.zoomValues.top  + partitionY * this.state.zoomFactor;
      //   left = this.state.zoomValues.left + partitionX * this.state.zoomFactor;
      //   scale = scale - this.state.zoomFactor;
      // }
      // this.setState( {zoomValues:{scale:scale,top:top,left:left}} );
    }

    setKeyDown(event) {
      console.log(this.state.keysDown);
      if(!this.state.keysDown.includes(event.key) && !this.state.shortcuts.currentlyCreating && event.key !== undefined) {
        let keysArray = [...this.state.keysDown];
        keysArray.push(event.key);
        // this.setState((state) => {keysDown:state.keysDown.push(event.key)})
        this.setState({keysDown:keysArray});
      }
      if(!this.state.shortcuts.currentlyCreating && event.key === undefined && !(this.state.keysDown.includes("scrollForward") || this.state.keysDown.includes("scrollBackward"))) {
        let value = (event.deltaY < 0) ? "scrollForward" : "scrollBackward";
        let keysArray = [...this.state.keysDown];
        keysArray.push(value);
        this.setState({keysDown:keysArray});
      }
    }

    setKeyUp(event) {
      //console.log(this.state.keysDown);
      if(event.key && this.state.keysDown.length > 0) {

        let keysArray = [...this.state.keysDown];
        let index = keysArray.indexOf(event.key);
        if(index >= 0) {
          keysArray.splice(index,1)
          this.setState({keysDown:keysArray});
        }
      }
    }
    checkShortcuts(event) {
      let keysDownArray = [...this.state.keysDown];
      if(!keysDownArray.includes(event.key)){
        keysDownArray.push(event.key);
      };
      this.state.shortcuts.zenMode.forEach((shortcut) => {
        if(this.arrayCompare(shortcut, keysDownArray)) {
          this.toggleZenMode();
        }
      }
      );
    }

    removeShortcut(name, index) {
      let shortcuts = {...this.state.shortcuts};
      shortcuts[name].splice(index,1);
      this.setState({shortcuts:shortcuts});
    }

    addShortcutKey(event) {
      event.preventDefault();
      event.stopPropagation(); 
      if(!this.state.generatingShortcut.includes(event.key) && event.key !== undefined ) {
        let shortcutArray = this.state.generatingShortcut;
        shortcutArray.push(event.key);
        this.setState({generatingShortcut:shortcutArray});
      }

      if(event.key === undefined && event.deltaY && !(this.state.generatingShortcut.includes("scrollForward") || this.state.generatingShortcut.includes("scrollBackward"))) {
        let shortcutArray = this.state.generatingShortcut;
        let value = (event.deltaY < 0) ? "scrollForward" : "scrollBackward";
        shortcutArray.push(value);
        this.setState({generatingShortcut:shortcutArray});
      }

    }

    activateShortcutMode(value) {
      window.addEventListener("keydown", this.addShortcutKey );
      window.addEventListener("keyup", this.disableShortcutMode );
      window.addEventListener("wheel", this.addShortcutKey, { passive: false });
      let shorts = {...this.state.shortcuts};
      shorts["currentShort"] = value;
      shorts["currentlyCreating"] = true;
      this.setState({shortcuts:shorts});

      // shorts[value].push(value);
      // this.setState({shortcuts:shorts});
    }

    disableShortcutMode() {
      window.removeEventListener("keydown", this.addShortcutKey );
      window.removeEventListener("keyup", this.disableShortcutMode );
      window.removeEventListener("wheel", this.addShortcutKey, { passive: false });
      //let setting = [...new Set(this.state.generatingShortcut)];
      //console.log(this.state.generatingShortcut);
      let shorts = {...this.state.shortcuts};
      shorts[shorts["currentShort"]].push(this.state.generatingShortcut); 
      shorts["currentShort"] = null;
      shorts["currentlyCreating"] = false;
      this.setState({shortcuts:shorts});
      this.setState({generatingShortcut:[]});
    }

    storeRectModification() {
      if(this.state.currentRectModifiedCoords !== null) {
        let img = document.getElementById("mainImage");
        let x1 = this.checkValue(img, this.state.currentRectModifiedCoords.x1, "x", true);
        let y1 = this.checkValue(img, this.state.currentRectModifiedCoords.y1, "y", true);
        let x2 = this.checkValue(img, this.state.currentRectModifiedCoords.x2, "x", true);
        let y2 = this.checkValue(img, this.state.currentRectModifiedCoords.y2, "y", true);
        let annotations = [...this.state.annotations];
        annotations[this.state.index].rects.push({ x1:x1, y1:y1,x2:x2 ,y2:y2, tag:this.state.currentRect[0].tag, id:this.state.currentRect[0].id});
        this.setState({annotations:annotations});
        this.setState({clickLocation:null, currentRect:null, currentRectModifier:null, currentRectModifiedCoords:null});
        window.removeEventListener("mouseup", this.storeRectModification)
        window.removeEventListener("mousemove", this.getModifierCoords)
      }
    }

    getModifierCoords(coord) {
      let x1,x2,y1,y2;
      let rect = this.state.currentRect[0];
      if(this.state.currentRectModifier === "normal") {
        x1 = rect.x1+(this.state.cursorX-this.state.clickLocation.x)*this.state.currentScaleFactor.xScaleFactor/(this.state.zoomValues.scale/100);
        y1 = rect.y1+(this.state.cursorY-this.state.clickLocation.y)*this.state.currentScaleFactor.yScaleFactor/(this.state.zoomValues.scale/100);
        x2 = rect.x2+(this.state.cursorX-this.state.clickLocation.x)*this.state.currentScaleFactor.xScaleFactor/(this.state.zoomValues.scale/100);
        y2 = rect.y2+(this.state.cursorY-this.state.clickLocation.y)*this.state.currentScaleFactor.yScaleFactor/(this.state.zoomValues.scale/100);
      }
      if(this.state.currentRectModifier === "middleTop") {
        x1 = rect.x1;
        y1 = rect.y1+(this.state.cursorY-this.state.clickLocation.y)*this.state.currentScaleFactor.yScaleFactor/(this.state.zoomValues.scale/100);
        x2 = rect.x2;
        y2 = rect.y2;
      }
      if(this.state.currentRectModifier === "topLeft") {
        x1 = rect.x1+(this.state.cursorX-this.state.clickLocation.x)*this.state.currentScaleFactor.xScaleFactor/(this.state.zoomValues.scale/100);
        y1 = rect.y1+(this.state.cursorY-this.state.clickLocation.y)*this.state.currentScaleFactor.yScaleFactor/(this.state.zoomValues.scale/100);
        x2 = rect.x2;
        y2 = rect.y2;
      }
      if(this.state.currentRectModifier === "topRight") {
        x1 = rect.x1;
        y1 = rect.y1+(this.state.cursorY-this.state.clickLocation.y)*this.state.currentScaleFactor.yScaleFactor/(this.state.zoomValues.scale/100);
        x2 = rect.x2+(this.state.cursorX-this.state.clickLocation.x)*this.state.currentScaleFactor.xScaleFactor/(this.state.zoomValues.scale/100);
        y2 = rect.y2;
      }
      if(this.state.currentRectModifier === "middleLeft") {
        x1 = rect.x1+(this.state.cursorX-this.state.clickLocation.x)*this.state.currentScaleFactor.xScaleFactor/(this.state.zoomValues.scale/100);
        y1 = rect.y1
        x2 = rect.x2;
        y2 = rect.y2;
      }
      if(this.state.currentRectModifier === "middleRight") {
        x1 = rect.x1;
        y1 = rect.y1;
        x2 = rect.x2+(this.state.cursorX-this.state.clickLocation.x)*this.state.currentScaleFactor.xScaleFactor/(this.state.zoomValues.scale/100);
        y2 = rect.y2;
      }
      if(this.state.currentRectModifier === "bottomLeft") {
        x1 = rect.x1+(this.state.cursorX-this.state.clickLocation.x)*this.state.currentScaleFactor.xScaleFactor/(this.state.zoomValues.scale/100);
        y1 = rect.y1;
        x2 = rect.x2;
        y2 = rect.y2+(this.state.cursorY-this.state.clickLocation.y)*this.state.currentScaleFactor.yScaleFactor/(this.state.zoomValues.scale/100);
      }
      if(this.state.currentRectModifier === "middleBottom") {
        x1 = rect.x1;
        y1 = rect.y1;
        x2 = rect.x2;
        y2 = rect.y2+(this.state.cursorY-this.state.clickLocation.y)*this.state.currentScaleFactor.yScaleFactor/(this.state.zoomValues.scale/100);
      }
      if(this.state.currentRectModifier === "bottomRight") {
        x1 = rect.x1;
        y1 = rect.y1;
        x2 = rect.x2+(this.state.cursorX-this.state.clickLocation.x)*this.state.currentScaleFactor.xScaleFactor/(this.state.zoomValues.scale/100);
        y2 = rect.y2+(this.state.cursorY-this.state.clickLocation.y)*this.state.currentScaleFactor.yScaleFactor/(this.state.zoomValues.scale/100);
      }
      this.updateCurrentRectCoords({x1:x1,x2:x2,y1:y1,y2:y2});
      if(coord === "x1") {
        return x1
      } 
      if(coord === "y1") {
        return y1
      } 
      if(coord === "x2") {
        return x2
      } 
      if(coord === "y2") {
        return y2;
      } 
    }

    updateCurrentRectCoords(coords) {
      this.setState({currentRectModifiedCoords:{x1:coords.x1, x2:coords.x2, y1:coords.y1, y2:coords.y2}});
    }

    updateClickLocation(event) {
      this.setState({clickLocation:{x:event.clientX, y:event.clientY}});
      window.addEventListener("mouseup", this.storeRectModification)
    }

    updateCurrentTag(tag) {
      this.setState({currentTag: tag});
    }

    updateStoredRects(x1, y1, x2, y2) {
      // xPositionRelativeReal
      // console.log(this.state.annotations);
      let annotations = [...this.state.annotations];
      annotations[this.state.index].rects.push({ x1:x1, y1:y1,x2:x2 ,y2:y2, tag:this.state.currentTag, id:this.state.idIndex});
      // this.state.annotations[this.state.index].rects.push({ x1:x1, y1:y1,x2:x2 ,y2:y2, tag:this.state.currentTag, id:this.state.idIndex});
      this.setState({annotations:annotations});
      this.setState( (state) => ({idIndex: state.idIndex + 1}) );
    }

    findRect(rect) {
      let id = rect.id.substring(4);
      let annotations = [...this.state.annotations];
      let index1 = -1;
      let index2 = -1;
      annotations.forEach((annotation, indx1) => {
        annotation.rects.forEach((rectObj,indx2) => {
          let idObj = rectObj.id;
          if (idObj == id) {
            index1 = indx1;
            index2 = indx2;
          }
        })
      })
      if(index1 >= 0){
        return {index1:index1, index2:index2};
      }
      else{
        return null;
      }
    }

    removeRect(rect) {
      if(this.state.tool === "cursor") {
        let index = this.findRect(rect);
        if(index != null){
          let annotations = [...this.state.annotations];
          annotations[index.index1].rects.splice(index.index2,1);
          this.setState({annotations:annotations});
        }
      }
      //console.log(this.state.currentRectModifier)
    }

    addCurrentRect(rect, modifier) {
      let index = this.findRect(rect);
        if(index != null){
          let annotations = [...this.state.annotations];
          let rect = annotations[index.index1].rects[index.index2];
          this.setState({currentRect:[rect]});
          this.setState({currentRectModifier:modifier});
          this.setState({currentRectModifiedCoords:{x1:rect.x1,x2:rect.x2,y1:rect.y1,y2:rect.y2}});
          window.addEventListener("mousemove", this.getModifierCoords);
        }
    }

    updateRectDrag(rect, x1, y1, x2, y2) {
      if(this.state.tool === "cursor") {
        let id = rect.id.substring(4);
        let annotations = [...this.state.annotations];
        for (let annotation of annotations) {
          let value = false;
          for (let rectObj of annotation.rects) {
            let idObj = rectObj.id;
            if (idObj == id) {
              value = rectObj;
            }
          }
          if(value){
            let index = annotation.rects.indexOf(value);
            let copyAnnotation = [...annotation.rects]
            annotation.rects[index] = { x1:x1, y1:y1,x2:x2 ,y2:y2, tag:copyAnnotation.rects[index].tag, id:copyAnnotation.rects[index].id};
          }
        }
        this.setState({annotations:annotations});
      }
    }

    updateCurrentTool(currentTool) {
      // console.log(this.state.annotations)
      //window.removeEventListener("wheel", this.zoomIn);
      //window.removeEventListener("wheel", this.zoomOut);
      if (currentTool === "cursor"){
        this.setState({tool: currentTool});
      }
      if (currentTool === "drawRect"){
        this.setState({tool: currentTool});
      }
      if (currentTool === "zoomIn"){
        this.setState({tool: currentTool});
        //window.addEventListener("wheel", this.zoomIn);
      }
      if (currentTool === "zoomOut"){
        this.setState({tool: currentTool});
        //window.addEventListener("wheel", this.zoomOut);
      }
      
      if (currentTool === "nextButton") {
        this.setState({zoomArray:[], zoomValues: {scale:100, top:0, left:0}});
        let annotationLength = this.state.annotations.length;
        let currentIndex = this.state.index;
        if (annotationLength > 0 && currentIndex+1 < annotationLength) {
          function getCookie(name) {
            let cookieValue = null;
            if (document.cookie && document.cookie !== '') {
                const cookies = document.cookie.split(';');
                for (let i = 0; i < cookies.length; i++) {
                    const cookie = cookies[i].trim();
                    // Does this cookie string begin with the name we want?
                    if (cookie.substring(0, name.length + 1) === (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
          }
          const csrftoken = getCookie('csrftoken');
          const start = Date.now();
          console.log(this.state.annotations[this.state.index].rects[0]);
          console.log(this.state.annotations)
          let formData = new FormData(); // 2
          formData.append("title", JSON.stringify(this.state.annotations[this.state.index].rects[0]))  
          formData.append("note", JSON.stringify(this.state))
          formData.append("csrfmiddlewaretoken", csrftoken) // 3
          // formData.append("title", "burritoo");
          // formData.append("description", "nacho");
          // formData.append("completed", true);
          // formData.append("image", this.state.annotations[0].imgRef);
          
          axios
          .post("/testing/hello", formData)
          .then( (res) => this.automateRect(res,start) )
          .catch( (err) => console.log("error" + err) );

    
                // document.getElementById("mainImage").src = res.data[8].image 
      // const formData = new FormData();

      // formData.append("title", "burritoo");
      // formData.append("description", "nacho");
      // formData.append("completed", true);
      // formData.append("image", this.state.annotations[0].imgRef);
      // // {title: "burrito", description: "this is burrito", completed: false, image: logo}
      // axios
      //   .post("/api/annotations/", formData)
      //   .then( (res) => console.log(res) )

          this.updateImage(currentIndex + 1);
          this.setState((state) => ({index: state.index + 1}));
        };
      };
      if (currentTool === "previousButton") {
        this.setState({zoomArray:[], zoomValues: {scale:100, top:0, left:0}});
        let annotationLength = this.state.annotations.length;
        let currentIndex = this.state.index;
        if (annotationLength > 0 && currentIndex > 0) {
          this.updateImage(currentIndex - 1);
          this.setState((state) => ({index: state.index - 1}));
        };
      };
    };

    automateRect(res,start) {
      let finish = Date.now();
      console.log(finish - start)
      // console.log("hello")
      // console.log(this.state.annotations[this.state.index-1])
      let BoundingBox = res.data
      let rectArray = this.state.annotations[this.state.index-1].rects;
      if (rectArray.length > 0) {
        let rect = {...rectArray[rectArray.length - 1]}
        rect.x1 = parseFloat(BoundingBox.xmin);
        rect.y1 = parseFloat(BoundingBox.ymin);
        rect.x2 = parseFloat(BoundingBox.xmax);
        rect.y2 = parseFloat(BoundingBox.ymax);
        rect.id = this.state.idIndex + 1;
        console.log(rect)
        // this.state.annotations[this.state.index+1].rects.push(rect);
        let annotations = [...this.state.annotations];
        annotations[this.state.index].rects.push(rect);
      // this.state.annotations[this.state.index].rects.push({ x1:x1, y1:y1,x2:x2 ,y2:y2, tag:this.state.currentTag, id:this.state.idIndex});
        this.setState({annotations:annotations});
      }
      this.setState( (state) => ({idIndex: state.idIndex + 1}) );
    }

    updateImage(index) {
      const img = document.getElementById("mainImage");
      let file = this.state.annotations[index].imgRef;
      let reader = new FileReader();
      reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result;}; })(img);
      reader.readAsDataURL(file);
      reader.onloadend = () => this.checkScaleFactor();
    }

    handleUploadedImages() {
      //stores the images from the upload button and constructs the object structure.
      const selectedFiles = document.getElementById('uploadFilesInput').files;
      let annotationArray = []
      for (let i = 0; i < selectedFiles.length; i++) {
        let file = selectedFiles[i];
        let annotationObject = {
          imgRef: file,
          rects: [],
        }
        annotationArray.push(annotationObject);
      };
      this.setState({index:0, annotations: annotationArray});

      // Renders the first image
      const img = document.getElementById("mainImage");
      const selectedFile = document.getElementById('uploadFilesInput').files[0];
      let reader = new FileReader();
      reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result;}; })(img);
      reader.readAsDataURL(selectedFile);
      reader.onloadend = () => this.checkScaleFactor();
    }

    checkScaleFactor() {
      let img = document.getElementById("mainImage");
      let container = document.getElementById("image__container");
      let containerRatio = container.offsetHeight / container.offsetWidth;
      // let imgWidth = img.width;
      // let imgHeight = img.height;
      let imgRealWidth = img.naturalWidth;
      let imgRealHeight = img.naturalHeight;
      // let xScaleFactor = imgRealWidth / imgWidth;
      // let yScaleFactor =  imgRealHeight / imgHeight;
      if(imgRealHeight/imgRealWidth > containerRatio) {
        let height = container.offsetHeight;
        let width = height * imgRealWidth/imgRealHeight;
        this.setState({imgDimensions:{height:height, width:width}}, () => this.setScaleFactor())
      };
      if(imgRealHeight/imgRealWidth <= containerRatio) {
        let width = container.offsetWidth;
        let height = width * imgRealHeight/imgRealWidth;
        this.setState({imgDimensions:{height:height, width:width}}, () => this.setScaleFactor())
      };
    };
      
    setScaleFactor() {
      let img = document.getElementById("mainImage");
      let container = document.getElementById("image__container");
      // let containerRatio = container.offsetHeight / container.offsetWidth;
      let imgWidth = img.width;
      let imgHeight = img.height;
      let imgRealWidth = img.naturalWidth;
      let imgRealHeight = img.naturalHeight;
      let xScaleFactor = imgRealWidth / imgWidth;
      let yScaleFactor =  imgRealHeight / imgHeight;
      this.setState({currentScaleFactor: {xScaleFactor:xScaleFactor, yScaleFactor:yScaleFactor, real:img.naturalWidth}});
      this.setState({imgHeight: imgHeight, rendering:false});
    }

    // debugger() {
    //   // console.log(this.state.currentRect);
    //   // console.log(this.state.index);
    //   // console.log(this.state.annotations);
    //   // console.log(document.getElementById("mainImage").width)
    // }

    componentDidMount() {
      window.addEventListener("mousemove", (e) => ( this.setState( {cursorX:e.clientX, cursorY:e.clientY}) ));
      this.checkScaleFactor();
      window.addEventListener('resize', this.checkScaleFactor);
      window.addEventListener('load', this.checkScaleFactor);
      window.addEventListener('keydown', this.setKeyDown);
      window.addEventListener('keydown', this.checkShortcuts);
      window.addEventListener('keyup', this.setKeyUp);
      // window.addEventListener("wheel", this.setKeyDown, { passive: false });
      window.addEventListener("wheel", this.zoomIn);
      window.addEventListener("wheel", this.zoomOut);
      window.setInterval(this.debugger, 2000);
    };
    componentWillUnmount() {
      window.addEventListener("mousemove", null);
      window.removeEventListener('resize', this.checkScaleFactor);
      window.removeEventListener('load', this.checkScaleFactor);
      window.removeEventListener('keydown', this.setKeyDown);
      window.removeEventListener('keydown', this.checkShortcuts);
      window.removeEventListener('keyup', this.setKeyUp);
      // window.removeEventListener("wheel", this.setKeyDown, { passive: false });
      window.removeEventListener("wheel", this.zoomOut);
    };

}
 
export default WorkBench;