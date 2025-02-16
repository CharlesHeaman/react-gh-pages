import PaginationNavigation from "../../../../components/ui/PaginationNavigation/PaginationNavigation"
import SearchTable from "../../../../components/ui/SearchTable/SearchTable"
import { RiskAssessmentCollectionResponse } from "../../../../types/riskAssessment.types"
import SupplierManufacturerRowSkeleton from "../../../SuppliersManufacturers/SupplierManufacturerListPage/components/SuppliersManufacturersRowSkeleton"
import RiskAssessmentRow from "./RiskAssessmentRow"

const RiskAssessmentList = (props: {
    isRiskAssessmentsLoading: boolean,
    riskAssessments: RiskAssessmentCollectionResponse | undefined,
    perPage: number,
    totalCount?: number,
}) => {
    // Resource Constants
    const resourceName = 'risk assessments';
    const resourceIcon = 'assignment_late';

    const isLoading = (
        props.isRiskAssessmentsLoading
    )

    return (
        <div>
            <SearchTable
                headers={['Name', 'Next Review']}
                isLoading={!(!isLoading && props.riskAssessments)}
                skeletonRow={<SupplierManufacturerRowSkeleton/>}
                skeletonCount={Math.min(props.perPage, props.totalCount ? props.totalCount : Infinity)}
                count={props.riskAssessments ? props.riskAssessments.data.length : 0}
                resourceName={resourceName}
                resourceIconFont={resourceIcon}
                body={props.riskAssessments && props.riskAssessments.data.map((riskAssessment, index) => 
                   <RiskAssessmentRow
                        riskAssessment={riskAssessment}
                        key={index}
                    />
                )}
            />
            {(!isLoading && props.riskAssessments) && <PaginationNavigation
                data={props.riskAssessments.data}
                totalCount={props.riskAssessments.total_count}
                perPage={props.riskAssessments.pages.per_page}
                resourceName={resourceName}
                prefix="risk_assessments"
            />}
        </div>
    )
}

export default RiskAssessmentList