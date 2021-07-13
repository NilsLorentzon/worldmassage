import React, {useEffect, useState} from 'react';
import logo from '../worldloga.png';
import './header.css';

// let prom = new Promise((resolve, reject) => {
//   return resolve(1);
//   throw Error("error")
// })
// let prom2 = new Promise(()=> {

// });
// console.log(prom2);
// console.log(Promise.resolve())
// prom.then(() => {console.log("3f")}, (err)=> {console.log(err.message)});
// console.log("sync");
async function burrito() {
  // return new Promise((resolve) => {
  //   setTimeout(()=>{resolve(2)}, 2000);
  // })
  const p = new Promise((res, rej) => {
    res(1);
  })
  return p
}

async function taco() {
  console.log(burrito());
  console.log(await burrito());
}

const p = new Promise((res, rej) => {
  res(1);
})

async function asyncReturn() {
  return p;
}

function basicReturn() {
  return Promise.resolve(p);
}

console.log(burrito())
console.log(p)
console.log(basicReturn())
console.log(Promise.resolve(1))
console.log(Promise.resolve(1) === p)
console.log(p === basicReturn()); // true
console.log(p === asyncReturn()); // false
// console.log(burrito());
// let x = taco();


function Header() {

  const [open, setOpen] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [value, setValue] = useState(0);

  useEffect(() => {
  }, [])


  // function func1() {
  //   setTimeout(()=> {
  //     console.log("func1");
  //     func2()
  //   },1000)
  // }

  // function func2() {
  //   setTimeout(()=> {
  //     console.log("func2");
  //   },1000)
  // }

  

  return ( 
    <>
    <div className="menu"
          id="menu"
    >
        <div className="logo">  
          <img className="logo__image"src={logo} alt="" onClick={() => setClicked(!clicked)}/>
        </div>
        <div className={`menu-btn${open ? ' open' : ''}`} onClick={() => setOpen(!open)}>
          <div className="menu-btn__burger"></div>
        </div>
    </div>
    <div className={`menu-items${open ? ' open' : ''}`}>
      <button className={`menu-item${open ? ' open' : ''}`}> Hem</button>
      <button className={`menu-item${open ? ' open' : ''}`}>{"Priser & Info"}</button>
      <button className={`menu-item${open ? ' open' : ''}`}> Om Oss</button>
    </div>
    </>
  )
}

export default Header;