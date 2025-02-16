import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import getAPI from "../../../utils/getAPI";
import NewSelectMenu from "../NewSelectMenu/NewSelectMenu";
import FormErrorMessage from "../FormErrorMessage/FormErrorMessage";
import { CostCentreResponseData, CostCentreCollectionResponse } from "../../../types/costCentres.types";

const CostCentreSelect = (props: {
    selectedCostCentre: CostCentreResponseData | undefined,
    setSelectedCostCentre: Dispatch<SetStateAction<CostCentreResponseData | undefined>>,
    associatedResourceType?: number,
    required?: boolean,
    hasSubmitted: boolean
}) => {

    // Search States
    const [searchTerm, setSearchTerm] = useState('');

    // Data States
    const [isCostCentresLoading, setIsCostCentresLoading] = useState(false);
    const [costCentresData, setCostCentresData] = useState<CostCentreCollectionResponse>();

    useEffect(() => {
        getCostCentres();
    }, [searchTerm])

    const getCostCentres = () => {
        getAPI('cost_centres', {
            name_like: searchTerm,
            associated_resource_type: props.associatedResourceType,
            is_active: true,
        }, (response: any) => {
            const costCentreData: CostCentreCollectionResponse = response.data;
            setCostCentresData(costCentreData);
        }, setIsCostCentresLoading);
    }

    const showRequired = props.selectedCostCentre === undefined && props.hasSubmitted;

    return (
        <>
            <NewSelectMenu
                iconFont="point_of_sale"
                resourceName="cost centre"
                resourceNamePlural="cost centres"
                selectedText={props.selectedCostCentre?.data.name}
                showSearch
                onSearchUpdate={(event: ChangeEvent<HTMLInputElement>) => setSearchTerm(event.target.value)}
                selectItems={costCentresData ? costCentresData.data.map(costCentre => {
                    return {
                        text: costCentre.data.name,
                        clickFunc: () => props.setSelectedCostCentre(costCentre),
                        selected: props.selectedCostCentre?.id === costCentre.id
                    }
                }) : []}
            />
            {props.required && <FormErrorMessage 
                text={`Cost centre is required`}
                show={showRequired}
            />}
        </>
    )
}

export default CostCentreSelect