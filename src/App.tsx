import "./App.css";
import { useEffect, useState } from "react";
import ImageSketch from "./components/ImageSketch";
import { Grid, withStyles } from "@material-ui/core";
import ImageUploader from "react-images-upload";
import { Switch, Route, useHistory } from "react-router-dom";

const styles = {
  input: {
    color: "white",
    width: "110%",
  },
};

const App = () => {
  const [url, setUrl] = useState("");
  const history = useHistory();
  const onDrop = (files: File[], pictures: string[]) => {
    setUrl(pictures[0]);
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
            path="/"
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
