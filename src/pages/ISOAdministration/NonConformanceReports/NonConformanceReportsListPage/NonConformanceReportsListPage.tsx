import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import OuterContainer from "../../../../components/ui/Containers/OuterContainer/OuterContainer";
import { NonConformanceReportCollectionResponse } from "../../../../types/nonConformanceReport.types";
import getAPI from "../../../../utils/getAPI";
import getNonConformanceReportSearchParams from "../utils/getNonConformanceReportSearchParams";
import NonConformanceReportSearchHeader from "./components/NonConformanceReportSearchHeader";
import NonConformanceReportList from "./components/NonConformanceReportsList";

const NonConformanceReportsListPage = () => {
    const [searchParams] = useSearchParams();

    // Data States
    const [isNonConformanceReportsLoading, setIsNonConformanceReportsLoading] = useState(false);
    const [nonConformanceReportsData, setNonConformanceReportsData] = useState<NonConformanceReportCollectionResponse>();

    // Search Parameters 
    const nonConformanceSearchParams = getNonConformanceReportSearchParams(searchParams);

    useEffect(() => {
        searchNonConformanceReports();
    }, [JSON.stringify(nonConformanceSearchParams)])

    const searchNonConformanceReports = () => {
        getAPI('non_conformance_reports', nonConformanceSearchParams, (response: any) => {
            const NonConformanceReportsData: NonConformanceReportCollectionResponse = response.data;
            setNonConformanceReportsData(NonConformanceReportsData);
        }, setIsNonConformanceReportsLoading);
    }

    return (
        <>
            <OuterContainer 
                title='Non-conformance Reports' 
                maxWidth={1800}
                description="Create, review and process non-conformance reports."
                noBorder
            >
                <NonConformanceReportSearchHeader/>
                <NonConformanceReportList 
                    isNonConformanceReportsLoading={isNonConformanceReportsLoading} 
                    nonConformanceReports={nonConformanceReportsData} 
                    perPage={nonConformanceSearchParams.perPage}
                />
            </OuterContainer> 
        </>
    )
}

export default NonConformanceReportsListPage