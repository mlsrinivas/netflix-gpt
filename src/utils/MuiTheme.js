import createTheme from "@mui/material/styles/createTheme";

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          // fontFamily: "Quicksand",
          // fontSize: 12,
          // padding: "10px",
          color: "#464255",
        },
      },
    }
  }
});

export default theme;
