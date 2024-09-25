import { List, ListItem, ListItemText } from "@mui/material";
import default_image from "../../../../assets/default-avatar.jpg"
import "./sidebar.scss"

function Sidebar() {
    return (
        <div className="sidebar-body">
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
        </div>
    );
}

export default Sidebar;