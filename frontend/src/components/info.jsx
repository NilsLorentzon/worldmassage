import React from 'react';
import './info.css';
import './home.css';
import avatarPicture from "../profile2.jpg"
import areaPicture from "../hammaro.png"
import Arrow from "./arrow"
import Priser from "./priser"

function Info() {

    return (
        <div className="info">
            <div className="avatar">
                <div className="avatar__header">
                    <div className="avatar__picture__container">
                        <img className="avatar__picture" src={avatarPicture} alt="avatar"/>
                    </div>
                    <div className="avatar__title">
                        <span>Marie Ferre -</span>
                        <span>fysioterapist</span>
                    </div>
                </div>
                <div className="avatar__body">
                Hej jag heter Marie Ferre och är fysioterapist med tjugo års erfarenhet. 
                Jag masserar bland annat sveriges skidlandslag och även Karlstads brandkår.
                <br />
                <br />
                Jag erbjuder allt från en lugnande massage till intensiva pass gjorda för att förebygga, 
                lindra och bota hälsoproblem från sport och vardag


                </div>
            </div>
            <div className="info__bottom">
                <Priser></Priser>
                <div className="area">
                    <h3 className="area__title">Hammarö</h3>
                    <img className="area__picture" src={areaPicture} alt="massage building"/>
                    <h4 className="area__body"> Hantverksvägen 12, Skoghall</h4>
                </div>
            </div>
            <Arrow arrowText={"Kontakt"}></Arrow>

        </div>
    )
}

export default Info;