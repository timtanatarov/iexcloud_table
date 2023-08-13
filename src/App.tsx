import { StickyHeadTable } from "./components/StickyHeadTable";
import { Grid, Typography } from "@mui/material";

function App() {
  return (
    <>
        <Grid
          container
          direction="column"
          sx={{
            textAlign: "center",
            margin: "0 auto",
            alignItems: "center",
            minHeight: "100vh",
          }}
        >
          <Grid item sx={{ marginTop: "20px" }}>
            <Typography variant="h4">Stock Tracker</Typography>
          </Grid>
          <Grid item sx={{ marginTop: "20px" }}>
            <StickyHeadTable />
          </Grid>
        </Grid>
    </>
  );
}

export default App;
