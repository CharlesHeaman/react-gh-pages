import { useEffect, useState } from "react";
import DashboardWidget from "../../../components/ui/DashboardWidget/DashboardWidget";
import { QuoteCollectionResponse } from "../../../types/quote.types";
import getAPI from "../../../utils/getAPI";
import getMonthRelativeDate from "../../../utils/getMonthRelativeDate";

const AwaitingApprovalQuotesWidget = (props: {
    departmentID?: number | null,
}) => {
    // Data States
    const [, setIsQuotesLoading] = useState(true);
    const [quoteData, setQuoteData] = useState<QuoteCollectionResponse>();

    useEffect(() => {
        if (props.departmentID === undefined) return
        getNoResponseQuotes();
    }, [props.departmentID]);

    const getNoResponseQuotes = () => {
        getAPI('quotes', {
            statuses: [-1],
            department_id: props.departmentID ? props.departmentID : undefined,
            sent_before: getMonthRelativeDate(new Date(), -1),
            perPage: 1
        }, (response: any) => {
            const quoteData: QuoteCollectionResponse = response.data;
            setQuoteData(quoteData);
        }, setIsQuotesLoading);
    }

    return (
        <DashboardWidget 
            title="Quotes"
            count={quoteData?.total_count}
            text="Awaiting approval." 
            iconFont={"hourglass_empty"}
            to="quotes?quotes_status=awaiting_approval"
            negative
        />
    )
}

export default AwaitingApprovalQuotesWidget;