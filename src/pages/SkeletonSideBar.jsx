import React, { useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    // zIndex: theme.zIndex.drawer + 1

  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    backgroundColor: 'black',
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    backgroundColor: 'black',
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    height: '80px',
    width: '100%'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function Skeleton({ ToolbarContent, SideBar, children, }) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [show, setShow] = React.useState(true);



  useEffect(() => {
    setShow(localStorage.getItem('usertoken') ? false : true)

  }, [])


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
 

      <AppBar position="fixed" className={classes.appBar} >
        <Toolbar>
          <ToolbarContent />
        </Toolbar>
      </AppBar>
      <Drawer
        hidden={show}
        onMouseLeave={handleDrawerClose}
        onMouseEnter={handleDrawerOpen}
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,

          }),
        }}
      >
        <div className={classes.toolbar}> </div>
        {SideBar}
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}
