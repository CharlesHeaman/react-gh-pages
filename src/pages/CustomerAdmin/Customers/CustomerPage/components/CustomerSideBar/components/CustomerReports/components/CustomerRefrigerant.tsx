import { useEffect, useState } from "react";
import GridItem from "../../../../../../../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../../../../../../../components/ui/Containers/InfoGrid/InfoGrid";
import WindowOverlay from "../../../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import CustomerLink from "../../../../../../../../../components/ui/Links/CustomerLink";
import NewCustomerLink from "../../../../../../../../../components/ui/Links/NewCustomerLink";
import { CustomerResponseData } from "../../../../../../../../../types/customers.types";
import { EquipmentCollectionResponse } from "../../../../../../../../../types/equipment.types";
import { RefrigerantCollectionResponse } from "../../../../../../../../../types/refrigerant.types";
import { SiteCollectionResponse } from "../../../../../../../../../types/sites.types";
import getAPI from "../../../../../../../../../utils/getAPI";
import RefrigerantHoldingList from "./RefrigerantHoldingList";

const CustomerRefrigerant = (props: {
    customer: CustomerResponseData,
    show: boolean,
    hideFunc: () => void,
}) => {
    // Data States
    const [isSitesLoading, setIsSiteLoading] = useState(true);
    const [isEquipmentLoading, setIsEquipmentLoading] = useState(false);
    const [equipmentData, setEquipmentData] = useState<EquipmentCollectionResponse>();
    const [isRefrigerantLoading, setIsRefrigerantLoading] = useState(false);
    const [refrigerantData, setRefrigerantData] = useState<RefrigerantCollectionResponse>();
    
    useEffect(() => {
        getSites(props.customer.id);
    }, [props.customer.id])

    const getSites = (customerID: number) => {
        getAPI(`sites`, {
            customer_ids: [customerID],
            is_active: true,
        }, (response: any) => {
            const siteData: SiteCollectionResponse = response.data;
            if (siteData.data.length > 0) {
                getEquipment([...new Set(siteData.data.map(site => site.id))]);
            } else {
                getEquipment([-1]);
            }
        }, setIsSiteLoading);
    }

    const getEquipment = (siteIDs: Array<number>) => {
        getAPI(`equipment`, {
            site_ids: siteIDs,
            is_active: true,
        }, (response: any) => {
            const equipmentData: EquipmentCollectionResponse = response.data;
            setEquipmentData(equipmentData);
            if (equipmentData.data.length > 0) {
                getRefrigerantData([...new Set(equipmentData.data.map(equipment => equipment.data.refrigerant_id))]);
            } else {
                getRefrigerantData([-1])
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
            title={"Customer Refrigerant Holding"} 
            maxWidth={300} 
            show={props.show}
            hideFunc={props.hideFunc} 
        >
            <InfoGrid>
                <GridItem title='Customer'>
                    <NewCustomerLink code={props.customer.data.code} name={props.customer.data.name}/>
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

export default CustomerRefrigerant