import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import default_image from "../../../assets/default-avatar.jpg"
import "./sidebar.scss"

function Sidebar() {
    const drawerWidth = 240;

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', mt: '64px' }, // Sidebar starts below header
            }}
        >
            <div className="image-container">
                <img src={default_image} alt="Avatar" className="avatar" />
            </div>
            <List>
                <ListItem button>
                    <ListItemText primary="Home" />
                </ListItem>
                <ListItem button>
                    <ListItemText primary="Profile" />
                </ListItem>
                <ListItem button>
                    <ListItemText primary="Create Order" />
                </ListItem>
                <ListItem button>
                    <ListItemText primary="Wallet" />
                </ListItem>
                <ListItem button>
                    <ListItemText primary="Contact Support" />
                </ListItem>
            </List>
        </Drawer>
    );
}

export default Sidebar;