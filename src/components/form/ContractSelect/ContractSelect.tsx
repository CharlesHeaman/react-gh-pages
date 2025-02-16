import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import getAPI from "../../../utils/getAPI";
import NewSelectMenu from "../NewSelectMenu/NewSelectMenu";
import FormErrorMessage from "../FormErrorMessage/FormErrorMessage";
import { ContractResponseData, ContractCollectionResponse } from "../../../types/contract.types";

const ContractSelect = (props: {
    selectedContract: ContractResponseData | undefined,
    setSelectedContract: Dispatch<SetStateAction<ContractResponseData | undefined>>,
    required?: boolean,
    hasSubmitted: boolean,
    customerID?: number,
}) => {

    // Search States
    const [searchTerm, setSearchTerm] = useState('');

    // Data States
    const [isContractsLoading, setIsContractsLoading] = useState(false);
    const [contractsData, setContractsData] = useState<ContractCollectionResponse>();

    useEffect(() => {
        getContracts();
    }, [searchTerm])

    const getContracts = () => {
        getAPI('contracts', {
            reference_number_like: searchTerm,
            is_active: true,
            customer_ids: props.customerID ? [props.customerID] : undefined
        }, (response: any) => {
            const contractData: ContractCollectionResponse = response.data;
            setContractsData(contractData);
        }, setIsContractsLoading);
    }

    const showRequired = props.selectedContract === undefined && props.hasSubmitted;

    return (
        <>
            <NewSelectMenu
                iconFont="history_edu"
                resourceName="contract"
                resourceNamePlural="contracts"
                selectedText={props.selectedContract?.data.reference_number}
                showSearch
                onSearchUpdate={(event: ChangeEvent<HTMLInputElement>) => setSearchTerm(event.target.value)}
                selectItems={contractsData ? contractsData.data.map(contract => {
                    return {
                        text: contract.data.reference_number,
                        clickFunc: () => props.setSelectedContract(contract),
                        selected: props.selectedContract?.id === contract.id
                    }
                }) : []}
            />
            {props.required && <FormErrorMessage 
                text={`Contract is required`}
                show={showRequired}
            />}
        </>
    )
}

export default ContractSelect