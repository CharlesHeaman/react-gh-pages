import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import WindowOverlay from "../../../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { AssetCollectionResponse } from "../../../../../../../../../types/asset.types";
import { GasBottleCollectionResponse } from "../../../../../../../../../types/gasBottle.types";
import getAPI from "../../../../../../../../../utils/getAPI";
import GasBottleList from "../../../../../../../../GasBottles/GasBottlesListPage/components/GasBottleList";

const UserGasBottles = (props: {
    userID: number,
    totalCount: number,
    show: boolean,
    hideFunc: () => void,
}) => {
    const [searchParams] = useSearchParams();

    // Data States 
    const [isGasBottlesLoading, setIsGasBottlesLoading] = useState(true);
    const [gasBottleData, setGasBottleData] = useState<GasBottleCollectionResponse>();
    
    // Search Parameters 
    const offset = searchParams.get('offset');
    const paramPerPage = searchParams.get('perPage');
    const perPage = paramPerPage ? parseInt(paramPerPage) : 25;

    useEffect(() => {
        getGasBottles();
    }, [props.userID, offset, perPage])

    const getGasBottles = () => {
        getAPI(`gas_bottles`, {
            assigned_to_ids: [props.userID],
            is_active: true,
            perPage: perPage,
            offset: offset
        }, (response: any) => {
            const gasBottleData: GasBottleCollectionResponse = response.data;
            setGasBottleData(gasBottleData);
        }, setIsGasBottlesLoading)    
    }

    return (
        <WindowOverlay 
            title={"User Gas Bottles"} 
            maxWidth={1000} 
            show={props.show}
            hideFunc={props.hideFunc} 
        >
            <GasBottleList 
                hasSearched
                isGasBottlesLoading={isGasBottlesLoading} 
                gasBottles={gasBottleData} 
                perPage={perPage}
                totalCount={props.totalCount}
                hideAssignedTo
            />
        </WindowOverlay>
    )
}

export default UserGasBottles