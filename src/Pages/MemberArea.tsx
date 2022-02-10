import { Typography } from "@mui/material";
import SideMenu from "../Components/widgets/SideMenuMember";

function MemberArea(){
    return(
        <>
            <Typography variant="h5" textAlign={"center"} sx={{color: "white"}}>Member Area</Typography>
            <SideMenu />
        </>
    )
}

export default MemberArea;