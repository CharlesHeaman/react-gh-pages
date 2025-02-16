import { useEffect, useState } from 'react';
import { useSearchParams } from "react-router-dom";
import OuterContainer from "../../components/ui/Containers/OuterContainer/OuterContainer";
import { RiskAssessmentMethodStatementCollectionResponse } from '../../types/riskAssessmentMethodStatements.types';
import getAPI from '../../utils/getAPI';
import RiskAssessmentMethodStatementList from './RiskAssessmentMethodStatementList';
import RiskAssessmentMethodStatementSearchHeader from './RiskAssessmentMethodStatementSearchHeader';
import getRiskAssessmentMethodStatementSearchParams from './utils/getRiskAssessmentMethodStatementSearchParams';

const RiskAssessmentMethodStatementListPage = () => {
    const [searchParams] = useSearchParams();

    // Data States
    const [isRAMSLoading, setIsRAMSLoading] = useState(true);
    const [ramsData, setRamsData] = useState<RiskAssessmentMethodStatementCollectionResponse>();

    // Search Parameters
    const ramsSearchParams = getRiskAssessmentMethodStatementSearchParams(searchParams);
    console.log(ramsSearchParams)

    useEffect(() => {
        searchRams();
    }, [JSON.stringify(ramsSearchParams)])

    const searchRams = () => {
        getAPI('risk_assessment_method_statements', ramsSearchParams, (response: any) => {
            const ramsData: RiskAssessmentMethodStatementCollectionResponse = response.data;
            setRamsData(ramsData);
        }, setIsRAMSLoading)
    }

    return (
        <>
            <OuterContainer
                title='Risk Assessment Method Statements'
                maxWidth={1200}
                description='Create and view risk assessment method statements generated for tickets.'
                noBorder
            >
                <RiskAssessmentMethodStatementSearchHeader/>
                <RiskAssessmentMethodStatementList 
                    isRAMSLoading={isRAMSLoading} 
                    rams={ramsData} 
                    perPage={ramsSearchParams.perPage}
                />
            </OuterContainer>
        </>
    )
}

export default RiskAssessmentMethodStatementListPage