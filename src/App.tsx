import "./App.css";
import { useState } from "react";
import ImageSketch from "./components/ImageSketch";
import { Grid, withStyles } from "@material-ui/core";
import ImageUploader from "react-images-upload";

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

  return (
    <div className="App">
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "15vh" }}
      >
        <Grid item style={{ margin: "10px" }}>
          <ImageUploader
            withIcon={true}
            buttonText="Choose an image"
            onChange={onDrop}
            imgExtension={[".jpg", ".gif", ".png", ".gif"]}
            maxFileSize={5242880}
          />
        </Grid>
      </Grid>
      <br />
      {url && <ImageSketch imageLocalURL={url} />}
    </div>
  );
};

export default withStyles(styles)(App);
