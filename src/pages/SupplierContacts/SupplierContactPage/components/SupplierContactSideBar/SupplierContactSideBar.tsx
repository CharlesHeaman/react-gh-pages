import { Dispatch, SetStateAction, useEffect, useState } from "react"
import SideBarButton from "../../../../../components/ui/Buttons/SideBarButton/SideBarButton"
import SideBarModule from "../../../../../components/ui/Containers/SideBarModule/SideBarModule"
import { SupplierContactResponseData } from "../../../../../types/supplierContact.types"
import { SupplierManufacturerResponseData } from "../../../../../types/supplierManufacturer.types"
import { SupplierManufacturerContactActivityCollectionResponse } from "../../../../../types/supplierManufacturerContactActivity.types"
import getAPI from "../../../../../utils/getAPI"
import SupplierContactActions from "./components/SupplierContactActions/SupplierContactActions"
import SupplierContactAssociatedResources from "./components/SupplierContactAssociatedData/SupplierContactAssociatedData"
import SupplierContactDeactivate from "./components/SupplierContactDeactivate/SupplierContactDeactivate"
import SupplierContactSideBarSkeleton from "./components/SupplierContactSideBarSkeleton"
import ExportResource from "../../../../CustomerAdmin/Contacts/ContactPage/components/ContactSideBar/components/ContactDeactivate/ExportResource"
import PermsProtectedComponent from "../../../../../components/PermsProtectedComponent"

const SupplierContactSideBar = (props: {
    contact: SupplierContactResponseData | undefined,
    supplier: SupplierManufacturerResponseData | undefined,
    setContactData: Dispatch<SetStateAction<SupplierContactResponseData | undefined>>,
    isEditMode: boolean,
    setIsEditMode: Dispatch<SetStateAction<boolean>>
}) => {

    // Data States
    const [isActivityLoading, setIsActivityLoading] = useState(true);
    const [activityData, setActivityData] = useState<SupplierManufacturerContactActivityCollectionResponse>();

    useEffect(() => {
        if (props.contact?.id === undefined) return;
        getActivity(props.contact.id);
    }, [props.contact?.id]);

    useEffect(() => {
        if (props.contact?.id === undefined) return;
        getActivity(props.contact.id);
    }, [JSON.stringify(props.contact)]);

    const getActivity = (contactID: number) => {
        getAPI(`supplier_manufacturer_contact_activity`, {
            supplier_manufacturer_contact_id: contactID,
            perPage: 1
        }, (response: any) => {
            const contactActivityData: SupplierManufacturerContactActivityCollectionResponse = response.data;
            setActivityData(contactActivityData);
        }, setIsActivityLoading)    
    } 
    
    const isSideBarLoading = (
        isActivityLoading
    );

    return (
        !isSideBarLoading && props.contact && props.supplier && activityData ? 
            !props.isEditMode ?  <>
                {props.contact.data.is_active ?
                    <PermsProtectedComponent requiredPerms={{ stock: 2 }}>
                        <SupplierContactActions
                            contactID={props.contact.id}
                            supplier={props.supplier}
                            setIsEditMode={() => props.setIsEditMode(true)}
                            setContactData={props.setContactData}
                        />
                    </PermsProtectedComponent>
                : null}
                <SupplierContactAssociatedResources
                    contactID={props.contact.id}
                    activityCount={activityData.total_count}
                />
                <PermsProtectedComponent requiredPerms={{ stock: 2 }}>
                    <SupplierContactDeactivate 
                        contactID={props.contact.id} 
                        setContactData={props.setContactData}
                        reactivate={!props.contact.data.is_active} 
                    />
                </PermsProtectedComponent>

                <ExportResource
                    resourceData={props.contact}
                    resourceName='Supplier Contact'
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
        <SupplierContactSideBarSkeleton/>
    )
}

export default SupplierContactSideBar