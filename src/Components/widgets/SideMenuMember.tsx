import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Button from "@mui/material/Button"
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ContentCut from '@mui/icons-material/ContentCut';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentPaste from '@mui/icons-material/ContentPaste';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Cloud from '@mui/icons-material/Cloud';
import { useState } from 'react';


const widthSize = [320, 50];

function SideMenu() {

const [count, setCount] = useState(0);

  return (
    <>
    
    <Paper sx={{ width: widthSize[count], maxWidth: '100%', transition: "all 350ms ease" }}>
    <Button onClick={() => count === 0 ? setCount(count + 1) : setCount(count - 1)} >
         {count === 0 ? <ArrowBackIosNewIcon /> : <ArrowForwardIosIcon /> } </Button>
      <MenuList>
        <MenuItem>
          <ListItemIcon>
            <ContentCut fontSize="small" />
          </ListItemIcon>
          {count === 0 ? <ListItemText>Ligas</ListItemText> : false }  
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <ContentCopy fontSize="small" />
          </ListItemIcon>
          {count === 0 ? <ListItemText>Ligas</ListItemText> : false }  
          
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <ContentPaste fontSize="small" />
          </ListItemIcon>
          {count === 0 ? <ListItemText>Ligas</ListItemText> : false }  
        
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <ContentPaste fontSize="small" />
          </ListItemIcon>
          {count === 0 ? <ListItemText>Ligas</ListItemText> : false }  
        
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <Cloud fontSize="small" />
          </ListItemIcon>
          {count === 0 ? <ListItemText>Ligas</ListItemText> : false }  
        </MenuItem>
      </MenuList>
    </Paper>
    </>
  );
}


export default SideMenu;