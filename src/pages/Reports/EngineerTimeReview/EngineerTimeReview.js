import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GridItem from "../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../components/ui/Containers/InfoGrid/InfoGrid";
import InnerContainer from "../../../components/ui/Containers/InnerContainer/InnerContainer";
import OuterContainer from "../../../components/ui/Containers/OuterContainer/OuterContainer";
import MainWrapper from "../../../components/ui/Structure/MainWrapper/MainWrapper";
import formatDate from "../../../utils/formatDate";
import formatHours from "../../../utils/formatHours";
import formatMiles from "../../../utils/formatMiles";
import getDepartmentLabel from "../../../utils/getDepartmentLabel";
import handleError from "../../../utils/handleError";
import { get } from "../../../utils/Requests";
import sumAdditionalTimeProperty from "../../TimeGrids/TimieGridReview/utils/sumAdditionalTimeProperty";
import AdditionalTime from "./components/AdditionalTime";
import Difference from "./components/Difference";
import EngineerTimeReviewSkeleton from "./components/EngineerTimeReviewSkeleton";
import Summary from "./components/Summary";
import Tickets from "./components/Tickets";
import sumDateTicketTime from "./utils/sumDateTicketTime";
import sumDateTimegridTime from "./utils/sumDateTimegridTime";
import sumTicketTime from "./utils/sumTicketTime";

function EngineerTimeReview(props) {
    const { deptID, date } = useParams();
    const [timegridData, setTimegridData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [quoteData, setQuoteData] = useState([]);

    useEffect(() => {
        getTimegridData();
    }, [])

    function getTimegridData() {
        get(`/api/oldTimegrids/${deptID}/${date}/reviewSummary`, {}, getTimegridDataResponse, (error) => handleError(error, props.addNotification));
    }

    function getTimegridDataResponse(response) {  
        setTimegridData(response.data.map((engineer) => {
            return {
                ...engineer,
                tickets: engineer.tickets.map((ticket) => {
                    return {
                        ...ticket,
                        ticketTimeTotals: {
                            onSite: sumTicketTime(ticket.ticketTime, 'onSite'),
                            travel: sumTicketTime(ticket.ticketTime, 'travel'),
                            miles: sumTicketTime(ticket.ticketTime, 'miles'),
                            expenses: sumTicketTime(ticket.ticketTime, 'expenses')
                        }
                    }
                }),
                ticketTimeTotals: {
                    onSite: sumDateTicketTime(engineer.tickets, 'onSite'),
                    travel: sumDateTicketTime(engineer.tickets, 'travel'),
                    miles: sumDateTicketTime(engineer.tickets, 'miles'),
                    expenses: sumDateTicketTime(engineer.tickets, 'expenses')
                },
                additionalTimeTotals: {
                    time: sumAdditionalTimeProperty(engineer.additionalTime, 'time'),
                    travel: sumAdditionalTimeProperty(engineer.additionalTime, 'travel'),
                    miles: sumAdditionalTimeProperty(engineer.additionalTime, 'miles'),
                    expenses: sumAdditionalTimeProperty(engineer.additionalTime, 'expenses')
                },
                timegridTotals: {
                    onSite: sumDateTimegridTime(engineer.tickets, 'onSite'),
                    travel: sumDateTimegridTime(engineer.tickets, 'travel'),
                    miles: sumDateTimegridTime(engineer.tickets, 'miles'),
                    expenses: sumDateTimegridTime(engineer.tickets, 'expenses')
                }
            }
        }).map((engineer) => {
            return {
                ...engineer,
                differenceTotal: {
                    onSite: engineer.ticketTimeTotals.onSite - (engineer.timegridTotals.onSite + engineer.additionalTimeTotals.time),
                    travel: engineer.ticketTimeTotals.travel - (engineer.timegridTotals.travel + engineer.additionalTimeTotals.travel),
                    miles: engineer.ticketTimeTotals.miles - (engineer.timegridTotals.miles + engineer.additionalTimeTotals.miles),
                    expenses: engineer.ticketTimeTotals.expenses - (engineer.timegridTotals.expenses + engineer.additionalTimeTotals.expenses)
                }
            }
        }))
        const quotes = [];
        for (let currentEngineer = 0; currentEngineer < response.data.length; currentEngineer++) {
            let currentEngineerData = response.data[currentEngineer];
            for (let currentTicket = 0; currentTicket < currentEngineerData.tickets.length; currentTicket++) {
                let currentTicketData = currentEngineerData.tickets[currentTicket];
                if (currentTicketData.quotes.parent.id) {
                    if (!quotes.filter(quote => quote.quoteID == currentTicketData.quotes.parent.id && quote.equipmentID == currentTicketData.equipment.id).length > 0) {
                        quotes.push({
                            quoteID: currentTicketData.quotes.parent.id,
                            equipmentID: currentTicketData.equipment.id
                        });
                    }
                }
            }
        }
        getQuotedTime(quotes);
        setIsLoading(false);
    }

    function getQuotedTime(quotes) {
        for (let currentQuote = 0; currentQuote < quotes.length; currentQuote++) {
            get(`/api/oldQuotes/quotedTime`, quotes[currentQuote], getQuotedTimeResponse, (error) => handleError(error, props.addNotification));
        }
    }

    function getQuotedTimeResponse(response) {
        setQuoteData([...quoteData, response.data])
    }

    return (
        <MainWrapper title='Engineer Time Review' hideNav>
            {!isLoading ? 
                <>  
                    <OuterContainer maxWidth='700'>
                        <InnerContainer title='Report Information'>
                            <InfoGrid>
                                <GridItem title='Department' span='2'>
                                    {getDepartmentLabel(parseInt(deptID))}
                                </GridItem>
                                <GridItem title='Date' span='2'>
                                    <p>{formatDate(date)}</p>
                                </GridItem>
                            </InfoGrid>
                        </InnerContainer>
                    </OuterContainer>
                    {timegridData.map((engineer, index) => 
                        <OuterContainer maxWidth='700' key={index}>
                            <InnerContainer 
                                title={engineer.fullName} 
                                headerItem={
                                    <div className="text-right" style={{ flexGrow: '1', paddingRight: 'var(--small-gap)' }}>
                                        <Difference value={formatHours(engineer.differenceTotal.onSite + engineer.differenceTotal.travel)} suffix=' hrs' width={100}/>
                                        <Difference value={formatMiles(engineer.differenceTotal.miles)} suffix=' mi' width={100}/>
                                    </div>
                                }
                                startCollapsed
                                collapsible
                            >
                                <Summary engineer={engineer}/>
                                <Tickets engineer={engineer} quoteData={quoteData}/>
                                <AdditionalTime engineer={engineer}/>
                            </InnerContainer>
                        </OuterContainer>
                    )} 
                </> :
                <EngineerTimeReviewSkeleton/>
            }
        </MainWrapper>
    )
}

export default EngineerTimeReview
