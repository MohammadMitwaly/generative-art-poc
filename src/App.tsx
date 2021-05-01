import "./App.css";
import { useEffect, useState } from "react";
import ImageSketch from "./components/ImageSketch";
import { Grid, withStyles } from "@material-ui/core";
import ImageUploader from "react-images-upload";
import { Switch, Route, useHistory, Redirect } from "react-router-dom";
import imageCompression from "browser-image-compression";

const styles = {
  input: {
    color: "white",
    width: "110%",
  },
};

const App = () => {
  const [url, setUrl] = useState("");
  const history = useHistory();
  const onDrop = async (files: File[], pictures: string[]) => {
    const imageFile = files[0];
    const options = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 960,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(imageFile, options);
      const reader = new FileReader();
      reader.addEventListener(
        "load",
        function () {
          // convert image file to base64 string
          setUrl(reader.result as string);
        },
        false
      );

      if (compressedFile) {
        reader.readAsDataURL(compressedFile);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (url) {
      history.push("/sketch");
    }
  }, [url, history]);

  return (
    <div className="App">
      <Grid container style={{ minHeight: "15vh" }}>
        <Switch>
          <Route
            exact
            path="/generative-art-poc"
            render={() => {
              return (
                <Grid item style={{ margin: "10px", width: "100%" }}>
                  <ImageUploader
                    withIcon={true}
                    buttonText="Choose an image"
                    onChange={onDrop}
                    imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                    maxFileSize={5242880}
                  />
                </Grid>
              );
            }}
          ></Route>
          <Route exact path="/">
            <Redirect to="/generative-art-poc" />
          </Route>
          <Route
            path="/sketch"
            render={() => {
              return (
                <Grid item style={{ margin: "10px", width: "100%" }}>
                  <ImageSketch imageLocalURL={url} setImageUrl={setUrl} />
                </Grid>
              );
            }}
          ></Route>
        </Switch>
      </Grid>
      <br />
    </div>
  );
};

export default withStyles(styles)(App);
