import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom";
import WindowOverlay from "../../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { SupplierManufacturerContactActivityCollectionResponse } from "../../../../../../../../types/supplierManufacturerContactActivity.types";
import getAPI from "../../../../../../../../utils/getAPI";
import getPaginationParams from "../../../../../../../../utils/getPaginationParams";
import SupplierManufacturerContactActivityList from "./SupplierManufacturerContactActivityList";

const SupplierManufacturerContactHistory = (props: {
    contactID: number,
    totalCount: number,
    show: boolean,
    hideFunc: () => void
}) => {
    const [searchParams] = useSearchParams();

    // Data States
    const [isActivityLoading, setIsActivityLoading] = useState(true);
    const [activityData, setActivityData] = useState<SupplierManufacturerContactActivityCollectionResponse>();

    // Search Parameters
    const paginationParams = getPaginationParams(searchParams, 'supplier_manufacturer_contact_history');

    useEffect(() => {
        getActivity();
    }, [JSON.stringify(paginationParams), props.contactID])

    const getActivity = () => {
        getAPI(`supplier_manufacturer_contact_activity`, {
            ...paginationParams,
            supplier_manufacturer_contact_id: props.contactID
        }, (response: any) => {
            const contactActivityData: SupplierManufacturerContactActivityCollectionResponse = response.data;
            setActivityData(contactActivityData);
        }, setIsActivityLoading)    
    } 
    return (
        <WindowOverlay 
            title="Supplier/Manufacturer Contact History"
            show={props.show}
            hideFunc={props.hideFunc}
            maxWidth={600}        
            top
        >
            <SupplierManufacturerContactActivityList
                isSupplierManufacturerContactActivityLoading={isActivityLoading}
                supplierManufacturerContactActivity={activityData}
                perPage={paginationParams.perPage}
                totalCount={props.totalCount}
            />
        </WindowOverlay>
    )
}

export default SupplierManufacturerContactHistory