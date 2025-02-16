import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PermsProtectedComponent from "../../components/PermsProtectedComponent";
import DashboardWrapper from "../../components/ui/Containers/DashboardWrapper/DashboardWrapper";
import DashboardWidget from "../../components/ui/DashboardWidget/DashboardWidget";
import { DescriptionOfWorksCollectionResponse } from "../../types/descriptionOfWorks.types";
import { GasBottleCollectionResponse } from "../../types/gasBottle.types";
import { PostCompletionChangeRequestCollectionResponse } from "../../types/postCompletionChangeRequets.types";
import { QuoteCollectionResponse } from "../../types/quote.types";
import { RiskAssessmentCollectionResponse } from "../../types/riskAssessment.types";
import { TimegridCollectionResponse } from "../../types/timegrid.types";
import { UserCollectionResponse } from "../../types/user.types";
import { VehicleCollectionResponse } from "../../types/vehicles.types";
import getAPI from "../../utils/getAPI";
import getMonthRelativeDate from "../../utils/getMonthRelativeDate";
import EngineerEquipmentDetailsWidget from "./components/EngineerEquipmentDetailsWidget";
import ExpiredContractWidget from "./components/ExpiredContractWidget";
import NoResponseQuotesWidget from "./components/NoResponseQuotesWidget";
import RAMSRequiredTicketWidget from "./components/RAMSRequiredTicketWidget";
import UnassignedTicketWidget from "./components/UnassignedTicketWidget";
import UnprocessedChangeRequestWidget from "./components/UnprocessedChangeRequestWidget";
import UnprocessedNonConformanceReportsWidget from "./components/UnprocessedNonConformanceReportsWidget";
import UnprocessedTimegridWidget from "./components/UnprocessedTimegridWidget";
import FurtherActionRequiredTicketWidget from "./components/FurtherActionRequiredTicketWidget";
import AwaitingApprovalQuotesWidget from "./components/AwaitingApprovalQuotesWidget";
import OutstandingVanReplenishmentRequestWidget from "./components/OutstandingVanReplenishmentRequestWidget";
import ReorderRequiredProductsWidget from "./components/ReorderRequiredProductsWidget";
import ExpiringRefrigerantBottlesWidget from "./components/ExpiringRefrigerantBottles";
import ExpiringGasAirBottlesWidget from "./components/ExpiringGasAirBottlesWidget";
import ExpiringVehiclesWidget from "./components/ExpiringVehiclesWidget";
import CreditCheckCustomerWidget from "./components/CreditCheckCustomerWidget";
import ReconciliationPurchaseOrderWidget from "./components/ReconciliationPurchaseOrdersWidget";
import OutstandingTicketInvoiceRequestWidget from "./components/OutstandingTicketInvoiceRequestWidget";
import ApprovalTicketInvoiceRequestWidget from "./components/ApprovalTicketInvoiceRequestWidget";
import OutstandingJobInvoiceRequestWidget from "./components/OutstandingJobInvoiceRequestWidget";
import ExpiringRiskAssessmentsWidget from "./components/ExpiringRiskAssessmentsWidget";
import ExpiringDescriptionOfWorksWidget from "./components/ExpiringDescriptionOfWorksWidget";
import ISOSupplierManufacturerWidget from "./components/ISOSupplierManufacturerWidget";
import PATestingWidget from "./components/PATestingWidget";
import CalibrationWidget from "./components/CalibrationsWidget";
import InspectionWidget from "./components/InspectionsWidget";
import MaintenanceWidget from "./components/MaintenanceWidget";

const DashboardWidgets = (props: {
    departmentID: number | null | undefined;
}) => {
    // Data States 
    const [isVehicleLoading, setIsVehicleLoading] = useState(true);
    const [vehicleData, setVehicleData] = useState<VehicleCollectionResponse>();
    const [isGasBottleLoading, setIsGasBottleLoading] = useState(false);
    const [gasBottleData, setGasBottleData] = useState<GasBottleCollectionResponse>();
    const [isDescriptionOfWorksLoading, setIsDescriptionOfWorksLoading] = useState(true);
    const [descriptionOfWorksData, setDescriptionOfWorksData] = useState<DescriptionOfWorksCollectionResponse>();
    const [isQuotesLoading, setIsQuotesLoading] = useState(true);
    const [quoteData, setQuoteData] = useState<QuoteCollectionResponse>();
    const [isEngineersLoading, setIsEngineersLoading] = useState(true);
    const [engineerData, setEngineerData] = useState<UserCollectionResponse>();
    const [isTimegridsLoading, setIsTimegridsLoading] = useState(false);
    const [timegridData, setTimegridsData] = useState<TimegridCollectionResponse>();
    const [isRequestsLoading, setIsRequestsLoading] = useState(true);
    const [postCompletionChangeRequestsData, setPostCompletionChangeRequestsData] = useState<PostCompletionChangeRequestCollectionResponse>();

    useEffect(() => {
        getExpiringGasBottles();
        getExpiringVehicles();
        getSentQuotes();
        getExpiredDescriptionOfWorks();
        getEngineers();
        getPostCompletionChangeRequests();
    }, []);

    const getExpiringGasBottles = () => {
        getAPI('gas_bottles', {
            is_active: true,
            rental_end_before: getMonthRelativeDate(new Date(), 1),
            is_returned: false,
            perPage: 1
        }, (response: any) => {
            const gasBottleData: GasBottleCollectionResponse = response.data;
            setGasBottleData(gasBottleData);
        }, setIsGasBottleLoading);
    }

    const getExpiringVehicles = () => {
        getAPI('vehicles', {
            is_active: true,
            mot_due_date_or_tax_due_date_before: getMonthRelativeDate(new Date(), 1),
            perPage: 1
        }, (response: any) => {
            const vehicleData: VehicleCollectionResponse = response.data;
            setVehicleData(vehicleData);
        }, setIsVehicleLoading);
    }

    const getExpiredDescriptionOfWorks = () => {
        getAPI('description_of_works', {
            is_active: true,
            next_review_before: getMonthRelativeDate(new Date(), 1),
            perPage: 1,
        }, (response: any) => {
            const descriptionOfWorksData: DescriptionOfWorksCollectionResponse = response.data;
            setDescriptionOfWorksData(descriptionOfWorksData);
        }, setIsDescriptionOfWorksLoading);
    }

    const getSentQuotes = () => {
        getAPI('quotes', {
            statuses: [0],
            sent_before: getMonthRelativeDate(new Date(), -1),
            perPage: 1
        }, (response: any) => {
            const quoteData: QuoteCollectionResponse = response.data;
            setQuoteData(quoteData);
        }, setIsQuotesLoading);
    }

    const getEngineers = () => {
        getAPI('users', {
            is_timegrid_engineer: true,
            is_active: true,
        }, (response: any) => {
            const engineerData: UserCollectionResponse = response.data;
            setEngineerData(engineerData);
            if (engineerData.data.length > 0) {
                getTimegrids([...new Set(engineerData.data.map(user => user.id))]);
            }
        }, setIsEngineersLoading);
    }

    const getTimegrids = (userIDs: Array<number>) => {
        getAPI('timegrids', {
            user_ids: userIDs,
            statuses: [0]
        }, (response: any) => {
            const timegridData: TimegridCollectionResponse = response.data;
            setTimegridsData(timegridData);
        }, setIsTimegridsLoading);
    }

    const getPostCompletionChangeRequests = () => {
        getAPI('post_completion_change_requests', {
            statuses: [0]
        }, (response: any) => {
            const postCompletionChangeRequestsData: PostCompletionChangeRequestCollectionResponse = response.data;
            setPostCompletionChangeRequestsData(postCompletionChangeRequestsData);
        }, setIsRequestsLoading);
    }
    
    return (
        <>
            {props.departmentID !== null ? <>
                <PermsProtectedComponent requiredPerms={{ tickets: 1 }}>
                    <section>
                        <h2>Tickets</h2>
                        <DashboardWrapper>
                            <UnassignedTicketWidget departmentID={props.departmentID}/>
                            <FurtherActionRequiredTicketWidget departmentID={props.departmentID}/>
                            <RAMSRequiredTicketWidget departmentID={props.departmentID}/>
                        </DashboardWrapper>
                    </section>
                </PermsProtectedComponent>
                <PermsProtectedComponent requiredPerms={{ engineer_data: 1 }}>
                    <section>
                        <h2>Engineer Data</h2>
                        <DashboardWrapper>
                            <UnprocessedTimegridWidget departmentID={props.departmentID}/>
                            <UnprocessedChangeRequestWidget departmentID={props.departmentID}/>
                            <EngineerEquipmentDetailsWidget departmentID={props.departmentID}/>
                        </DashboardWrapper>
                    </section>
                </PermsProtectedComponent>
                <PermsProtectedComponent requiredPerms={{ quotes: 1 }}>
                    <section>
                        <h2>Quotes</h2>
                        <DashboardWrapper>
                            <NoResponseQuotesWidget departmentID={props.departmentID}/>
                            <AwaitingApprovalQuotesWidget departmentID={props.departmentID}/>
                        </DashboardWrapper>
                    </section>
                </PermsProtectedComponent>
                <PermsProtectedComponent requiredPerms={{ customers: 1 }}>
                    <section>
                        <h2>Customers</h2>
                        <DashboardWrapper>
                            <ExpiredContractWidget departmentID={props.departmentID}/>
                        </DashboardWrapper>
                    </section>
                </PermsProtectedComponent>
            </> : null}
            <PermsProtectedComponent requiredPerms={{ stock: 1 }}>
                <section>
                    <h2>Stock</h2>
                    <DashboardWrapper>     
                        <OutstandingVanReplenishmentRequestWidget/>
                        <ReorderRequiredProductsWidget/>
                    </DashboardWrapper>
                </section>
            </PermsProtectedComponent>
            <PermsProtectedComponent requiredPerms={{ engineer_assets: 1 }}>
                <section>
                    <h2>Engineer Assets</h2>
                    <DashboardWrapper>     
                        <ExpiringRefrigerantBottlesWidget/>
                        <ExpiringGasAirBottlesWidget/>
                        <ExpiringVehiclesWidget/>
                    </DashboardWrapper>
                </section>
            </PermsProtectedComponent>
            <PermsProtectedComponent requiredPerms={{ accounts: 1 }}>
                <section>
                    <h2>Accounts</h2>
                    <DashboardWrapper>
                        <CreditCheckCustomerWidget/>
                        <ReconciliationPurchaseOrderWidget/>
                        <ApprovalTicketInvoiceRequestWidget/>
                        <OutstandingTicketInvoiceRequestWidget/>
                        <OutstandingJobInvoiceRequestWidget/>
                    </DashboardWrapper>
                </section>
            </PermsProtectedComponent>
            <PermsProtectedComponent requiredPerms={{ iso: 1 }}>
                <section>
                    <h2>ISO</h2>
                    <DashboardWrapper>
                        <ISOSupplierManufacturerWidget/>
                        <UnprocessedNonConformanceReportsWidget/>
                        <ExpiringDescriptionOfWorksWidget departmentID={props.departmentID}/>
                        <ExpiringRiskAssessmentsWidget/>
                        <PATestingWidget/>
                        <CalibrationWidget/>
                        <InspectionWidget/>
                        <MaintenanceWidget/>
                    </DashboardWrapper>
                </section>
            </PermsProtectedComponent>
        </>
    )
}

export default DashboardWidgets;