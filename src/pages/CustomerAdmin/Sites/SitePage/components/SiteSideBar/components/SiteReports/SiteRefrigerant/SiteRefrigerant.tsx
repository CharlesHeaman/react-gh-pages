import { useEffect, useState } from "react";
import GridItem from "../../../../../../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../../../../../../components/ui/Containers/InfoGrid/InfoGrid";
import WindowOverlay from "../../../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import NewCustomerLink from "../../../../../../../../../components/ui/Links/NewCustomerLink";
import SiteLink from "../../../../../../../../../components/ui/Links/SiteLink";
import { CustomerResponseData } from "../../../../../../../../../types/customers.types";
import { EquipmentCollectionResponse } from "../../../../../../../../../types/equipment.types";
import { RefrigerantCollectionResponse } from "../../../../../../../../../types/refrigerant.types";
import { SiteResponseData } from "../../../../../../../../../types/sites.types";
import getAPI from "../../../../../../../../../utils/getAPI";
import RefrigerantHoldingList from "../../../../../../../Customers/CustomerPage/components/CustomerSideBar/components/CustomerReports/components/RefrigerantHoldingList";

const SiteRefrigerant = (props: {
    customer: CustomerResponseData,
    site: SiteResponseData,
    siteID: number,
    show: boolean,
    hideFunc: () => void,
}) => {
    // Data States
    const [isEquipmentLoading, setIsEquipmentLoading] = useState(false);
    const [equipmentData, setEquipmentData] = useState<EquipmentCollectionResponse>();
    const [isRefrigerantLoading, setIsRefrigerantLoading] = useState(false);
    const [refrigerantData, setRefrigerantData] = useState<RefrigerantCollectionResponse>();

    
    useEffect(() => {
        getEquipment(props.siteID);
    }, [props.siteID])

    const getEquipment = (siteID: number) => {
        getAPI(`equipment`, {
            site_ids: [siteID],
            is_active: true,
        }, (response: any) => {
            const equipmentData: EquipmentCollectionResponse = response.data;
            setEquipmentData(equipmentData);
            if (equipmentData.data.length > 0) {
                getRefrigerantData([...new Set(equipmentData.data.map(equipment => equipment.data.refrigerant_id))]);
            }
        }, setIsEquipmentLoading)    
    } 

    const getRefrigerantData = (refrigerantIDs: Array<number | null>) => {
        const idsArray = refrigerantIDs.filter(refrigerantID => refrigerantID !== null);
        getAPI('refrigerants', {
            ids: idsArray.length > 0 ? idsArray : [-1]
        }, (response: any) => {
            const refrigerantData: RefrigerantCollectionResponse = response.data;
            setRefrigerantData(refrigerantData);
        }, setIsRefrigerantLoading);
    }

    return (
        <WindowOverlay 
            title={"Site Refrigerant Holding"} 
            maxWidth={300} 
            show={props.show}
            hideFunc={props.hideFunc} 
        >
            <InfoGrid>
                <GridItem title='Customer'>
                    <NewCustomerLink code={props.customer.data.code} name={props.customer.data.name}/>
                </GridItem>
                <GridItem title='Site'>
                    <SiteLink code={props.site.data.code} name={props.site.data.name}/>
                </GridItem>
                <GridItem title='Description'>
                    <p>{props.site.data.description}</p>
                </GridItem>
            </InfoGrid>
            <RefrigerantHoldingList 
                isRefrigerantsLoading={isRefrigerantLoading || isEquipmentLoading}
                refrigerants={refrigerantData} 
                equipment={equipmentData}
                perPage={5}
            />
        </WindowOverlay>
    )
}

export default SiteRefrigerant