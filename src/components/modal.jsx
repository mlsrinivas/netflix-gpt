import * as React from 'react';
import Modal from '@mui/material/Modal';
import { Grid2 } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

const BasicModal = ({onOpen, onClose, movieKey}) => {
    console.log(movieKey, 'keyasdkey')

    const key = React.useMemo(() => {
        if(movieKey != undefined) return movieKey;
        else return 'W2HXtyIYdfI'
    }, [])

    console.log(key, 'keykeykey')

    return (
        <Modal
            open={onOpen}
            onClose={onClose}
            sx={{height: '100%', width: '100%', backgroundColor:'#000', border: '1px solid red', display:'flex', alignItems:'center', justifyContent:'center'}}
        >
            <Grid2 sx={{height: '90%', width: '90%'}}>
                <Grid2 sx={{justifyContent:'flex-end', display:'flex', cursor:'pointer'}}>
                    <CancelIcon onClick={onClose} sx={{color: 'red', padding: 2, fontSize: 30, }}/>
                </Grid2>
                <Grid2 sx={{}}>
                    <iframe
                        src={`https://www.youtube.com/embed/${key}?autoplay=1&mute=0&autohide=2&modestbranding=1&rel=0&disablekb=1&iv_load_policy=3`}
                        allowFullScreen
                        frameBorder="0"
                        style={{
                            position: "absolute",
                            width: "90%",
                            height: "80%",
                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                        }}
                    />
                </Grid2>
            </Grid2>
        </Modal>
    );
}

export default BasicModal
