import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import WindowOverlay from "../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { QuoteCollectionResponse } from "../../../../../../../types/quote.types";
import getAPI from "../../../../../../../utils/getAPI";
import QuoteList from "../../../../../../Quotes/QuoteListPage/QuoteList";
import QuoteSearchHeader from "../../../../../../Quotes/components/QuoteSearchHeader";

const EquipmentOpenQuotes = (props: {
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
    const searchTerm = searchParams.get('search');
    const offset = searchParams.get('quotesOffset');
    const paramPerPage = searchParams.get('quotesPerPage');
    const perPage = paramPerPage ? parseInt(paramPerPage) : 25;
    
    useEffect(() => {
        getQuotes();
    }, [searchTerm, offset, perPage, props.equipmentID])
    
    const getQuotes = () => {
        getAPI(`quotes`, {
            number_like: searchTerm,
            offset: offset,
            perPage: perPage,
            equipment_id: props.equipmentID,
            statuses: [0, 2],
        }, (response: any) => {
            const quoteData: QuoteCollectionResponse = response.data;
            setQuoteData(quoteData);
        }, setIsQuotesLoading)    
    } 

    return (
        <>
            <WindowOverlay
                title='Equipment Open Quotes'
                show={props.show}
                hideFunc={props.hideFunc}
                maxWidth={1200}
            >
                <QuoteSearchHeader
                    showAdvancedSearch={() => setShowAdvancedSearch(true)}
                    equipmentID={props.equipmentID}
                />
                <QuoteList 
                    isQuotesLoading={isQuotesLoading} 
                    quotes={quoteData}
                    perPage={perPage} 
                    totalCount={props.totalCount}
                    hideCustomer
                />
            </WindowOverlay>
        </>
    )
}

export default EquipmentOpenQuotes