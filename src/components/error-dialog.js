// reference material: https://material-ui.com/components/dialogs/

import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default function AlertDialogSlide(props) {
    const [open, setOpen] = React.useState(true);

    const handleClose = () => {
        setOpen(false);
        if (typeof props.onClose !== 'undefined')
        {
            try
            {
                props.onClose();
            }
            catch(error)
            {
                // ignore
            }
        }
    };

    if ( (typeof props.message !== 'undefined') && props.message.length > 0) {
        let title = "Attention!";
        if( (typeof props.title !== 'undefined') && props.title.length > 0)
        {
            title = props.title;
        }

        return (
            <div>
                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description">
                    <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            {props.message}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Ok
                </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
    else {
        return (<div></div>);
    }
}
