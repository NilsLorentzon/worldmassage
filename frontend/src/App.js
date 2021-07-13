import './App.css';
import React, {Component} from 'react';
import Header from "./components/header"
import Home from "./components/home"
import Footer from "./components/footer"
import Info from "./components/info"


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "home",
    };
  }
  render() {
    return (
      <>
        <Header></Header>
        {
          this.state.page === "home" &&
          <Home></Home>
        }
        <Info></Info>
        
        <Footer></Footer>
      </>  
    );
    }
}

export default App;
