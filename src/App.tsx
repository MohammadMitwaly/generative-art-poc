import "./App.css";
import { useState } from "react";
import ImageSketch from "./components/ImageSketch";
import { Button, Grid, TextField, withStyles } from "@material-ui/core";

const styles = {
  input: {
    color: "white",
  },
};

const App = (props: any) => {
  const fetchImage = async (url: string) => {
    let outside;
    fetch(url)
      .then((response) => response.blob())
      .then((images) => {
        // Then create a local URL for that image and print it
        outside = URL.createObjectURL(images);
        setImage(outside);
      });
  };
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const { classes } = props;

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
        <Grid item style={{ margin: "15px" }}>
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
      {url && <ImageSketch imageLocalURL={url} />}
    </div>
  );
};

export default withStyles(styles)(App);
