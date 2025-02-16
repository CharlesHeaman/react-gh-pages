import { FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import AdvancedSearchFooter from "../../../../components/ui/AdvancedSearchFooter/AdvancedSearchFooter";
import WindowOverlay from "../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import getObjectHasValue from "../../../../utils/getObjectHasValue";
import updateAdvancedSearchParam from "../../../../utils/setAdvancedSearchParams";
import EquipmentAdvancedSearchForm, { AdvancedEquipmentSearchForm } from "./EquipmentAdvancedSearchForm";
import getEquipmentAdvancedSearchParams from "./getEquipmentAdvancedSearchParams";
import clearEquipmentAdvancedSearchParams from "../utils/clearEquipmentAdvancedSearchParams";

const EquipmentAdvancedSearch = (props: {
    show: boolean,
    hideFunc: () => void
}) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const prefix = "equipment"
    const advancedParams = getEquipmentAdvancedSearchParams(searchParams);
    const hasAdvancedSearch = getObjectHasValue(advancedParams);

    const currentSearchParams = {
        code_like: advancedParams.code_like ? advancedParams.code_like : '',
        description_like: advancedParams.description_like ? advancedParams.description_like : '',
        location_like: advancedParams.location_like ? advancedParams.location_like : '',
        serial_number_like: advancedParams.serial_number_like ? advancedParams.serial_number_like : '',
        model_number_like: advancedParams.model_number_like ? advancedParams.model_number_like : ''
    }
    
    // Search States
    const [advancedSearchParams, setAdvancedSearchParams] = useState<AdvancedEquipmentSearchForm>(currentSearchParams);

    useEffect(() => {
        setAdvancedSearchParams(currentSearchParams)
    }, [JSON.stringify(advancedParams)])

    const doSearch = (event?: FormEvent<HTMLFormElement>) => {
        event && event.preventDefault();
        updateAdvancedSearchParam(prefix, advancedSearchParams, searchParams, setSearchParams)
        props.hideFunc();
    }

    return (
        <WindowOverlay 
            title="Equipment Advanced Search"
            show={props.show}
            hideFunc={props.hideFunc}
            maxWidth={400}
            footer={<AdvancedSearchFooter 
                resourceName="Equipment"
                hasAdvancedSearch={hasAdvancedSearch} 
                searchFunc={doSearch} 
                clearFunc={() => clearEquipmentAdvancedSearchParams(searchParams, (searchParams) => setSearchParams(searchParams))}
            />}
        >
            <form
                onSubmit={doSearch}
            >
                <EquipmentAdvancedSearchForm
                    advancedSearchParams={advancedSearchParams}
                    setAdvancedSearchParams={setAdvancedSearchParams}
                />   
                
            </form>
        </WindowOverlay>
    )
}

export default EquipmentAdvancedSearch