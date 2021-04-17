import React from "react";
import Sketch from "react-p5";
import p5Types from "p5";

interface ImageSketchProps {
  imageLocalURL: string;
}

const ImageSketch: React.FC<ImageSketchProps> = (props: ImageSketchProps) => {
  let img: p5Types.Image;
  let canvas;

  const preload = (p5: p5Types) => {
    img = props.imageLocalURL
      ? p5.loadImage(props.imageLocalURL)
      : p5.loadImage(`${process.env.PUBLIC_URL}/Monkey.jpg`);
  };

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    console.log(img);

    if (img) {
      canvas = p5.createCanvas(img.width, img.height);
      let canvasX = (p5.windowWidth - img.width) / 2;
      let canvasY = (p5.windowHeight - img.height) / 2;
      canvas.position(canvasX, canvasY);

      for (let column = 0; column < img.width; column += 1) {
        for (let row = 0; row < img.height; row += 1) {
          let pixel = img.get(column, row);
          p5.stroke(p5.color(pixel));
          p5.strokeWeight(1);
          p5.point(column, row);
        }
      }
    }
  };

  const draw = (p5: p5Types) => {};

  return <Sketch setup={setup} draw={draw} preload={preload} />;
};

export default ImageSketch;
