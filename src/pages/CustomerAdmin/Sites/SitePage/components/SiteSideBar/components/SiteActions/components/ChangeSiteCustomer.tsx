import { Dispatch, SetStateAction, useState } from "react"
import CustomerSelect from "../../../../../../../../../components/form/SelectCustomer/CustomerSelect"
import SubmitButton from "../../../../../../../../../components/form/SubmitButton/SubmitButton"
import GridItem from "../../../../../../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../../../../../../components/ui/Containers/InfoGrid/InfoGrid"
import WindowOverlay from "../../../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay"
import { CustomerResponseData } from "../../../../../../../../../types/customers.types"
import { SiteResponseData } from "../../../../../../../../../types/sites.types"
import putAPI from "../../../../../../../../../utils/putAPI"

const ChangeSiteCustomer = (props: {
    siteID: number,
    customer: CustomerResponseData,
    contractID: number | null,
    equipmentCount: number,
    setSiteData: Dispatch<SetStateAction<SiteResponseData | undefined>>,
    show: boolean,
    hideFunc: () => void
}) => {
    // Form State
    const [isUpdating, setIsUpdating] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState<CustomerResponseData | undefined>(props.customer);    

    const updateSite = () => {
        putAPI(`sites/${props.siteID}/change_customer`, {}, {
            customer_id: selectedCustomer?.id,
        }, (response: any) => {
            const siteData: SiteResponseData = response.data;
            props.setSiteData(siteData);
            props.hideFunc();
            setSelectedCustomer(selectedCustomer);
        }, setIsUpdating)
    }

    return (
        <WindowOverlay
            title='Change Site Customer'
            show={props.show}
            hideFunc={props.hideFunc}
            maxWidth={300}
            footer={<SubmitButton
                text="Change Customer"
                disabled={selectedCustomer === undefined}
                iconFont="groups"
                clickFunc={updateSite}
                submitting={isUpdating}
                submittingText="Updating..."
            />}
        >
            <InfoGrid>
                <GridItem>
                    <p>Select a customer to move this site to.</p>
                </GridItem>
                {props.equipmentCount > 0 ?
                    <GridItem>
                        <p>All {props.equipmentCount} equipment will be moved with this site.</p>
                    </GridItem> :
                    null 
                }
                {props.contractID ? 
                    <GridItem>
                        <p>The linked contract will be removed from the site.</p>
                    </GridItem> : 
                    null 
                }
                <GridItem title='Customer'>
                    <CustomerSelect 
                        selectedCustomer={selectedCustomer} 
                        setSelectedCustomer={setSelectedCustomer}
                        hasSubmitted                 
                    />
                </GridItem>
            </InfoGrid>            
        </WindowOverlay>
    )
}

export default ChangeSiteCustomer