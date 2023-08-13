import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export const ErrorPage = () => {
  return (
    <Paper
      sx={{
        padding: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box>
        <Typography variant="h6" align="center">
          Something went wrong... 😭
        </Typography>
      </Box>
      <Box sx={{ marginTop: 2, marginBottom: 2 }}>
        <img
          src="https://media.tenor.com/sVPaeSrkl6oAAAAC/cat-sad.gif"
          alt="Sad Emoji"
          style={{ maxWidth: "100%" }}
        />
      </Box>
    </Paper>
  );
};
