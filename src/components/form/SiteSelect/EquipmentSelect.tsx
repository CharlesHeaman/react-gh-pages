import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import { EquipmentCollectionResponse, EquipmentResponseData } from "../../../types/equipment.types";
import getAPI from "../../../utils/getAPI";
import FormErrorMessage from "../FormErrorMessage/FormErrorMessage";
import NewSelectMenu from "../NewSelectMenu/NewSelectMenu";

const EquipmentSelect = (props: {
    selectedEquipment: EquipmentResponseData | undefined,
    setSelectedEquipment: Dispatch<SetStateAction<EquipmentResponseData | undefined>>,
    required?: boolean,
    customerID?: number,
    siteID?: number,
    hasSubmitted: boolean,
    showUnknown?: boolean
}) => {

    // Search States
    const [searchTerm, setSearchTerm] = useState('');

    // Data States
    const [isEquipmentLoading, setIsEquipmentLoading] = useState(false);
    const [equipmentData, setEquipmentData] = useState<EquipmentCollectionResponse>();

    useEffect(() => {
        getEquipment();
    }, [searchTerm, props.customerID, props.siteID])

    const getEquipment = () => {
        getAPI('equipment', {
            code_like: searchTerm,
            customer_ids: props.customerID ? [props.customerID] : undefined,
            site_ids: props.siteID ? [props.siteID] : undefined,
            is_active: true,
        }, (response: any) => {
            const equipmentData: EquipmentCollectionResponse = response.data;
            setEquipmentData(equipmentData);
        }, setIsEquipmentLoading);
    }

    const showRequired = props.selectedEquipment === undefined && props.hasSubmitted;

    const equipmentList = equipmentData ? equipmentData.data.map(equipment => {
        return {
            text: equipment.data.code,
            clickFunc: () => props.setSelectedEquipment(equipment),
            selected: props.selectedEquipment?.id === equipment.id
        }
    }) : [];

    if (props.showUnknown) {
        equipmentList.unshift({
            text: 'Unknown',
            clickFunc: () => props.setSelectedEquipment(undefined),
            selected: props.selectedEquipment === undefined
        })
    }

    return (
        <>
            <NewSelectMenu
                iconFont="local_laundry_service"
                resourceName="equipment"
                resourceNamePlural="equipment"
                selectedText={props.selectedEquipment ? 
                        props.selectedEquipment.data.code :
                        props.showUnknown ? 'Unknown' : undefined
                }
                showSearch
                onSearchUpdate={(event: ChangeEvent<HTMLInputElement>) => setSearchTerm(event.target.value)}
                selectItems={equipmentList}
            />
            {props.required && <FormErrorMessage 
                text={`Equipment is required`}
                show={showRequired}
            />}
        </>
    )
}

export default EquipmentSelect