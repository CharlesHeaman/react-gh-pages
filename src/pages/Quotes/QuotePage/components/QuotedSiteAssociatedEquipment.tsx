import { Dispatch, SetStateAction, useEffect, useState } from "react";
import SideBarButton from "../../../../components/ui/Buttons/SideBarButton/SideBarButton";
import SideBarModule from "../../../../components/ui/Containers/SideBarModule/SideBarModule";
import SiteTypeSummary from "./SiteTypeSummary";
import { EquipmentCollectionResponse, EquipmentResponseData } from "../../../../types/equipment.types";
import getAPI from "../../../../utils/getAPI";
import { EquipmentTypeCollectionResponse, EquipmentTypeResponseData } from "../../../../types/equipmentType.types";
import { EditQuoteLineData } from "./EditEquipmentQuoteMaterials";
import { QuotedSiteResponseData } from "../../../../types/quotedSites.types";
import filterEquipmentTypeEquipment from "../../../CustomerAdmin/Customers/CustomerPage/components/CustomerSideBar/components/CustomerReports/utils/filterEquipmentTypeEquipment";

const QuotedSiteAssociatedEquipment = (props: {
    quotedSite: QuotedSiteResponseData,
    setAutoAddedQuoteLines?: Dispatch<SetStateAction<Array<EditQuoteLineData>>>,
    isEdit?: boolean,
}) => {
    const [showEquipment, setShowEquipment] = useState(false);

    // Data States
    const [isEquipmentLoading, setIsEquipmentLoading] = useState(false);
    const [equipmentData, setEquipmentData] = useState<Array<EquipmentResponseData>>([]);
    const [isEquipmentTypesLoading, setIsEquipmentTypesLoading] = useState(false);
    const [equipmentTypesData, setEquipmentTypesData] = useState<Array<EquipmentTypeResponseData>>([]);
 
    // Search Parameters 
    useEffect(() => {
        getEquipment();
    }, [props.quotedSite.data.site_id])
     
    const getEquipment = () => {
        getAPI(`equipment`, {
            site_ids: [props.quotedSite.data.site_id],
            is_active: true
        }, (response: any) => {
            const equipmentData: EquipmentCollectionResponse = response.data;
            setEquipmentData(equipmentData.data);
            getEquipmentTypes([...new Set(equipmentData.data.map(equipment => equipment.data.equipment_type_id))]);
        }, setIsEquipmentLoading)    
    }

    const getEquipmentTypes = (equipmentTypeIDs: Array<number | null>) => {
        const idsArray = equipmentTypeIDs.filter(equipmentTypeID => equipmentTypeID !== null);
        getAPI('equipment_types', {
            ids: idsArray.length > 0 ? idsArray : [-1],
        }, (response: any) => {
            const equipmentTypeData: EquipmentTypeCollectionResponse = response.data;
            setEquipmentTypesData(equipmentTypeData.data);
        }, setIsEquipmentTypesLoading);
    }

    const autoPopulate = () => {
        for (let equipmentTypeIndex = 0; equipmentTypeIndex < equipmentTypesData.length; equipmentTypeIndex++) {
            const currentEquipmentType = equipmentTypesData[equipmentTypeIndex];
            const quantity = filterEquipmentTypeEquipment(equipmentData, currentEquipmentType.id).length;
            addQuoteLine(currentEquipmentType, quantity);
        }
        const unknownQuantity = filterEquipmentTypeEquipment(equipmentData, null).length;
        if (unknownQuantity > 0) {
            addUnknownQuoteLine(unknownQuantity);
        }

    }

    const addQuoteLine = (equipmentType: EquipmentTypeResponseData, quantity: number) => {
        // Add New Line 
        if (props.setAutoAddedQuoteLines === undefined) return;
        props.setAutoAddedQuoteLines(prevState => [
            ...prevState,
            {
                line_id: new Date().getTime() * -1 * equipmentType.id,
                quote_id: props.quotedSite.data.quote_id,
                site_id: props.quotedSite.data.site_id,
                equipment_id: null,
                is_equipment: true,
                quantity: quantity.toString(),
                category: 0,
                description: equipmentType.data.name,
                supplier: '',
                price: equipmentType.data.service_duration.toString(),
                markup: '0',
            }
        ]);
    }

    const addUnknownQuoteLine = (quantity: number) => {
        // Add New Line 
        if (props.setAutoAddedQuoteLines === undefined) return;
        props.setAutoAddedQuoteLines(prevState => [
            ...prevState,
            {
                line_id: new Date().getTime() * -1,
                quote_id: props.quotedSite.data.quote_id,
                site_id: props.quotedSite.data.site_id,
                equipment_id: null,
                is_equipment: true,
                quantity: quantity.toString(),
                category: 0,
                description: 'Unknown',
                supplier: '',
                price: '0',
                markup: '0',
            }
        ]);
    }
    
    return (
        <>
            <SideBarModule title="Site Equipment">
                {props.isEdit ? <SideBarButton
                    text="Auto Populate Equipment"
                    iconFont="auto_awesome"
                    color="purple"
                    clickEvent={autoPopulate}
                /> : null}
                <SideBarButton
                    text="Equipment Summary"
                    iconFont="local_laundry_service"
                    clickEvent={() => setShowEquipment(true)}
                />
            </SideBarModule>

            {props.quotedSite.data.site_id ? <SiteTypeSummary 
                siteID={props.quotedSite.data.site_id} 
                show={showEquipment} 
                hideFunc={() => setShowEquipment(false)}
            /> : null}
        </>
    )
}

export default QuotedSiteAssociatedEquipment