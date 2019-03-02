import classNames from 'classnames';
import React from "react";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {
    root: {
        background: '#324299',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px',
    },
};

const StartButton = ({classes, children, className, ...other}) => (
    <Button className={classNames(classes.root, className)} {...other}>
        {children || 'class names'}
    </Button>
);

export default withStyles(styles)(StartButton);