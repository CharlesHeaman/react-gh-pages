import { Dispatch, SetStateAction, useEffect, useState } from "react";
import SideBarButton from "../../../../../components/ui/Buttons/SideBarButton/SideBarButton";
import SideBarModule from "../../../../../components/ui/Containers/SideBarModule/SideBarModule";
import { InvoiceTypeResponseData } from "../../../../../types/invoiceTypes.types";
import InvoiceTypeDeactivate from "./components/InvoiceTypeDeactivate/InvoiceTypeDeactivate";
import InvoiceTypeSideBarSkeleton from "./components/InvoiceTypeSideBarSkeleton";
import getAPI from "../../../../../utils/getAPI";
import { InvoiceTypeActivityCollectionResponse } from "../../../../../types/invoiceTypeActivity.types";
import InvoiceTypeAssociatedData from "./components/InvoiceTypeAssociatedData/InvoiceTypeAssociatedData";
import { TicketCollectionResponse } from "../../../../../types/tickets.types";
import ExportResource from "../../../../CustomerAdmin/Contacts/ContactPage/components/ContactSideBar/components/ContactDeactivate/ExportResource";
import PermsProtectedComponent from "../../../../../components/PermsProtectedComponent";

const InvoiceTypeSideBar = (props: {
    invoiceType: InvoiceTypeResponseData | undefined,
    setInvoiceTypeData: Dispatch<SetStateAction<InvoiceTypeResponseData | undefined>>,
    isEditMode: boolean,
    setIsEditMode: Dispatch<SetStateAction<boolean>>,
}) => {

    const [isActivityLoading, setIsActivityLoading] = useState(true);
    const [activityData, setActivityData] = useState<InvoiceTypeActivityCollectionResponse>();
    const [isTicketsLoading, setIsTicketsLoading] = useState(false);
    const [ticketData, setTicketData] = useState<TicketCollectionResponse>();

    useEffect(() => {
        if (props.invoiceType?.id === undefined) return;
        getActivity(props.invoiceType.id);
        getTickets(props.invoiceType.id);
    }, [JSON.stringify(props.invoiceType)]);

    const isSideBarLoading = (
        isActivityLoading || 
        isTicketsLoading
    )

    const getActivity = (invoiceTypeID: number) => {
        getAPI(`invoice_type_activity`, {
            invoice_type_id: invoiceTypeID,
            perPage: 1
        }, (response: any) => {
            const costCentreActivityData: InvoiceTypeActivityCollectionResponse = response.data;
            setActivityData(costCentreActivityData);
        }, setIsActivityLoading)    
    } 

    const getTickets = (invoiceTypeID: number) => {
        getAPI(`tickets`, {
            invoice_type_ids: [invoiceTypeID],
            suffixes: [0],
        }, (response: any) => {
            const ticketData: TicketCollectionResponse = response.data;
            setTicketData(ticketData);
        }, setIsTicketsLoading)    
    } 

    return (
        !isSideBarLoading && props.invoiceType && ticketData && activityData ? 
            !props.isEditMode ?  <>
                {props.invoiceType.data.is_active ?
                    <PermsProtectedComponent requiredPerms={{ system: 2 }}>
                        <SideBarModule title='Actions'>
                            <SideBarButton 
                                text='Edit Invoice Type'
                                color="orange"
                                iconFont='edit'
                                clickEvent={() => props.setIsEditMode(true)}
                            />
                        </SideBarModule>        
                    </PermsProtectedComponent>
                : null}
                <InvoiceTypeAssociatedData
                    invoiceTypeID={props.invoiceType.id}
                    ticketCount={ticketData.total_count}
                    activityCount={activityData.total_count}
                />
                <PermsProtectedComponent requiredPerms={{ system: 2 }}>
                    <InvoiceTypeDeactivate 
                        invoiceTypeID={props.invoiceType.id} 
                        setInvoiceTypeData={props.setInvoiceTypeData}
                        reactivate={!props.invoiceType.data.is_active} 
                    /> 
                </PermsProtectedComponent>
                
                <ExportResource
                    resourceData={props.invoiceType}
                    resourceName='Invoice Type'
                />
            </> 
            :
            // Edit Mode
            <SideBarModule title='Actions'>
                <SideBarButton 
                    text='Abandon Edit'
                    color="grey"
                    iconFont='cancel'
                    clickEvent={() => props.setIsEditMode(false)}
                />
            </SideBarModule>
        :
        // Skeleton
        <InvoiceTypeSideBarSkeleton/>
    )
}

export default InvoiceTypeSideBar
