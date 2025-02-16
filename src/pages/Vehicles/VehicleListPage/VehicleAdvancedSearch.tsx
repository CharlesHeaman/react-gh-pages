import { FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import AdvancedSearchFooter from "../../../components/ui/AdvancedSearchFooter/AdvancedSearchFooter";
import WindowOverlay from "../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { DepartmentResponseData } from "../../../types/department.types";
import getAPI from "../../../utils/getAPI";
import getObjectHasValue from "../../../utils/getObjectHasValue";
import updateAdvancedSearchParam from "../../../utils/setAdvancedSearchParams";
import getVehicleAdvancedSearchParams from "./utils/getVehicleAdvancedSearchParam";
import VehicleAdvancedSearchForm, { AdvancedVehicleSearchForm } from "./VehicleAdvancedSearchForm";
import clearVehicleAdvancedSearchParams from "./utils/clearVehicleAdvancedSearchParam";

const VehicleAdvancedSearch = (props: {
    show: boolean,
    hideFunc: () => void
}) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const prefix = "vehicles"
    const advancedParams = getVehicleAdvancedSearchParams(searchParams);
    const hasAdvancedSearch = getObjectHasValue(advancedParams);

    const currentSearchParams = {
        mot_due_date_or_tax_due_date_before: advancedParams.mot_due_date_or_tax_due_date_before ? new Date(advancedParams.mot_due_date_or_tax_due_date_before) : undefined,
    }

    const [advancedSearchParams, setAdvancedSearchParams] = useState<AdvancedVehicleSearchForm>(currentSearchParams);

    useEffect(() => {
        setAdvancedSearchParams(currentSearchParams)
    }, [JSON.stringify(advancedParams)]);

    const doSearch = (event?: FormEvent<HTMLFormElement>) => {
        event && event.preventDefault();
        updateAdvancedSearchParam(prefix, advancedSearchParams, searchParams, setSearchParams)
        props.hideFunc();
    }

    return (
        <WindowOverlay 
            title="Vehicle Advanced Search"
            show={props.show}
            hideFunc={props.hideFunc}
            maxWidth={400}
            footer={
            <AdvancedSearchFooter 
                resourceName="Vehicles"
                hasAdvancedSearch={hasAdvancedSearch} 
                searchFunc={doSearch} 
                clearFunc={() => clearVehicleAdvancedSearchParams(searchParams, (searchParams) => setSearchParams(searchParams))}
            />}
        >
            <form
                onSubmit={doSearch}
            >
                <VehicleAdvancedSearchForm
                    advancedSearchParams={advancedSearchParams}
                    setAdvancedSearchParams={setAdvancedSearchParams}
                />
            </form>
        </WindowOverlay>
    )
}

export default VehicleAdvancedSearch