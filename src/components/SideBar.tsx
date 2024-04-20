import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { styled } from '@mui/material/styles';

export default function Sidebar() {
    const StyledList = styled(List)(({ theme }) => ({
        maxWidth: 360,
        position: 'fixed'
    }));

    const StyledListItem = styled(ListItem)(({ theme }) => ({
        color: theme.palette.common.white,
    }));

    return (
        <StyledList>
            <StyledListItem>
                <ListItemButton>
                    <ListItemText primary="Doctor Information" />
                </ListItemButton>
            </StyledListItem>
            <StyledListItem>
                <ListItemButton>
                    <ListItemText primary="Reviews" />
                </ListItemButton>
            </StyledListItem>
            <StyledListItem>
                <ListItemButton>
                    <ListItemText primary="Ratings" />
                </ListItemButton>
            </StyledListItem>
        </StyledList>
    )
}