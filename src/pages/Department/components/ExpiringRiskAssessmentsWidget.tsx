import { useEffect, useState } from "react";
import DashboardWidget from "../../../components/ui/DashboardWidget/DashboardWidget";
import { RiskAssessmentCollectionResponse } from "../../../types/riskAssessment.types";
import getAPI from "../../../utils/getAPI";
import getMonthRelativeDate from "../../../utils/getMonthRelativeDate";

const ExpiringRiskAssessmentsWidget = () => {
    // Data States
    const [isRiskAssessmentsLoading, setIsRiskAssessmentsLoading] = useState(true);
    const [riskAssessmentData, setRiskAssessmentData] = useState<RiskAssessmentCollectionResponse>();

    useEffect(() => {
        getExpiredRiskAssessments();
    }, []);

    const getExpiredRiskAssessments = () => {
        getAPI('risk_assessments', {
            is_active: true,
            next_review_before: getMonthRelativeDate(new Date(), 1),
            perPage: 1,
        }, (response: any) => {
            const riskAssessmentsData: RiskAssessmentCollectionResponse = response.data;
            setRiskAssessmentData(riskAssessmentsData);
        }, setIsRiskAssessmentsLoading);
    }


    return (
        <DashboardWidget 
            title="Risk Assessments"
            count={riskAssessmentData?.total_count}
            text="Review required in the next month." 
            iconFont={"assignment_late"}
            to="../iso/rams_admin/risk_assessments"
        />
    )
}

export default ExpiringRiskAssessmentsWidget;