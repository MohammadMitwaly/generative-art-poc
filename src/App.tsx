import "./App.css";
import { useState } from "react";
import ImageSketch from "./components/ImageSketch";
import {
  Button,
  Grid,
  TextField,
  withStyles,
  CircularProgress,
} from "@material-ui/core";

const styles = {
  input: {
    color: "white",
    width: "110%",
  },
};

const App = (props: any) => {
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { classes } = props;

  const fetchImage = async (url: string) => {
    setIsLoading((isLoading) => !isLoading);
    let outside;
    fetch(url)
      .then((response) => response.blob())
      .then((images) => {
        // Then create a local URL for that image
        outside = URL.createObjectURL(images);
        setImage(outside);
        setIsLoading((isLoading) => !isLoading);
      });
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
          <TextField
            value={url}
            label="Click to enter an image link:"
            variant="outlined"
            InputProps={{
              className: classes.input,
            }}
            InputLabelProps={{
              style: { color: "#fff" },
            }}
            onChange={(e) => {
              setUrl(e.target.value);
            }}
          />
        </Grid>
        <Grid item>
          <Button
            color="primary"
            variant="contained"
            onClick={() => fetchImage(url)}
          >
            Generate some art!
          </Button>
        </Grid>
      </Grid>
      <br />
      {image && <ImageSketch imageLocalURL={image} />}
      {isLoading && <CircularProgress color="secondary" />}
    </div>
  );
};

export default withStyles(styles)(App);
