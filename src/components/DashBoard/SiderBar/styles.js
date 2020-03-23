const drawerWidth=180;
const styles = (theme) => ({
    drawerPaper: {
        width: drawerWidth,
        maxWidth: drawerWidth,
        zIndex: 10, //để cho ẩn sau loading
        height: "100%",
        position: "relative"
    },
    link: {
        textDecoration: "none",
        color: theme.color.defaultTextColor
    },
    menuLinkActive: {
        "&>div": {
            backgroundColor: theme.color.hover
        }
    }
});

export default styles;