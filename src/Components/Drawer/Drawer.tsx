import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Avatar } from '@mui/material';
const drawerWidth = 240;

interface MenuItem {
    menuLink: string;
    icon: React.ReactNode;
    onClick: () => void;
}

interface Props {
    window?: () => Window;
    menuItems: MenuItem[];
    role: string;
    title: React.ReactNode;
}

export default function ResponsiveDrawer(props: Props) {
    const { window, menuItems, title, role } = props;
    const [mobileOpen, setMobileOpen] = React.useState<boolean>(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                {menuItems.map((text, index) => (
                    <ListItem disablePadding>
                        <ListItemButton onClick={text.onClick}>
                            <ListItemIcon>
                                {text.icon}
                            </ListItemIcon>
                            <ListItemText primary={text.menuLink} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    );

    const container: (() => HTMLElement) | undefined = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar
                color="default"
                style={{ position: 'fixed', backgroundColor: role === 'admin' ? '#242444' : 'rgb(85 101 213)', width: '100%', zIndex: 9999, display: 'flex', justifyContent: 'space-between' }}
            >
                <div>
                    <Toolbar
                        style={{ width: '100%', display: "flex", justifyContent: 'space-between' }}
                    >
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div">
                            {title}
                        </Typography>

                        <div>
                            <Avatar src="/broken-image.jpg" />
                        </div>
                    </Toolbar>
                </div>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    color="default"
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
            </Box>
        </Box>
    );
}