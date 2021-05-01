import React, { Dispatch, SetStateAction, useState } from "react";
import Sketch from "react-p5";
import p5Types from "p5";
import { Redirect, useHistory } from "react-router";

interface ImageSketchProps {
  imageLocalURL: string;
  setImageUrl: Dispatch<SetStateAction<string>>;
}

const ImageSketch: React.FC<ImageSketchProps> = (props: ImageSketchProps) => {
  const history = useHistory();
  let img: p5Types.Image;
  let canvas;
  const [imageUrl, setImageUrl] = useState(props.imageLocalURL);
  console.log(imageUrl);
  const preload = (p5: p5Types) => {
    img = imageUrl
      ? p5.loadImage(imageUrl)
      : p5.loadImage(`${process.env.PUBLIC_URL}/Monkey.jpg`);
  };

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    if (img) {
      canvas = p5.createCanvas(img.width, img.height);
      let canvasX = (p5.windowWidth - img.width) / 2;
      let canvasY = (p5.windowHeight - img.height) / 2;
      canvas.position(canvasX, canvasY);

      for (let column = 0; column < img.width; column += 2) {
        for (let row = 0; row < img.height; row += 2) {
          let xCoord = column;
          let yCoord = row;
          let pixel = img.get(xCoord, yCoord);
          p5.push();
          p5.translate(xCoord, yCoord);
          p5.noFill();
          p5.stroke(p5.color(pixel));
          p5.strokeWeight(p5.random(5));
          p5.curve(
            xCoord,
            yCoord,
            p5.sin(xCoord) * p5.random(60),
            p5.cos(xCoord) * p5.sin(xCoord) * p5.random(90),
            p5.random(10),
            p5.random(80),
            p5.cos(yCoord) * p5.sin(yCoord) * p5.random(140),
            p5.cos(yCoord) * p5.sin(yCoord) * 50
          );
          p5.pop();
        }
      }
    }
  };

  const draw = (p5: p5Types) => {};
  console.log("We are here");

  return imageUrl ? (
    <div style={{ width: "100%", height: "100%" }}>
      <Sketch setup={setup} draw={draw} preload={preload} />
      <button
        onClick={() => {
          props.setImageUrl("");
          setImageUrl("");
          history.push("/");
        }}
      >
        Reset
      </button>
    </div>
  ) : (
    <Redirect exact to="/" />
  );
};

export default ImageSketch;
