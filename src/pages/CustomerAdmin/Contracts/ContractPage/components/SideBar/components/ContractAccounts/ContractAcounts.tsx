import { Dispatch, SetStateAction, useState } from "react";
import SideBarButton from "../../../../../../../../components/ui/Buttons/SideBarButton/SideBarButton";
import SideBarModule from "../../../../../../../../components/ui/Containers/SideBarModule/SideBarModule";
import { ContractResponseData } from "../../../../../../../../types/contract.types";
import UpdateContractPurchaseOrderNumber from "./components/UpdateContractPurchaseOrderNumber";

const ContractAccounts = (props: {
    contractID: number,
    purchaseOrderNumber: string | null,
    setContractData: Dispatch<SetStateAction<ContractResponseData | undefined>>,
}) => {
    const [showAddNumber, setShowAddNumber] = useState(false);

    return (
        <>
            <SideBarModule title='Accounts'>
                <SideBarButton 
                    text='Add Purchase Order Number'
                    iconFont='numbers'
                    clickEvent={() => setShowAddNumber(true)}
                />
            </SideBarModule>

            <UpdateContractPurchaseOrderNumber
                contractID={props.contractID}
                purchaseOrderNumber={props.purchaseOrderNumber}
                show={showAddNumber}
                hideFunc={() => setShowAddNumber(false)}
                setContractData={props.setContractData}
            />

        </>
    )
}

export default ContractAccounts