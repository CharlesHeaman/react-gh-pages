import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import OuterContainer from "../../../components/ui/Containers/OuterContainer/OuterContainer";
import { ContractCollectionResponse } from "../../../types/contract.types";
import getAPI from "../../../utils/getAPI";
import CustomerAdminNavigation from "../components/CustomerAdminNavigation";
import ContractAdvancedSearch from "./components/ContractAdvancedSearch";
import ContractList from "./components/ContractList";
import ContractSearchHeader from "./components/ContractSearchHeader";
import getContractSearchParams from "./utils/getContractSearchParams";

const ContractListPage = () => {
    const [searchParams] = useSearchParams();

    // Search States
    const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
    
    // Data States
    const [isContractLoading, setIsContractLoading] = useState(false);
    const [contractData, setContractData] = useState<ContractCollectionResponse>();

    // Search Parameters 
    const hasSearched = searchParams.get(`contracts_has_searched`) === "true";
    const contractSearchParams = getContractSearchParams(searchParams);

    useEffect(() => {
        hasSearched && searchContracts();
    }, [JSON.stringify(contractSearchParams)])

    const searchContracts = () => {
        setShowAdvancedSearch(false);
        getAPI('contracts', {
            ...contractSearchParams
        }, (response: any) => {
            const contractData: ContractCollectionResponse = response.data;
            setContractData(contractData);
        }, setIsContractLoading);
    }

    return (
        <>
            <CustomerAdminNavigation location='contracts'/>
            <OuterContainer 
                title='Customer Contracts' 
                maxWidth={1600}
                description="Create, edit and deactivate customer contracts. Manage contracted sites."
                noBorder
            >
                <ContractSearchHeader 
                    showAdvancedSearch={() => setShowAdvancedSearch(true)}
                />
                <ContractList 
                    hasSearched={hasSearched} 
                    isContractsLoading={isContractLoading} 
                    contracts={contractData} 
                    perPage={contractSearchParams.perPage}       
                    showAdvancedSearch={() => setShowAdvancedSearch(true)}         
                />
            </OuterContainer> 

            <ContractAdvancedSearch 
                show={showAdvancedSearch} 
                hideFunc={() => setShowAdvancedSearch(false)}            
            />
        </>
    )
}

export default ContractListPage