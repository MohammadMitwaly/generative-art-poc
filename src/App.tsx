import "./App.css";
import ImageSketch from "./components/ImageSketch";
import { Button, Grid, TextField, withStyles } from "@material-ui/core";

const styles = {
  input: {
    color: "white",
  },
};

const App = (props: any) => {
  const fetchImage = async () => {};
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
            label="Click to enter an image link:"
            variant="outlined"
            InputProps={{
              className: classes.input,
            }}
            InputLabelProps={{
              style: { color: "#fff" },
            }}
          />
        </Grid>
        <Grid item>
          <Button color="primary" variant="contained">
            Generate some art!
          </Button>
        </Grid>
      </Grid>
      <br />
      <ImageSketch />
    </div>
  );
};

export default withStyles(styles)(App);
