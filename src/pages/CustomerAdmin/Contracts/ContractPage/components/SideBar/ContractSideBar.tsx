import { Dispatch, SetStateAction, useEffect, useState } from "react"
import SideBarButton from "../../../../../../components/ui/Buttons/SideBarButton/SideBarButton"
import SideBarModule from "../../../../../../components/ui/Containers/SideBarModule/SideBarModule"
import { ContractResponseData } from "../../../../../../types/contract.types"
import ContractDeactivate from "./components/ContractDeactivate"
import ContractSideBarSkeleton from "./components/ContractSideBarSkeleton"
import ContractAssociatedData from "./components/ContractSite/ContractAssociatedData"
import { SiteCollectionResponse } from "../../../../../../types/sites.types"
import getAPI from "../../../../../../utils/getAPI"
import ContractActions from "./components/ContractActions/ContractActions"
import { CustomerResponseData } from "../../../../../../types/customers.types"
import { TicketCollectionResponse } from "../../../../../../types/tickets.types"
import ContractTickets from "./components/ContractTickets/ContractTickets"
import { ContractActivityCollectionResponse } from "../../../../../../types/contractActivity.types"
import ContractAccounts from "./components/ContractAccounts/ContractAcounts"
import { useNavigate } from "react-router-dom"
import ExportResource from "../../../../Contacts/ContactPage/components/ContactSideBar/components/ContactDeactivate/ExportResource"
import PermsProtectedComponent from "../../../../../../components/PermsProtectedComponent"

const ContractSideBar = (props: {
    contract: ContractResponseData | undefined,
    customer: CustomerResponseData | undefined
    setContractData: Dispatch<SetStateAction<ContractResponseData | undefined>>,
    setIsEditMode: Dispatch<SetStateAction<boolean>>
}) => {
    const navigate = useNavigate();

    // Data States
    const [isSitesLoading, setIsSitesLoading] = useState(false);
    const [sitesData, setSitesData] = useState<SiteCollectionResponse>();
    const [isEquipmentLoading, setIsEquipmentLoading] = useState(false);
    const [equipmentData, setEquipmentData] = useState<SiteCollectionResponse>();
    const [isServiceTicketsLoading, setIsServiceTicketsLoading] = useState(false);
    const [serviceTickets, setServiceTickets] = useState<TicketCollectionResponse>();
    const [isMaintenanceTicketsLoading, setIsMaintenanceTicketsLoading] = useState(false);
    const [maintenanceTickets, setMaintenanceTickets] = useState<TicketCollectionResponse>();
    const [isOpenTicketsLoading, setIsOpenTicketsLoading] = useState(false);
    const [openTickets, setOpenTickets] = useState<TicketCollectionResponse>();
    const [isActivityLoading, setIsActivityLoading] = useState(true);
    const [activityData, setActivityData] = useState<ContractActivityCollectionResponse>();
    
    useEffect(() => {
        if (props.contract?.id === undefined) return;
        getSites(props.contract.id);
        getEquipment(props.contract.id);
        getServiceHistory(props.contract.id);
        getMaintenanceHistory(props.contract.id);
        getOpenTickets(props.contract.id);
    }, [props.contract?.id]);

    useEffect(() => {
        if (props.contract?.id === undefined) return;
        getActivity(props.contract.id);
    }, [JSON.stringify(props.contract)]);


    const getSites = (contractID: number) => {
        getAPI(`sites`, {
            contract_ids: [contractID],
            is_active: true,
        }, (response: any) => {
            const siteData: SiteCollectionResponse = response.data;
            setSitesData(siteData);
        }, setIsSitesLoading);
    }

    const getEquipment = (contractID: number) => {
        getAPI(`equipment`, {
            contract_id: contractID,
            is_active: true,
        }, (response: any) => {
            const siteData: SiteCollectionResponse = response.data;
            setEquipmentData(siteData);
        }, setIsEquipmentLoading);
    }

    const getServiceHistory = (contractID: number) => {
        getAPI(`tickets`, {
            contract_id: contractID,
            ticket_type: 0
        }, (response: any) => {
            const serviceTicketData: TicketCollectionResponse = response.data;
            setServiceTickets(serviceTicketData);
        }, setIsServiceTicketsLoading)    
    } 

    const getMaintenanceHistory = (contractID: number) => {
        getAPI(`tickets`, {
            contract_id: contractID,
            ticket_type: 1
        }, (response: any) => {
            const ticketData: TicketCollectionResponse = response.data;
            setMaintenanceTickets(ticketData);
        }, setIsMaintenanceTicketsLoading)    
    } 

    const getOpenTickets = (contractID: number) => {
        getAPI(`tickets`, {
            contract_id: contractID,
            is_invoice_requested: false,
            suffixes: [0],
        }, (response: any) => {
            const ticketData: TicketCollectionResponse = response.data;
            setOpenTickets(ticketData);
        }, setIsOpenTicketsLoading)    
    } 

    const getActivity = (contractID: number) => {
        getAPI(`contract_activity`, {
            contract_id: contractID,
            perPage: 1
        }, (response: any) => {
            const contractActivityData: ContractActivityCollectionResponse = response.data;
            setActivityData(contractActivityData);
        }, setIsActivityLoading)    
    } 

    const isSideBarLoading = (
        isSitesLoading || 
        isEquipmentLoading || 
        isServiceTicketsLoading || 
        isMaintenanceTicketsLoading ||
        isOpenTicketsLoading ||
        isActivityLoading
    )

    return (
        !isSideBarLoading && props.contract && props.customer && sitesData && equipmentData && serviceTickets && maintenanceTickets && openTickets && activityData ? 
            <>
                {props.contract.data.is_active ? <>
                    <PermsProtectedComponent requiredPerms={{ customers: 2 }}>
                        <ContractActions
                            contractID={props.contract.id}
                            notes={props.contract.data.notes}
                            customer={props.customer}
                            getSites={getSites}
                            setContractData={props.setContractData}
                        />
                    </PermsProtectedComponent>

                    <PermsProtectedComponent requiredPerms={{ accounts: 2 }}>
                        <ContractAccounts
                            contractID={props.contract.id}
                            purchaseOrderNumber={props.contract.data.purchase_order_number}
                            setContractData={props.setContractData}
                        />
                    </PermsProtectedComponent>

                </> : null}
                <ContractAssociatedData
                    contractID={props.contract.id}
                    sitesCount={sitesData.total_count}
                    equipmentCount={equipmentData.total_count}
                    activityCount={activityData.total_count}
                />
                <ContractTickets
                    contractID={props.contract.id}
                    serviceCount={serviceTickets.total_count}
                    maintenanceCount={maintenanceTickets.total_count}
                />
                <SideBarModule title="Reports">
                    <SideBarButton
                        text="Profit Report"
                        iconFont="summarize"
                        clickEvent={() => navigate('report')}
                    />
                </SideBarModule>
                <PermsProtectedComponent requiredPerms={{ customers: 2 }}>
                    <ContractDeactivate 
                        contractID={props.contract.id} 
                        ticketCount={openTickets.total_count}
                        reactivate={!props.contract.data.is_active} 
                        setContractData={props.setContractData}
                    />
                </PermsProtectedComponent>

                <ExportResource
                    resourceName="contract"
                    resourceData={props.contract}
                />
            </> 
        :
        // Skeleton
        <ContractSideBarSkeleton/>
    )
}

export default ContractSideBar