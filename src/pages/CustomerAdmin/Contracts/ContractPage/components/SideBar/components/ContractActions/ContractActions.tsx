import { Dispatch, SetStateAction, useState } from "react";
import SideBarButton from "../../../../../../../../components/ui/Buttons/SideBarButton/SideBarButton";
import SideBarModule from "../../../../../../../../components/ui/Containers/SideBarModule/SideBarModule";
import { ContractResponseData } from "../../../../../../../../types/contract.types";
import { CustomerResponseData } from "../../../../../../../../types/customers.types";
import SelectContractedSites from "./components/SelectContractedSites";
import UpdateContractNotes from "./components/UpdateContractNotes";
import { useNavigate } from "react-router-dom";

const ContractActions = (props: {
    contractID: number,
    notes: string | null,
    customer: CustomerResponseData,
    getSites: (contractID: number) => void,
    setContractData: Dispatch<SetStateAction<ContractResponseData | undefined>>,
}) => {
    const navigate = useNavigate();
    
    const [showSelectSites, setShowSelectSites] = useState(false);
    const [showEditNotes, setShowEditNotes] = useState(false);

    return (
        <>
            <SideBarModule title='Actions'>
                <SideBarButton 
                    text='Update Notes'
                    iconFont='edit_note'
                    clickEvent={() => setShowEditNotes(true)}
                />
                {/* <SideBarButton
                    text='Change Customer'
                    iconFont="groups"
                    clickEvent={() => setShowChangeCustomer(true)}
                /> */}
                <SideBarButton 
                    text='Select Contracted Sites'
                    iconFont='checklist_rtl'
                    clickEvent={() => setShowSelectSites(true)}
                />
                <SideBarButton 
                    text='Copy to New Contract'
                    iconFont='file_copy'
                    clickEvent={() => navigate(`../create?contract_id=${props.contractID}`, { relative: 'path',  })}
                />

            </SideBarModule>

            <UpdateContractNotes
                contractID={props.contractID} 
                notes={props.notes}
                setContractData={props.setContractData}
                show={showEditNotes} 
                hideFunc={() => setShowEditNotes(false)}
            />

            {/* <ChangeContractCustomer 
                contractID={props.contractID} 
                customer={props.customer} 
                setContractData={props.setContractData}
                show={showChangeCustomer} 
                hideFunc={() => setShowChangeCustomer(false)}
            /> */}

            <SelectContractedSites 
                contractID={props.contractID} 
                customerID={props.customer.id}
                show={showSelectSites}
                hideFunc={() => setShowSelectSites(false)} 
                getSites={props.getSites}
            />
        </>
    )
}

export default ContractActions