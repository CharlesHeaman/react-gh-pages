import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import WindowOverlay from "../../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { GasBottleCollectionResponse } from "../../../../../../../../types/gasBottle.types";
import getAPI from "../../../../../../../../utils/getAPI";
import GasBottleList from "../../../../../../GasBottlesListPage/components/GasBottleList";
import GasBottleSearchHeader from "../../../../../../GasBottlesListPage/components/GasBottleSearchHeader";
import getGasBottleSearchParams from "../../../../../../GasBottlesListPage/utils/getGasBottleSearchParams";

const RefrigerantGasBottles = (props: {
    refrigerantID: number,
    totalCount: number,
    show: boolean,
    hideFunc: () => void
}) => {
    const [searchParams] = useSearchParams();

    // Data States
    const [isGasBottleLoading, setIsGasBottleLoading] = useState(true);
    const [gasBottleData, setGasBottleData] = useState<GasBottleCollectionResponse>();

    // Search States
    const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

    // Search Parameters
    const gasBottleSearchParams = getGasBottleSearchParams(searchParams);

    useEffect(() => {
        searchGasBottles();
    }, [props.refrigerantID, JSON.stringify(gasBottleSearchParams)])


    const searchGasBottles = () => {
        getAPI('gas_bottles', {
            ...gasBottleSearchParams,
            refrigerant_id: props.refrigerantID,
        }, (response: any) => {
            const gasBottleData: GasBottleCollectionResponse = response.data;
            setGasBottleData(gasBottleData);
        }, setIsGasBottleLoading);
    }
    return (
        <WindowOverlay 
            title={"Refrigerant Gas Bottles"} 
            maxWidth={1500} 
            show={props.show}
            hideFunc={props.hideFunc} 
            top
        >
            <GasBottleSearchHeader
                showAdvancedSearch={() => setShowAdvancedSearch(true)}
                refrigerantID={props.refrigerantID}
            />
            <GasBottleList 
                hasSearched={true} 
                isGasBottlesLoading={isGasBottleLoading}
                gasBottles={gasBottleData}
                perPage={gasBottleSearchParams.perPage}
                totalCount={props.totalCount}
                hideRefrigerant
            />
        </WindowOverlay>
    )
}

export default RefrigerantGasBottles