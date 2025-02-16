import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import WindowOverlay from "../../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { GasBottleCollectionResponse } from "../../../../../../../../types/gasBottle.types";
import getAPI from "../../../../../../../../utils/getAPI";
import GasBottleList from "../../../../../../../GasBottles/GasBottlesListPage/components/GasBottleList";
import GasBottleSearchHeader from "../../../../../../../GasBottles/GasBottlesListPage/components/GasBottleSearchHeader";
import getGasBottleSearchParams from "../../../../../../../GasBottles/GasBottlesListPage/utils/getGasBottleSearchParams";

const GasSupplierGasBottlesList = (props: {
    supplierID: number,
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
    }, [props.supplierID, JSON.stringify(gasBottleSearchParams)])


    const searchGasBottles = () => {
        getAPI('gas_bottles', {
            supplier_id: props.supplierID,
            ...gasBottleSearchParams,
        }, (response: any) => {
            const gasBottleData: GasBottleCollectionResponse = response.data;
            setGasBottleData(gasBottleData);
        }, setIsGasBottleLoading);
    }
    return (
        <WindowOverlay 
            title={"Gas Supplier Gas Bottles"} 
            maxWidth={1000} 
            show={props.show}
            hideFunc={props.hideFunc} 
            top
        >
            <GasBottleSearchHeader
                showAdvancedSearch={() => setShowAdvancedSearch(true)}
                supplierID={props.supplierID}
            />
            <GasBottleList 
                hasSearched={true} 
                isGasBottlesLoading={isGasBottleLoading}
                gasBottles={gasBottleData}
                perPage={gasBottleSearchParams.perPage}
                totalCount={props.totalCount}
                hideSupplier
            />
        </WindowOverlay>
    )
}

export default GasSupplierGasBottlesList