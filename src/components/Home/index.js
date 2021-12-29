import React from "react";
import AboutUs from "./AboutUs/AboutUs";
import Members from "./Members/Members";
import Order from "./Order/Order";
import Service from "./Service/Service";
import SliderBar from "./SliderBar/SliderBar";
import News from "./News/News";
import Contact from "./Contact/Contact";
import Ourpartner from "./Ourpartner/Ourpartner";
// import Chatbox from "../ChatBox/Chatbox";
export default function index() {
  return (
    <>
      <SliderBar />
      {/* <Chatbox /> */}
      <div className="main">
        <AboutUs />
        <Service />
        <Order />
        <Members />
        <News />
        <Contact style={{ width: "100%" }} />
        <Ourpartner />
      </div>
    </>
  );
}
