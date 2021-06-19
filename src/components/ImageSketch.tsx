import React, { Dispatch, SetStateAction, useState } from "react";
import Sketch from "react-p5";
import p5Types from "p5";
import { Redirect, useHistory } from "react-router";
import "../App.css";

interface ImageSketchProps {
  imageLocalURL: string;
  setImageUrl: Dispatch<SetStateAction<string>>;
}

const ImageSketch: React.FC<ImageSketchProps> = (props: ImageSketchProps) => {
  const history = useHistory();
  const [image, setImage] = useState<undefined | p5Types.Renderer>(undefined);
  const [p5Instance, setP5Instance] = useState<undefined | p5Types>();
  let img: p5Types.Image;
  let canvas;
  const [imageUrl, setImageUrl] = useState(props.imageLocalURL);
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
      setImage(canvas);
      setP5Instance(p5);
    }
  };

  const draw = (p5: p5Types) => {};
  return imageUrl ? (
    <div style={{ width: "100%", height: "100%" }}>
      <button
        onClick={() => {
          props.setImageUrl("");
          setImageUrl("");
          history.push("/generative-art-poc");
        }}
        style={{
          position: "absolute",
          top: "20px",
          border: "none",
          height: "30px",
          borderRadius: "8%",
          backgroundColor: "rgb(242, 235, 235)",
          color: "hsl(0, 1%, 18%)",
          fontWeight: "bold",
          fontFamily: "Roboto",
        }}
      >
        Reset Sketch
      </button>
      <button
        style={{
          position: "absolute",
          top: "55px",
          height: "30px",
          borderRadius: "8%",
          border: "none",
          backgroundColor: "rgb(242, 235, 235)",
          color: "hsl(0, 1%, 18%)",
          fontWeight: "bold",
          fontFamily: "Roboto",
        }}
        onClick={() => {
          p5Instance && p5Instance.save(image, "generated.png");
        }}
      >
        Save image
      </button>
      <Sketch setup={setup} draw={draw} preload={preload} />
    </div>
  ) : (
    <Redirect exact to="/generative-art-poc" />
  );
};

export default ImageSketch;
