import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import WindowOverlay from "../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { AdditionalTimeCollectionResponse } from "../../../../types/additionalTime.types";
import getAPI from "../../../../utils/getAPI";
import getPaginationParams from "../../../../utils/getPaginationParams";
import AdditionalTimeList from "./AdditionalTimeList";


const AdditionalTimeActivityAdditionalTime = (props: {
    additionalTimeActivityID: number,
    totalCount: number,
    show: boolean,
    hideFunc: () => void,
}) => {
    const [searchParams] = useSearchParams();

    // Data States 
    const [isAdditionalTimeLoading, setIsAdditionalTimeLoading] = useState(true);
    const [additionalTimeData, setAdditionalTimeData] = useState<AdditionalTimeCollectionResponse>();
    
    // Search Parameters 
    const paginationParams = getPaginationParams(searchParams, 'additional_time');

    useEffect(() => {
        getAdditionalTime();
    }, [props.additionalTimeActivityID, JSON.stringify(paginationParams)])

    const getAdditionalTime = () => {
        getAPI(`additional_time`, {
            ...paginationParams,
            activity_id: props.additionalTimeActivityID,
        }, (response: any) => {
            const productData: AdditionalTimeCollectionResponse = response.data;
            setAdditionalTimeData(productData);
        }, setIsAdditionalTimeLoading);
    }

    return (
        <WindowOverlay 
            title={"Additional Time Activity Additional Time"} 
            maxWidth={700} 
            show={props.show}
            hideFunc={props.hideFunc} 
            top
        >
            <AdditionalTimeList 
                isAdditionalTimeLoading={isAdditionalTimeLoading} 
                additionalTime={additionalTimeData} 
                perPage={paginationParams.perPage}  
                totalCount={props.totalCount}   
            />
        </WindowOverlay>
    )
}

export default AdditionalTimeActivityAdditionalTime