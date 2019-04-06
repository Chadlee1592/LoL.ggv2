import React, { Component } from "react";
import GoogleLogin from "./Login";
import { Typography } from "antd";
import { Fade } from "react-slideshow-image";
import "./LoginPage.css";
const { Title } = Typography;

const fadeImages = [
  "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ahri_16.jpg",
  "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Evelynn_6.jpg",
  "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Kaisa_15.jpg",
  "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Kayle_0.jpg",
  "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Brand_7.jpg"
];

const fadeProperties = {
  duration: 3000,
  transitionDuration: 1000,
  infinite: false,
  indicators: true
};

class LoginPage extends Component {
  render() {
    return (
      <>
        <div
          class="welcome-title"
          style={{ background: "#fff", padding: 24, minHeight: 80 }}
        >
          Welcome to Lol.gg
          <Title level={2}>Please login</Title>
          <p />
          <GoogleLogin
            loggedIn={this.props.loggedIn}
            loginSuccess={this.props.loginSuccess}
            logoutSuccess={this.props.logoutSuccess}
          />
          <div className="slideshow-container">
            <Fade {...fadeProperties}>
              <div className="each-fade">
                <div className="image-container">
                  <img src={fadeImages[0]} />
                </div>
              </div>
              <div className="each-fade">
                <div className="image-container">
                  <img src={fadeImages[1]} />
                </div>
              </div>
              <div className="each-fade">
                <div className="image-container">
                  <img src={fadeImages[2]} />
                </div>
              </div>
              <div className="each-fade">
                <div className="image-container">
                  <img src={fadeImages[3]} />
                </div>
              </div>
              <div className="each-fade">
                <div className="image-container">
                  <img src={fadeImages[4]} />
                </div>
              </div>
            </Fade>
          </div>
        </div>
      </>
    );
  }
}

export default LoginPage;
