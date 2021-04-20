import React from "react";
import Sketch from "react-p5";
import p5Types from "p5";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

interface ImageSketchProps {
  imageLocalURL: string;
}

// Styles for the Pop-up
const contentStyle = { background: "#000" };
const overlayStyle = { background: "rgba(0,0,0,0.5)" };
const arrowStyle = { color: "#000" };

const ImageSketch: React.FC<ImageSketchProps> = (props: ImageSketchProps) => {
  let img: p5Types.Image;
  let canvas;

  const preload = (p5: p5Types) => {
    img = props.imageLocalURL
      ? p5.loadImage(props.imageLocalURL)
      : p5.loadImage(`${process.env.PUBLIC_URL}/Monkey.jpg`);
  };

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    if (img) {
      canvas = p5.createCanvas(img.width, img.height);
      let canvasX = (p5.windowWidth - img.width) / 2;
      let canvasY = (p5.windowHeight - img.height) / 2;
      canvas.position(canvasX, canvasY);
      // TODO: Manipulate pixel values
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

  return (
    <Popup
      trigger={<button> View new image</button>}
      position="center center"
      {...{ contentStyle, overlayStyle, arrowStyle }}
    >
      <div style={{ width: "100%", height: "100%" }}>
        <Sketch setup={setup} draw={draw} preload={preload} />
      </div>
    </Popup>
  );
};

export default ImageSketch;
