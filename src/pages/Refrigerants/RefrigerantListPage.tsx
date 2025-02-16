import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import OuterContainer from "../../components/ui/Containers/OuterContainer/OuterContainer";
import { RefrigerantCollectionResponse } from "../../types/refrigerant.types";
import getAPI from "../../utils/getAPI";
import RefrigerantList from "./RefrigerantList";
import RefrigerantSearchHeader from "./RefrigerantSearchHeader";
import getRefrigerantSearchParams from "./utils/getRefrigerantSearchParams";
import CreateRefrigerant from "./components/CreateRefrigerant";

const RefrigerantListPage = ()  => {
    const [searchParams] = useSearchParams();

    const [showCreate, setShowCreate] = useState(false);
    
    // Data States
    const [isRefrigerantLoading, setIsRefrigerantLoading] = useState(true);
    const [refrigerantData, setRefrigerantData] = useState<RefrigerantCollectionResponse>();

    // Search Parameters 
    const refrigerantSearchParams = getRefrigerantSearchParams(searchParams);
    
    useEffect(() => {
        searchRefrigerants();
    }, [JSON.stringify(refrigerantSearchParams)])

    const searchRefrigerants = () => {
        getAPI('refrigerants', {
            ...refrigerantSearchParams
        }, (response: any) => {
            const refrigerantData: RefrigerantCollectionResponse = response.data;
            setRefrigerantData(refrigerantData);
        }, setIsRefrigerantLoading);
    }

    return (
        <>
            <OuterContainer
                title='Refrigerants, Gas/Air'
                maxWidth={1400}
                description="Create, edit and deactivate refrigerants, gas/air. Manage refrigerant, gas/air associated products."
                noBorder
            >
                <RefrigerantSearchHeader
                    showCreate={() => setShowCreate(true)}
                />
                <RefrigerantList
                    isRefrigerantLoading={isRefrigerantLoading}
                    refrigerants={refrigerantData}
                    perPage={refrigerantSearchParams.perPage}
                />
            </OuterContainer>

            <CreateRefrigerant 
                show={showCreate} 
                hideFunc={() => setShowCreate(false)}
            />
        </>
    )
}

export default RefrigerantListPage