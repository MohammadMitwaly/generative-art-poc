import React from "react";
import Sketch from "react-p5";
import p5Types from "p5";

interface ImageSketchProps {}

const ImageSketch: React.FC<ImageSketchProps> = (props: ImageSketchProps) => {
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(500, 500).parent(canvasParentRef);
  };

  const draw = (p5: p5Types) => {
    p5.background("pink");
  };

  return <Sketch setup={setup} draw={draw} />;
};

export default ImageSketch;
