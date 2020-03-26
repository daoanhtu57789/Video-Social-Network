const styles = theme => ({
  
  header:{
    position:'fixed',
    width:'100%',
    zIndex:1000
  },
  content:{
    marginTop:'60px'
  }
  ,
  wrapper: {
    display: "flex",
    flexDirection: "row",
    height: "100%",
  },
  wrapperContent: {
    marginLeft:'180px',
    width: "100%",
    padding: 10,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  shirtLeft: {
    marginLeft: -0,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.leavingScreen
    })
  }
});

export default styles;
