import { useEffect, useState } from "react"
import GridItem from "../../../../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../../../../components/ui/Containers/InfoGrid/InfoGrid"
import InnerContainer from "../../../../../../../components/ui/Containers/InnerContainer/InnerContainer"
import WindowOverlay from "../../../../../../../components/ui/Containers/WindowOverlay/WindowOverlay"
import NoneFound from "../../../../../../../components/ui/General/NoneFound/NoneFound"
import { InvoiceTicketTimeCollectionResponse } from "../../../../../../../types/invoiceTicketTime.types"
import { RequisitionCollectionResponse } from "../../../../../../../types/requisition.types"
import { RequisitionLineCollectionResponse } from "../../../../../../../types/requisitionLines.types"
import { SystemConfigsResponseData } from "../../../../../../../types/systemConfigs.types"
import { UserCollectionResponse, UserResponseData } from "../../../../../../../types/user.types"
import formatMoney from "../../../../../../../utils/formatMoney"
import getAPI from "../../../../../../../utils/getAPI"
import RequisitionLink from "../../../../../../Requisitions/components/RequisitionLink"
import LabelIconBox from "../../../../../../TimeGrids/TimieGridReview/components/LabelIconBox/LabelIconBox"
import TicketHireCostBreakdown from "./components/TicketHireCostBreakdown"
import TicketLabourCostBreakdown from "./components/TicketLabourCostBreakdown"
import TicketMaterialCostBreakdown from "./components/TicketMaterialsCostBreakdown"
import TicketMileageCostBreakdown from "./components/TicketMileageCostBreakdown"
import TicketSubcontractCostBreakdown from "./components/TicketSubcontractCostBreakdown"
import TicketTotalCost from "./components/TicketTotalCost"

const TicketQuickCost = (props: {
    tickets: Array<any>,
    ticketNumber: number,
    departmentID: number,
    show: boolean,
    hideFunc: () => void
}) => {
    // Data States
    const [isTicketInvoiceTimeLoading, setIsTicketInvoiceTimeLoading] = useState(true);
    const [ticketInvoiceTimeData, setTicketInvoiceTimeData] = useState<InvoiceTicketTimeCollectionResponse>();    
    const [isUsersLoading, setIsUsersLoading] = useState(true);
    const [userData, setUserData] = useState<Array<UserResponseData>>([]);    
    const [isRequisitionsLoading, setIsRequisitionsLoading] = useState(true);
    const [requisitionsData, setRequisitionsData] = useState<RequisitionCollectionResponse>();
    const [isRequisitionLinesLoading, setIsRequisitionLinesLoading] = useState(false);
    const [requisitionLinesData, setRequisitionLinesData] = useState<RequisitionLineCollectionResponse>();
    const [isSystemConfigsLoading, setIsSystemConfigsLoading] = useState(true);
    const [systemConfigsData, setSystemConfigsData] = useState<SystemConfigsResponseData>();

    useEffect(() => {
        getSystemConfigs();
    }, [])

    const getSystemConfigs = () => {
        getAPI('system_configs', {}, (response: any) => {
            const systemConfigsData: SystemConfigsResponseData = response.data;
            setSystemConfigsData(systemConfigsData);
        }, setIsSystemConfigsLoading);
    }

    useEffect(() => {
        getInvoiceTicketTime();
    }, [props.tickets])

    const getInvoiceTicketTime = () => {
        getAPI(`invoice_ticket_time`, {
            tickets: props.tickets,
        }, (response: any) => {
            const ticketInvoiceTimeData: InvoiceTicketTimeCollectionResponse = response.data;
            setTicketInvoiceTimeData(ticketInvoiceTimeData);
            if (ticketInvoiceTimeData && ticketInvoiceTimeData.data.length > 0) {
                getUsers([...new Set(ticketInvoiceTimeData.data.map(refrigerantMovement => refrigerantMovement.data.user_id))]);
            }
        }, setIsTicketInvoiceTimeLoading)    
    }

    const getUsers = (userIDs: Array<number | null>) => {
        getAPI('users', {
            ids: userIDs
        }, (response: any) => {
            const userData: UserCollectionResponse = response.data;
            setUserData(userData.data)
        }, setIsUsersLoading)
    }

    useEffect(() => {
        getRequisitions();
    }, [props.ticketNumber])

    const getRequisitions = () => {
        getAPI('requisitions', {
            tickets: [{
                department_id: props.departmentID,
                ticket_number: props.ticketNumber
            }],
        }, (response: any) => {
            const requisitionsData: RequisitionCollectionResponse = response.data;
            setRequisitionsData(requisitionsData);
            if (requisitionsData.data.length > 0) {
                getRequisitionLines([...new Set(requisitionsData.data.map(requisition => requisition.data.number))]);
            }
        }, setIsRequisitionsLoading)
    }
    
    const getRequisitionLines = (requisitionNumber: Array<number>) => {
        getAPI('requisition_lines', {
            requisition_numbers: requisitionNumber,
        }, (response: any) => {
            const requisitionLinesData: RequisitionLineCollectionResponse = response.data;
            setRequisitionLinesData(requisitionLinesData);
        }, setIsRequisitionLinesLoading)
    }

    const totalSubcontractorCost = requisitionLinesData ? requisitionLinesData.data.filter(requisitionLine => requisitionLine.data.item_type === 1).reduce((totalCost, currentLine) => totalCost + (currentLine.data.nett_price * currentLine.data.quantity), 0) : 0;
    const totalHireCost = requisitionLinesData ? requisitionLinesData.data.filter(requisitionLine => requisitionLine.data.item_type === 2).reduce((totalCost, currentLine) => totalCost + (currentLine.data.nett_price * currentLine.data.quantity), 0) : 0;
    
    return (
        <WindowOverlay 
        title="Quick Cost"
        maxWidth={1200}
        show={props.show}
        hideFunc={props.hideFunc}
        >
            {ticketInvoiceTimeData && systemConfigsData && requisitionLinesData ? 
                <>
                    <TicketTotalCost
                        users={userData}
                        engineerTime={ticketInvoiceTimeData.data}
                        mileageRate={systemConfigsData.data.mileage_cost_rate}
                        requisitionLines={requisitionLinesData.data}
                    />
                    <hr/>
                    <TicketLabourCostBreakdown 
                        users={userData} 
                        engineerTime={ticketInvoiceTimeData.data}
                        engineerRate={52}
                        mateRate={35}
                    />
                    <TicketMileageCostBreakdown
                        mileageCostRate={systemConfigsData.data.mileage_cost_rate}
                        engineerTime={ticketInvoiceTimeData.data}
                        mileageChargeRate={0.4}
                    />
                    <TicketMaterialCostBreakdown
                        materialLines={requisitionLinesData.data.filter(requisitionLine => requisitionLine.data.item_type === 0)}
                    />
                    <TicketSubcontractCostBreakdown
                        subcontractLines={requisitionLinesData.data.filter(requisitionLine => requisitionLine.data.item_type === 1)}
                    />
                    <TicketHireCostBreakdown
                        hireLines={requisitionLinesData.data.filter(requisitionLine => requisitionLine.data.item_type === 2)}
                    />
                </> 
                : null
            }
        </WindowOverlay>
    )
}

export default TicketQuickCost