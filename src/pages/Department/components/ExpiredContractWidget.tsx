import { useEffect, useState } from "react";
import DashboardWidget from "../../../components/ui/DashboardWidget/DashboardWidget";
import { ContractCollectionResponse } from "../../../types/contract.types";
import getAPI from "../../../utils/getAPI";

const ExpiredContractWidget = (props: {
    departmentID?: number | null,
}) => {
    // Data States
    const [isContractsLoading, setIsContractsLoading] = useState(false);
    const [contractData, setContractsData] = useState<ContractCollectionResponse>();

    useEffect(() => {
        if (props.departmentID === undefined) return
        getEngineers();
    }, [props.departmentID]);

    const getEngineers = () => {
        getAPI('contracts', {
            department_id: props.departmentID ? props.departmentID : undefined,
            end_before: new Date(),
            is_active: true,
            perPage: 1
        }, (response: any) => {
            const contractData: ContractCollectionResponse = response.data;
            setContractsData(contractData);
        }, setIsContractsLoading);
    }

    return (
        <DashboardWidget 
            title="Contracts"
            count={contractData?.total_count}
            text="Active expired contracts." 
            iconFont={"history_edu"}
            to={`/contracts?contracts_is_active=true&contracts_department_id=${props.departmentID}&contracts_has_searched=true&contracts_search=&contracts_end_before=${new Date().toISOString().split('T')[0]}`}
            negative
        />
    )
}

export default ExpiredContractWidget;