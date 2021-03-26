import React from "react";
// import Carousel from 'semantic-ui-carousel-react';
import { Image } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "../App.css";
import Carousel from "./carousel/Carousel";
const App = () => {
  let elements = [
    {
      render: () => {
        return (
          <Image src="https://firebasestorage.googleapis.com/v0/b/gowes-marketplace-react.appspot.com/o/images%2FCapture.PNG?alt=media&token=c1e1f8d1-0b3c-42cc-8472-853e2b2938b2" />
        );
      },
    },
    {
      render: () => {
        return (
          <Image src="https://firebasestorage.googleapis.com/v0/b/gowes-marketplace-react.appspot.com/o/images%2FCapture1.PNG?alt=media&token=51eeb5ea-0eba-4fb7-b478-7b1ca3c4e166" />
        );
      },
    },
  ];
  return (
    <Carousel
      elements={elements}
      duration={8000}
      animation="fly left"
      showNextPrev={false}
    />
  );
};
export default App;
