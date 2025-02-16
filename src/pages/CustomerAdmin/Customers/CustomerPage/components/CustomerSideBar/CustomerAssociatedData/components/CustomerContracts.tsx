import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import WindowOverlay from "../../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay"
import { ContractCollectionResponse } from "../../../../../../../../types/contract.types"
import getAPI from "../../../../../../../../utils/getAPI"
import ContractList from "../../../../../../Contracts/components/ContractList"
import ContractSearchHeader from "../../../../../../Contracts/components/ContractSearchHeader"
import getContractSearchParams from "../../../../../../Contracts/utils/getContractSearchParams"

const CustomerContractsList = (props: {
    customerID: number,
    show: boolean,
    hideFunc: () => void,
    totalCount: number,
}) => {
    const [searchParams] = useSearchParams();

    // Search States
    const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

    // Data States
    const [isContractLoading, setIsContractLoading] = useState(false);
    const [contractData, setContractData] = useState<ContractCollectionResponse>();

    // Search Parameters 
    const contractSearchParams = getContractSearchParams(searchParams);
    
    useEffect(() => {
        searchContracts();
    }, [props.customerID, JSON.stringify(contractSearchParams)])

    const searchContracts = () => {
        setShowAdvancedSearch(false);
        getAPI('contracts', {
            customer_ids: [props.customerID],
            ...contractSearchParams
        }, (response: any) => {
            const contractData: ContractCollectionResponse = response.data;
            setContractData(contractData);
        }, setIsContractLoading);
    }

    return (
        <>
            <WindowOverlay
                title='Customer Contracts'
                show={props.show}
                hideFunc={props.hideFunc}
                maxWidth={1200}
                top
            >
                <ContractSearchHeader 
                    showAdvancedSearch={() => setShowAdvancedSearch(true)}
                    customerID={props.customerID}
                />
                <ContractList 
                    hasSearched={true} 
                    isContractsLoading={isContractLoading} 
                    contracts={contractData} 
                    perPage={contractSearchParams.perPage}           
                    totalCount={props.totalCount} 
                    hideCustomer        
                />
            </WindowOverlay>
        </>
    )
}

export default CustomerContractsList