import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import OuterContainer from "../../components/ui/Containers/OuterContainer/OuterContainer";
import { QuoteCollectionResponse } from "../../types/quote.types";
import getAPI from "../../utils/getAPI";
import { DepartmentCollectionResponse, DepartmentResponseData } from "../../types/department.types";
import getQuoteSearchParams from "../Quotes/utils/getQuoteSearchParams";
import QuoteSearchHeader from "../Quotes/components/QuoteSearchHeader";
import QuoteList from "../Quotes/QuoteListPage/QuoteList";

const JobsListPage = ()  => {
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
            department_id: departmentData.id,
            is_job: true
        }, (response: any) => {
            const quoteData: QuoteCollectionResponse = response.data;
            setQuoteData(quoteData);
        }, setIsQuotesLoading)
    }

    return (
        <>
            <OuterContainer
                title='Jobs'
                description='[description]'
                maxWidth={1600}
                noBorder
            >
                <QuoteSearchHeader
                    showAdvancedSearch={() => setShowAdvancedSearch(true)}
                    departmentName={departmentName as string}
                    isJobs
                />
                <QuoteList 
                    isQuotesLoading={isQuotesLoading} 
                    quotes={quoteData} 
                    perPage={quoteSearchParams.perPage}        
                    isJobs        
                />
            </OuterContainer>
        </>
    )
}

export default JobsListPage