import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { styled } from '@mui/material/styles';
import '../styles/Sidebar.css';
import { PageContext } from '../../src/contexts/PageTypeContext'
import { useContext } from 'react';

interface SidebarProps {
    items: string[];
}

const StyledList = styled(List)(({ theme }) => ({
    maxWidth: 360,
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
    color: theme.palette.common.white,
}));

const StyledListItemText = styled(ListItemText)(({theme})=>({
    fontSize:theme.spacing(5),
    '& .MuiTypography-root':{
        fontSize: theme.spacing(1.558)
    }
}));

export default function Sidebar({ items }: SidebarProps) {

    const { setPage } = useContext(PageContext);

    return (
        <StyledList>
            {items.map((item, index) => (
                <StyledListItem key={index}>
                    <ListItemButton onClick={(e)=>setPage(e.currentTarget.textContent as string)}>
                        <StyledListItemText primaryTypographyProps={{ component: 'span' }} primary={item} />
                   </ListItemButton>
                </StyledListItem>
            ))}
        </StyledList>
    );
}
