import { useNavigate } from "react-router-dom"
import SideBarButton from "../../../../../components/ui/Buttons/SideBarButton/SideBarButton"
import SideBarModule from "../../../../../components/ui/Containers/SideBarModule/SideBarModule"

const PurchaseOrderAccounts = (props: {
    isSent: boolean,
    isAccountsOutstanding: boolean,
}) => {
    const navigate = useNavigate();
    
    return (
        <>
            {props.isAccountsOutstanding && props.isSent ? <SideBarModule title="Accounts">
                <SideBarButton 
                    text='Reconcile Order Items' 
                    iconFont="balance" 
                    color="purple" 
                    clickEvent={() => navigate('reconcile_items')}
                />
            </SideBarModule> : null}
        </>
    )
}

export default PurchaseOrderAccounts