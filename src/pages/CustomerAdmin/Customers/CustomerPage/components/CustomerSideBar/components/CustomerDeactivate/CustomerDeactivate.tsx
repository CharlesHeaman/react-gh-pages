import { Dispatch, SetStateAction, useState } from "react";
import DeactivateModule from "../../../../../../../../components/ui/DeactivateModule/DeactivateModule";
import { CustomerResponseData } from "../../../../../../../../types/customers.types";
import DeactivateOverlay from "../../../../../../../../components/ui/DeactivateModule/DeactivateOverlay";
import putAPI from "../../../../../../../../utils/putAPI";
import WindowOverlay from "../../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";

const CustomerDeactivate = (props: {
    customerID: number,
    reactivate: boolean,
    setCustomerData: Dispatch<SetStateAction<CustomerResponseData | undefined>>,
    siteIDs: Array<number>,
    equipmentIDs: Array<number>,
    contractIDs: Array<number>,
    contactIDs: Array<number>,
    ticketCount: number,
    quotesCount: number
}) => {
    const [showDeactivate, setShowDeactivate] = useState(false);
    const [isDeactivating, setIsDeactivating] = useState(false);

    const deactivateCustomer = () => {
        // Deactivate/Reactivate Customer
        putAPI(`customers/${props.customerID}/deactivate`, {}, {
            reactivate: props.reactivate
        }, (response: any) => {
            const customerData: CustomerResponseData = response.data;
            props.setCustomerData(customerData);
            setShowDeactivate(false)
        }, setIsDeactivating)
    }

    const hasOpen = (props.ticketCount + props.quotesCount) > 0;

    return (
        <>
            <DeactivateModule
                resourceName="Customer"
                reactivate={props.reactivate}
                showFunc={() => setShowDeactivate(true)}
            />

            {hasOpen ?
                <WindowOverlay 
                    title={'Deactivate Customer'} 
                    maxWidth={300} 
                    show={showDeactivate} 
                    hideFunc={() => setShowDeactivate(false)} 
                >
                    <p>Deactivate is disabled as the customer still has open {props.ticketCount > 0 ? 'tickets' : ''} {(props.ticketCount > 0 && props.quotesCount > 0) ? 'and' : ''} {props.quotesCount > 0 ? 'quotes' : ''}.</p>
                    <p>Close all {props.ticketCount > 0 ? `${props.ticketCount} open tickets` : ''} {(props.ticketCount > 0 && props.quotesCount > 0) ? 'and' : ''} {props.quotesCount > 0 ? `${props.quotesCount} open quotes` : ''} to deactivate this customer.</p>
                </WindowOverlay>
                :
                <DeactivateOverlay 
                    resourceName="Customer"
                    reactivate={props.reactivate} 
                    additionalText={!props.reactivate ? 
                        (props.siteIDs.length > 0 || props.equipmentIDs.length > 0 || props.contactIDs.length > 0 || props.contractIDs.length > 0) ? <p>This will also deactivate all {props.siteIDs.length} sites, {props.equipmentIDs.length} equipment, {props.contractIDs.length} contracts and {props.contactIDs.length} contacts.</p> : undefined
                        : undefined
                    }
                    show={showDeactivate} 
                    hideFunc={() => setShowDeactivate(false)} 
                    isSubmitting={isDeactivating} 
                    submitFunc={deactivateCustomer}
                />
            }
        </>
    )
}

export default CustomerDeactivate