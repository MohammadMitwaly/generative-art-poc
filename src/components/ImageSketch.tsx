import React from "react";
import Sketch from "react-p5";
import p5Types from "p5";
import "../App.css";

interface ImageSketchProps {}

const ImageSketch: React.FC<ImageSketchProps> = (props: ImageSketchProps) => {
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(500, 500).parent(canvasParentRef);
  };

  const draw = (p5: p5Types) => {
    p5.background(0);
  };

  return <Sketch className="App" setup={setup} draw={draw} />;
};

export default ImageSketch;
