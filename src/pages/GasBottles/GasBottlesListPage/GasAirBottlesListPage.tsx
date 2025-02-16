import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import OuterContainer from "../../../components/ui/Containers/OuterContainer/OuterContainer";
import { GasBottleCollectionResponse } from "../../../types/gasBottle.types";
import getAPI from "../../../utils/getAPI";
import BottleAdminNavigation from "./BottleAdminNavigation";
import GasBottleAdvancedSearch from "./components/GasBottleAdvancedSearch";
import GasBottleList from "./components/GasBottleList";
import GasBottleSearchHeader from "./components/GasBottleSearchHeader";
import getGasBottleSearchParams from "./utils/getGasBottleSearchParams";

const GasAirBottlesListPage = ()  => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    // Search States
    const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

    // Data States
    const [isGasBottleLoading, setIsGasBottleLoading] = useState(false);
    const [gasBottleData, setGasBottleData] = useState<GasBottleCollectionResponse>();

    // Search Parameters 
    const hasSearched = searchParams.get(`gas_bottles_has_searched`) === "true";
    const gasBottleSearchParams = getGasBottleSearchParams(searchParams);
    
    useEffect(() => {
        hasSearched && searchGasBottles();
    }, [JSON.stringify(gasBottleSearchParams)])


    const searchGasBottles = () => {
        setShowAdvancedSearch(false);
        getAPI('gas_bottles', {
            ...gasBottleSearchParams,
            is_consumable: true,
            is_active: true
        }, (response: any) => {
            const gasBottleData: GasBottleCollectionResponse = response.data;
            setGasBottleData(gasBottleData);
        }, setIsGasBottleLoading);
    }
    
    return (
        <>
            <BottleAdminNavigation location="gas_air"/>
            <OuterContainer
                title='Gas/Air Bottles'
                maxWidth={1500}
                description="Create gas/air bottles. Manage gas/air bottle assignment. Return gas/air bottles to supplier."
                noBorder
            >
                <GasBottleSearchHeader
                    showAdvancedSearch={() => setShowAdvancedSearch(true)}
                    isConsumable
                />
                <GasBottleList 
                    hasSearched={hasSearched} 
                    isGasBottlesLoading={isGasBottleLoading}
                    gasBottles={gasBottleData}
                    perPage={gasBottleSearchParams.perPage}
                    showAdvancedSearch={() => setShowAdvancedSearch(true)} 
                    isConsumable
                />
            </OuterContainer>

            <GasBottleAdvancedSearch
                show={showAdvancedSearch}
                hideFunc={() => setShowAdvancedSearch(false)}
            />
        </>
    )
}

export default GasAirBottlesListPage