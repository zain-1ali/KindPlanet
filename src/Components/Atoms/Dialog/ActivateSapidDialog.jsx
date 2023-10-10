import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Divider, PaperProps } from '@mui/material';
import { useTranslation } from 'react-i18next';
import AppleIcon from "@mui/icons-material/Apple";
import AdbIcon from '@mui/icons-material/Adb';
import CancelIcon from '@mui/icons-material/Cancel';


const ActivateSapidDialog = ({ showPopup, hidePopup, androidClicked, appleClicked }) => {
    const { t } = useTranslation();
    const [platform, setPlatform] = useState({
        ios: "",
        android: ""
    })

    useEffect(() => {
        const isIOS = /iPad|iPhone|iPod/.test(navigator.platform) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
        const isAndroid = /Android/.test(navigator.userAgent);
        setPlatform(
            {
                ios: isIOS,
                android: isAndroid
            }
        )

    }, [])

    return (
        <Dialog
            open={showPopup}
            keepMounted
            onClose={hidePopup}
            aria-describedby="alert-dialog-slide-description"
            PaperProps={{ style: { borderRadius: '10px', width: '350px' } }}
        >
            <CancelIcon style={{ position: 'absolute', right: '2px', top: '3px', cursor: 'pointer' }} onClick={() => hidePopup()} />
            <DialogTitle style={{ marginTop: '10px' }}>{t("activateSapidInstruction")}</DialogTitle>
            <Divider style={{ marginTop: '-10px' }} />
            <DialogActions style={{ display: 'flex', justifyContent: 'center' }}>
                {<Button onClick={() => appleClicked()}
                    style={{
                        height: "20%",
                        color: "white",
                        width: "9rem",
                        borderRadius: "20px",
                        marginBottom: "10px",
                        marginLeft: "10px",
                        marginRight: "10px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#7665cf",
                        marginTop: "1rem",
                        textTransform: "capitalize",
                        fontSize: "15px",
                        fontFamily: 'MadeOuterSansLight, sans-serif'
                    }}
                >
                    <AppleIcon style={{ color: "white", marginRight: "5px" }} />
                    Apple
                </Button>}
                <Button onClick={() => androidClicked()}
                    style={{
                        height: "20%",
                        color: "white",
                        width: "9rem",
                        borderRadius: "20px",
                        marginBottom: "10px",
                        marginLeft: "10px",
                        marginRight: "10px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#7665cf",
                        marginTop: "1rem",
                        textTransform: "capitalize",
                        fontSize: "15px",
                        fontFamily: 'MadeOuterSansLight, sans-serif'
                    }}
                >
                    <AdbIcon style={{ color: "white", marginRight: '5px' }} />
                    Android
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ActivateSapidDialog