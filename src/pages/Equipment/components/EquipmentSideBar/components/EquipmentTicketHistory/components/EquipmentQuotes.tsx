import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import WindowOverlay from "../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { QuoteCollectionResponse } from "../../../../../../../types/quote.types";
import getAPI from "../../../../../../../utils/getAPI";
import QuoteList from "../../../../../../Quotes/QuoteListPage/QuoteList";
import QuoteSearchHeader from "../../../../../../Quotes/components/QuoteSearchHeader";
import getQuoteSearchParams from "../../../../../../Quotes/utils/getQuoteSearchParams";

const EquipmentQuoteHistory = (props: {
    equipmentID: number,
    totalCount: number,
    show: boolean,
    hideFunc: () => void,
}) => {
    const [searchParams] = useSearchParams();

    // Search States 
    const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

    // Data States
    const [isQuotesLoading, setIsQuotesLoading] = useState(false);
    const [quoteData, setQuoteData] = useState<QuoteCollectionResponse>();

    // Search Parameters 
    const quoteSearchParams = getQuoteSearchParams(searchParams);
    
    useEffect(() => {
        getQuotes();
    }, [JSON.stringify(quoteSearchParams), props.equipmentID])
    
    const getQuotes = () => {
        getAPI(`quotes`, {
            ...quoteSearchParams,
            equipment_id: props.equipmentID,
        }, (response: any) => {
            const quoteData: QuoteCollectionResponse = response.data;
            setQuoteData(quoteData);
        }, setIsQuotesLoading)    
    } 

    return (
        <>
            <WindowOverlay
                title='Equipment Quote History'
                show={props.show}
                hideFunc={props.hideFunc}
                maxWidth={1200}
            >
                <QuoteSearchHeader
                    showAdvancedSearch={() => setShowAdvancedSearch(true)}
                    equipmentID={props.equipmentID}
                    startAll
                />
                <QuoteList 
                    isQuotesLoading={isQuotesLoading} 
                    quotes={quoteData}
                    perPage={quoteSearchParams.perPage} 
                    totalCount={props.totalCount}
                    hideCustomer
                />
            </WindowOverlay>
        </>
    )
}

export default EquipmentQuoteHistory