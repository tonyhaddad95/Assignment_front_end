import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import LockIcon from '@mui/icons-material/Lock';

export interface SimpleDialogProps {
    open: boolean;
    handleChangePotData: any;
    handleChange: any;
    onCloseSubmit: () => void;
    onClose: () => void;
}

const useStyles = makeStyles(() => ({
    buttonSection: {
        backgroundColor: '#AAC9FF',
        borderRadius: 10,
        padding: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer'
    },
    buttonSectionOnlyMe: {
        backgroundColor: '#f7f7f7',
        borderRadius: 10,
        padding: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer'
    },
    buttonSectionInner: {
        display: 'flex',
        alignItems: 'center',
        gap: 15
    },
    dialogList: {
        display: 'grid',
        gap: 10
    },
    doneButton: {
        textAlign: 'right',
        padding: 20
    },
    dialogHeader: {
        backgroundColor: '#242444',
        color: 'white'
    },
    textArea: {
        width: '95%',
        margin: '10px auto',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'lightgray',
        padding: 10
    },
    subjectArea: {
        width: '95%',
        margin: '10px auto',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'lightgray',
        padding: 10
    }
}));

export default function SimpleDialog(props: SimpleDialogProps) {
    const { onClose, onCloseSubmit, handleChange, open, handleChangePotData } = props;
    const classes = useStyles();

    const radioSection = [
        {
            title: 'Public',
            desc: 'Anyone can see your post',
            onChange: (e: any) => handleChange(e.target.value),
            value: 'public',
            element: 'comment-1'
        },
        {
            title: 'Only Me',
            desc: 'No one can see your post',
            onChange: (e: any) => handleChange(e.target.value),
            value: 'private',
            element: 'comment-2'
        }
    ]

    return (
        <Dialog style={{ position: 'fixed', zIndex: 19999 }} onClose={onClose} open={open}>
            <DialogTitle className={classes.dialogHeader}>Default audience</DialogTitle>
            <Divider />
            <List className={classes.dialogList} style={{ padding: 20 }} sx={{ pt: 0 }}>
                <ListItem disableGutters>
                    We care about your privacy and want to give you more ways to <br />control who you share with in your community. Now you can set a <br />default audience.
                    <br />
                </ListItem>
                {radioSection?.map((el, key) => (
                    <label key={key} htmlFor={el.element}>
                        <Grid className={classes.buttonSectionOnlyMe}>
                            <Grid className={classes.buttonSectionInner}>
                                <Grid><LockIcon /></Grid>
                                <Grid>
                                    <Typography fontSize={18} fontWeight={'bold'}>{el.title}</Typography>
                                    <Typography fontSize={16} >{el.desc}</Typography>
                                </Grid>
                            </Grid>
                            <Grid><input value={el.value} id={el.element} onChange={el.onChange} name="comment-privacy" type="radio" /></Grid>
                        </Grid>
                    </label>
                ))}
            </List>
            <Divider />
            <input name="subject" className={classes.subjectArea} type="text" onChange={handleChangePotData} placeholder='Enter your subject here...' />
            <textarea name="description" placeholder='Start typing your description here...' onChange={handleChangePotData} className={classes.textArea} rows={5} />
            <Divider />
            <Grid className={classes.doneButton}><Button onClick={onCloseSubmit} variant="contained">Done</Button></Grid>
        </Dialog>
    );
}