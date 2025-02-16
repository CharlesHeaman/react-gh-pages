import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import NewSelectMenu from "../NewSelectMenu/NewSelectMenu";
import FormErrorMessage from "../FormErrorMessage/FormErrorMessage";
import { GasBottleCollectionResponse, GasBottleResponseData } from "../../../types/gasBottle.types";
import getAPI from "../../../utils/getAPI";

const BottleSelect = (props: {
    selectedBottle: GasBottleResponseData | undefined,
    setSelectedBottle: Dispatch<SetStateAction<GasBottleResponseData | undefined>>,
    isConsumable: boolean,
    required?: boolean,
    hasSubmitted: boolean
}) => {

    // Search States
    const [searchTerm, setSearchTerm] = useState('');

    // Data States
    const [isBottlesLoading, setIsBottlesLoading] = useState(false);
    const [bottlesData, setBottlesData] = useState<GasBottleCollectionResponse>();

    useEffect(() => {
        getBottles();
    }, [searchTerm])

    const getBottles = () => {
        getAPI('gas_bottles', {
            number_like: searchTerm,
            is_consumable: props.isConsumable,
            is_returned: false,
            is_queued: false,
            is_active: true,
        }, (response: any) => {
            const bottleData: GasBottleCollectionResponse = response.data;
            setBottlesData(bottleData);
        }, setIsBottlesLoading);
    }

    const showRequired = props.selectedBottle === undefined && props.hasSubmitted;

    return (
        <>
            <NewSelectMenu
                iconFont="groups"
                resourceName="bottle"
                resourceNamePlural="bottles"
                selectedText={props.selectedBottle?.data.number}
                showSearch
                onSearchUpdate={(event: ChangeEvent<HTMLInputElement>) => setSearchTerm(event.target.value)}
                selectItems={bottlesData ? bottlesData.data.map(bottle => {
                    return {
                        text: bottle.data.number,
                        clickFunc: () => props.setSelectedBottle(bottle),
                        selected: props.selectedBottle?.id === bottle.id
                    }
                }) : []}
            />
            {props.required && <FormErrorMessage 
                text={`Bottle is required`}
                show={showRequired}
            />}
        </>
    )
}

export default BottleSelect