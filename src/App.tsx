import "./App.css";
import ImageSketch from "./components/ImageSketch";
import { Button, Grid, TextField } from "@material-ui/core";

function App() {
  return (
    <div className="App">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField />
        </Grid>
        <Grid item xs={12}>
          <Button>Generate some art!</Button>
        </Grid>
      </Grid>

      <ImageSketch />
    </div>
  );
}

export default App;
