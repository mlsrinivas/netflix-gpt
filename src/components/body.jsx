import { Button, Grid2, Typography } from "@mui/material";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";

const Body = () => {

    const {nowPlayingData, movieTrailer} = useSelector(state => state.dashboard);

    const key = useMemo(() => {
        // if(movieTrailer != undefined) return movieTrailer[7]?.key;
        // else return 'W2HXtyIYdfI'
        return 'W2HXtyIYdfI'
      }, [movieTrailer])

    return (
        <Grid2
        sx={{
            position: "relative",
            paddingBottom: "50%",
            height: 0,
            maxWidth: "100%",
            backgroundColor: "#000",
        }}
        >
        <Grid2 sx={{ padding: 0 }}>
            <iframe
            width="100%"
            height="500"
            src={`https://www.youtube.com/embed/${key}?autoplay=1&mute=1&showinfo=0&theme=dark&autohide=2&controls=0&modestbranding=1&rel=0&disablekb=1&iv_load_policy=3`}
            allowFullScreen
            frameBorder="0"
            style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
            }}
            />
            <Grid2 sx={{ padding: 20, paddingLeft: 5 }}>
            <Typography
                sx={{
                color: "#FFF",
                fontSize: 30,
                position: "relative",
                fontWeight: 700,
                }}
            >
                {nowPlayingData[0]?.original_title}
            </Typography>
            <Typography
                sx={{
                color: "#FFF",
                fontSize: 14,
                width: "30%",
                paddingTop: 2,
                position: "relative",
                }}
            >
                {nowPlayingData[0]?.overview}
            </Typography>
            <Button
                sx={{
                height: 35,
                width: "auto",
                borderRadius: 2,
                border: "2px solid #FFF",
                margin: 2,
                marginLeft: 0,
                }}
            >
                <Typography sx={{ color: "#FFF", fontSize: 16 }}>► Play</Typography>
            </Button>
            <Button
                sx={{
                height: 35,
                width: "auto",
                borderRadius: 2,
                border: "2px solid #FFF",
                margin: 2,
                }}
            >
                <Typography sx={{ color: "#FFF", fontSize: 16 }}>
                ⓘ More info
                </Typography>
            </Button>
            </Grid2>
        </Grid2>
        </Grid2>
    );
};

export default Body;
