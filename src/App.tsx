import "./App.css";
import { useState } from "react";
import ImageSketch from "./components/ImageSketch";
import { Grid, withStyles } from "@material-ui/core";
import ImageUploader from "react-images-upload";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const styles = {
  input: {
    color: "white",
    width: "110%",
  },
};

const App = () => {
  const [url, setUrl] = useState("");
  const onDrop = (files: File[], pictures: string[]) => {
    setUrl(pictures[0]);
  };

  // TODO: Show image and remove the load-file component

  return (
    <Router>
      <div className="App">
        <Grid container style={{ minHeight: "15vh" }}>
          <Switch>
            <Route path="/sketch">
              <Grid item style={{ margin: "10px", width: "100%" }}>
                {url && <ImageSketch imageLocalURL={url} />}
              </Grid>
            </Route>
            <Route path="/">
              <Grid item style={{ margin: "10px", width: "100%" }}>
                <ImageUploader
                  withIcon={true}
                  buttonText="Choose an image"
                  onChange={onDrop}
                  imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                  maxFileSize={5242880}
                />
              </Grid>
            </Route>
          </Switch>
        </Grid>
        <br />
      </div>
    </Router>
  );
};

export default withStyles(styles)(App);
