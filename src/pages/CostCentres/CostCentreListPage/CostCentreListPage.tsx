import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import OuterContainer from "../../../components/ui/Containers/OuterContainer/OuterContainer";
import { CostCentreCollectionResponse } from "../../../types/costCentres.types";
import getAPI from "../../../utils/getAPI";
import CostCentreList from "./components/CostCentreList";
import CostCentreSearchHeader from "./components/CostCentresSearchHeader";
import CreateCostCentre from "./components/CreateCostCentre";
import getCostCentreSearchParams from "./utils/getCostCentreSearchParams";

const CostCentreListPage = ()  => {
    const [searchParams] = useSearchParams();

    const [showCreate, setShowCreate] = useState(false);

    // Data States 
    const [isCostCentresLoading, setIsCostCentresLoading] = useState(true);
    const [costCentreData, setCostCentreData] = useState<CostCentreCollectionResponse>();

    const costCentreSearchParams = getCostCentreSearchParams(searchParams);

    useEffect(() => {
        searchCostCentres();
    }, [JSON.stringify(costCentreSearchParams)])

    const searchCostCentres = () => {
        getAPI('cost_centres', costCentreSearchParams, (response: any) => {
            const costCentreData: CostCentreCollectionResponse = response.data;
            setCostCentreData(costCentreData);
        }, setIsCostCentresLoading);
    }
    
    return (
        <>
            <OuterContainer
                title='Cost Centres'
                maxWidth={700}
                description='Create, edit and deactivate cost centres. Manage cost centre associated resources and departments.'
                noBorder
            >
                <CostCentreSearchHeader
                    showCreate={() => setShowCreate(true)}
                />
                <CostCentreList
                    isCostCentresLoading={isCostCentresLoading}
                    costCentreData={costCentreData}
                    perPage={costCentreSearchParams.perPage}
                />   
            </OuterContainer>

            <CreateCostCentre
                show={showCreate}
                hideFunc={() => setShowCreate(false)}
            />
        </>
    )
}

export default CostCentreListPage