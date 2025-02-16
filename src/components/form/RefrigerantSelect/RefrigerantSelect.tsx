import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import getAPI from "../../../utils/getAPI";
import NewSelectMenu from "../NewSelectMenu/NewSelectMenu";
import FormErrorMessage from "../FormErrorMessage/FormErrorMessage";
import { RefrigerantResponseData, RefrigerantCollectionResponse } from "../../../types/refrigerant.types";

const RefrigerantSelect = (props: {
    selectedRefrigerant: RefrigerantResponseData | undefined,
    setSelectedRefrigerant: Dispatch<SetStateAction<RefrigerantResponseData | undefined>>,
    isConsumable?: boolean,
    required?: boolean,
    hasSubmitted?: boolean
}) => {

    // Search States
    const [searchTerm, setSearchTerm] = useState('');

    // Data States
    const [isRefrigerantsLoading, setIsRefrigerantsLoading] = useState(false);
    const [refrigerantsData, setRefrigerantsData] = useState<RefrigerantCollectionResponse>();

    useEffect(() => {
        getRefrigerants();
    }, [searchTerm])

    const getRefrigerants = () => {
        getAPI('refrigerants', {
            name_or_common_name_like: searchTerm,
            is_consumable: props.isConsumable ? true : false,
            is_active: true,
        }, (response: any) => {
            const refrigerantData: RefrigerantCollectionResponse = response.data;
            setRefrigerantsData(refrigerantData);
        }, setIsRefrigerantsLoading);
    }

    const showRequired = props.selectedRefrigerant === undefined && props.hasSubmitted === true;

    return (
        <>
            <NewSelectMenu
                iconFont={props.isConsumable ? "co2" : 'propane'}
                resourceName={props.isConsumable ? 'gas/air' : 'refrigerant'}
                resourceNamePlural={props.isConsumable ? 'gas/air' : 'refrigerants'}
                selectedText={props.selectedRefrigerant?.data.name}
                showSearch
                onSearchUpdate={(event: ChangeEvent<HTMLInputElement>) => setSearchTerm(event.target.value)}
                selectItems={refrigerantsData ? refrigerantsData.data.map(refrigerant => {
                    return {
                        text: `${refrigerant.data.name} (${refrigerant.data.common_name})`,
                        clickFunc: () => props.setSelectedRefrigerant(refrigerant),
                        selected: props.selectedRefrigerant?.id === refrigerant.id
                    }
                }) : []}
                
            />
            {props.required && <FormErrorMessage 
                text={`${props.isConsumable ? 'Gas/Air' : 'Refrigerant'} is required`}
                show={showRequired}
            />}
        </>
    )
}

export default RefrigerantSelect