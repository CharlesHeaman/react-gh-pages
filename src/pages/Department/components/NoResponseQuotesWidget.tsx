import { useEffect, useState } from "react";
import DashboardWidget from "../../../components/ui/DashboardWidget/DashboardWidget";
import { QuoteCollectionResponse } from "../../../types/quote.types";
import getAPI from "../../../utils/getAPI";
import getMonthRelativeDate from "../../../utils/getMonthRelativeDate";

const NoResponseQuotesWidget = (props: {
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
            statuses: [0],
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
            text="More than a month without a response." 
            iconFont={"mark_email_read"}
            to="quotes?quotes_status=sent"
            negative
        />
    )
}

export default NoResponseQuotesWidget;