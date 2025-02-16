import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import OuterContainer from "../../components/ui/Containers/OuterContainer/OuterContainer";
import { QuoteCollectionResponse } from "../../types/quote.types";
import getAPI from "../../utils/getAPI";
import QuoteList from "./QuoteListPage/QuoteList";
import QuoteSearchHeader from "./components/QuoteSearchHeader";
import getQuoteSearchParams from "./utils/getQuoteSearchParams";
import { DepartmentCollectionResponse, DepartmentResponseData } from "../../types/department.types";

const QuoteListPage = ()  => {
    const { departmentName } = useParams();
    const [searchParams] = useSearchParams();

    // Search States
    const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
    
    // Data States
    const [isDepartmentLoading, setIsDepartmentLoading] = useState(true);
    const [departmentData, setDepartmentData] = useState<DepartmentResponseData>();
    const [isQuotesLoading, setIsQuotesLoading] = useState(true);
    const [quoteData, setQuoteData] = useState<QuoteCollectionResponse>();
    
    // Search Parameters 
    const quoteSearchParams = getQuoteSearchParams(searchParams);

    useEffect(() => {
        getDepartment();
    }, [departmentName]);

    useEffect(() => {
        searchQuotes();
    }, [departmentData, JSON.stringify(quoteSearchParams)]);

    const getDepartment = () => {
        getAPI(`departments`, {
            names: [departmentName]
        }, (response: any) => {
            const departmentData: DepartmentCollectionResponse = response.data;
            const currentDepartmentData = departmentData.data[0];
            setDepartmentData(currentDepartmentData)
        }, setIsDepartmentLoading)
    }

    const searchQuotes = () => {
        if (departmentData === undefined) return;
        getAPI('quotes', {
            ...quoteSearchParams,
            department_id: departmentData.id
        }, (response: any) => {
            const quoteData: QuoteCollectionResponse = response.data;
            setQuoteData(quoteData);
        }, setIsQuotesLoading)
    }

    return (
        <>
            <OuterContainer
                title='Quotes'
                description='Create, edit and send quotes to customers. Process accepted quotes.'
                maxWidth={1600}
                noBorder
            >
                <QuoteSearchHeader
                    showAdvancedSearch={() => setShowAdvancedSearch(true)}
                    departmentName={departmentName as string}
                />
                <QuoteList 
                    isQuotesLoading={isQuotesLoading} 
                    quotes={quoteData} 
                    perPage={quoteSearchParams.perPage}                
                />
            </OuterContainer>
        </>
    )
}

export default QuoteListPage