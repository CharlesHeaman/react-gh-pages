import { useNavigate } from "react-router-dom";
import SideBarButton from "../../../../../../components/ui/Buttons/SideBarButton/SideBarButton";
import SideBarModule from "../../../../../../components/ui/Containers/SideBarModule/SideBarModule";

const TicketRAMS = () => {
    const navigate = useNavigate();
    
    return (
        <SideBarModule title="RAMS">
            <SideBarButton
                text="Create RAMS"
                iconFont="assignment_late"
                color="red"
                clickEvent={() => navigate('create_rams') }
            />
        </SideBarModule>
    )
}

export default TicketRAMS