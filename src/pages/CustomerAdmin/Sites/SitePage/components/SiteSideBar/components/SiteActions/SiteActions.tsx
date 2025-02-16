import { Dispatch, SetStateAction, useState } from "react"
import SideBarButton from "../../../../../../../../components/ui/Buttons/SideBarButton/SideBarButton"
import SideBarModule from "../../../../../../../../components/ui/Containers/SideBarModule/SideBarModule"
import { EquipmentCollectionResponse } from "../../../../../../../../types/equipment.types"
import { SiteResponseData } from "../../../../../../../../types/sites.types"
import ChangeSiteCustomer from "./components/ChangeSiteCustomer"
import MoveSiteEquipment from "./components/MoveSiteEquipment"
import SelectSiteContract from "./components/SelectSiteContract"
import { CustomerResponseData } from "../../../../../../../../types/customers.types"
import { ContractResponseData } from "../../../../../../../../types/contract.types"
import SelectSiteAssignedContacts from "./components/SelectSiteAssignedContacts"

const SiteActions = (props: {
    site: SiteResponseData,
    customer: CustomerResponseData,
    contract: ContractResponseData | undefined,
    setSiteData: Dispatch<SetStateAction<SiteResponseData | undefined>>,
    setIsEditMode: Dispatch<SetStateAction<boolean>>,
    equipment: EquipmentCollectionResponse,
    getEquipment: (siteID: number) => void,
    getContacts: (siteID: number) => void,
}) => {
    const [showChangeCustomer, setShowChangeCustomer] = useState(false);
    const [showMoveEquipment, setShowMoveEquipment] = useState(false);
    const [showSelectContract, setShowSelectContract] = useState(false);
    const [showAssignedContacts, setShowAssignedContacts] = useState(false);

    return (
        <>
            <SideBarModule title='Actions'>
                <SideBarButton 
                    text='Edit Site'
                    color="orange"
                    iconFont='edit'
                    clickEvent={() => props.setIsEditMode(true)}
                />
                <SideBarButton
                    text='Change Customer'
                    iconFont="groups"
                    clickEvent={() => setShowChangeCustomer(true)}
                />
                <SideBarButton
                    text='Move Equipment'
                    iconFont="local_laundry_service"
                    clickEvent={() => setShowMoveEquipment(true)}
                />
                <SideBarButton
                    text='Select Contract'
                    iconFont="history_edu"
                    clickEvent={() => setShowSelectContract(true)}
                />
                <SideBarButton 
                    text='Select Assigned Contacts'
                    iconFont='checklist_rtl'
                    clickEvent={() => setShowAssignedContacts(true)}
                />
            </SideBarModule>

            <ChangeSiteCustomer
                siteID={props.site.id}
                customer={props.customer}
                contractID={props.site.data.contract_id}
                equipmentCount={props.equipment.total_count}
                setSiteData={props.setSiteData}
                show={showChangeCustomer}
                hideFunc={() => setShowChangeCustomer(false)}
            /> 

            <MoveSiteEquipment
                site={props.site}
                customerID={props.customer.id}
                equipment={props.equipment}
                equipmentCount={props.equipment.total_count}
                show={showMoveEquipment}
                getEquipment={props.getEquipment}
                hideFunc={() => setShowMoveEquipment(false)}
            /> 

            <SelectSiteContract
                siteID={props.site.id}
                customerID={props.customer.id}
                contract={props.contract}
                setSiteData={props.setSiteData}
                show={showSelectContract}
                hideFunc={() => setShowSelectContract(false)}
            /> 

            <SelectSiteAssignedContacts
                siteID={props.site.id}
                customerID={props.site.data.customer_id}
                getContacts={props.getContacts}
                show={showAssignedContacts}
                hideFunc={() => setShowAssignedContacts(false)}
            />
        </>
    )
}

export default SiteActions