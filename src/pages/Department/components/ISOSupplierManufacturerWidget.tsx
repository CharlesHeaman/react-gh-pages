import { useEffect, useState } from "react";
import DashboardWidget from "../../../components/ui/DashboardWidget/DashboardWidget";
import { DescriptionOfWorksCollectionResponse } from "../../../types/descriptionOfWorks.types";
import getAPI from "../../../utils/getAPI";

const ISOSupplierManufacturerWidget = () => {
    // Data States
    const [isDescriptionOfWorksLoading, setIsDescriptionOfWorksLoading] = useState(true);
    const [descriptionOfWorkData, setDescriptionOfWorkData] = useState<DescriptionOfWorksCollectionResponse>();

    useEffect(() => {
        getExpiredDescriptionOfWorks();
    }, []);

    const getExpiredDescriptionOfWorks = () => {
        getAPI('suppliers_manufacturers', {
            is_active: true,
            is_approved: 'null',
            perPage: 1,
        }, (response: any) => {
            const descriptionOfWorksData: DescriptionOfWorksCollectionResponse = response.data;
            setDescriptionOfWorkData(descriptionOfWorksData);
        }, setIsDescriptionOfWorksLoading);
    }


    return (
        <DashboardWidget 
            title="Suppliers/Manufacturers"
            count={descriptionOfWorkData?.total_count}
            text="Pending ISO approval."
            iconFont={"warehouse"} 
            to="../suppliers_manufacturers?suppliers_manufacturers_is_approved=null&suppliers_manufacturers_search=&suppliers_manufacturers_has_searched=true"
        />
    )
}

export default ISOSupplierManufacturerWidget;