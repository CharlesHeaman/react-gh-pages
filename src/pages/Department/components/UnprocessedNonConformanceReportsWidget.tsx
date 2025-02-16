import { useEffect, useState } from "react";
import DashboardWidget from "../../../components/ui/DashboardWidget/DashboardWidget";
import getAPI from "../../../utils/getAPI";
import { NonConformanceReportCollectionResponse } from "../../../types/nonConformanceReport.types";

const UnprocessedNonConformanceReportsWidget = () => {
    // Data States
    const [isNonConformanceReportsLoading, setIsNonConformanceReportsLoading] = useState(false);
    const [nonConformanceReportsData, setNonConformanceReportssData] = useState<NonConformanceReportCollectionResponse>();

    useEffect(() => {
        getEngineers();
    }, []);

    const getEngineers = () => {
        getAPI('non_conformance_reports', {
            is_processed: false
        }, (response: any) => {
            const nonConformanceReportsData: NonConformanceReportCollectionResponse = response.data;
            setNonConformanceReportssData(nonConformanceReportsData);
        }, setIsNonConformanceReportsLoading);
    }

    return (
        <DashboardWidget 
            title="Non-conformance Reports"
            count={nonConformanceReportsData?.total_count}
            text="Reports that have not been processed." 
            iconFont={"feedback"}
            to={`../iso/non_conformance_reports`}
            negative
        />
    )
}

export default UnprocessedNonConformanceReportsWidget;