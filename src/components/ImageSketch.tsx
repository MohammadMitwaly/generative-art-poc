import React from "react";
import Sketch from "react-p5";
import p5Types from "p5";

interface ImageSketchProps {
  imageLocalURL: string;
}

const ImageSketch: React.FC<ImageSketchProps> = (props: ImageSketchProps) => {
  let img: p5Types.Image;
  const preload = (p5: p5Types) => {
    img = props.imageLocalURL
      ? p5.loadImage(props.imageLocalURL)
      : p5.loadImage("/Monkey.jpg");
  };

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(500, 500).parent(canvasParentRef);
    img && p5.image(img, 0, 0);
  };

  const draw = (p5: p5Types) => {
    let canvasX = (p5.windowWidth - img.width) / 2;
    let canvasY = (p5.windowHeight - img.height) / 2;
    for (let column = 0; column < img.width; column += 8) {
      for (let row = 0; row < img.height; row += 8) {
        let pixel = img.get(column, row);
        let r = p5.random(255); // r is a random number between 0 - 255
        let g = p5.random(100, 200); // g is a random number betwen 100 - 200
        let b = p5.random(100); // b is a random number between 0 - 100
        let a = p5.random(200, 255); // a is a random number between 200 - 255
        p5.stroke(r, g, b, a);
        p5.strokeWeight(12);
        p5.point(column, row);
      }
    }
    p5.noLoop();
  };

  return <Sketch setup={setup} draw={draw} preload={preload} />;
};

export default ImageSketch;
