import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import WindowOverlay from "../../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { SupplierManufacturerActivityCollectionResponse } from "../../../../../../../../types/supplierManufacturerActivity.types";
import getAPI from "../../../../../../../../utils/getAPI";
import getPaginationParams from "../../../../../../../../utils/getPaginationParams";
import SupplierManufacturerActivityList from "./SupplierManufacturerActivityList";

const SupplierManufacturerHistory = (props: {
    supplierManufacturerID: number,
    totalCount: number,
    show: boolean,
    hideFunc: () => void
}) => {
    const [searchParams] = useSearchParams();

    // Data States
    const [isActivityLoading, setIsActivityLoading] = useState(true);
    const [activityData, setActivityData] = useState<SupplierManufacturerActivityCollectionResponse>();

    // Search Parameters
    const paginationParams = getPaginationParams(searchParams, 'supplier_manufacturer_activity');

    useEffect(() => {
        getActivity();
    }, [JSON.stringify(paginationParams), props.supplierManufacturerID])

    const getActivity = () => {
        getAPI(`supplier_manufacturer_activity`, {
            ...paginationParams,
            supplier_manufacturer_id: props.supplierManufacturerID
        }, (response: any) => {
            const supplierManufacturerActivityData: SupplierManufacturerActivityCollectionResponse = response.data;
            setActivityData(supplierManufacturerActivityData);
        }, setIsActivityLoading)    
    } 
    return (
        <WindowOverlay 
            title="Supplier/Manufacturer History"
            show={props.show}
            hideFunc={props.hideFunc}
            maxWidth={600}        
            top
        >
            <SupplierManufacturerActivityList
                isSupplierManufacturerActivityLoading={isActivityLoading}
                supplierManufacturerActivity={activityData}
                perPage={paginationParams.perPage}
                totalCount={props.totalCount}
            />
        </WindowOverlay>
    )
}

export default SupplierManufacturerHistory