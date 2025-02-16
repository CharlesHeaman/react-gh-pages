import { JobInvoiceRequestResponseData } from '../../../../types/JobInvoiceRequest';
import { TicketInvoiceRequestResponseData } from '../../../../types/TicketInvoiceRequest.types';
import { UserResponseData } from '../../../../types/user.types';
import formatDate from '../../../../utils/formatDate';
import getUserFullName from '../../../../utils/getUserFullName';
import JobInvoiceRequestLink from '../../JobInvoiceRequestListPage/component/JobInvoiceRequestLink';
import TicketInvoiceRequestLink from '../../TicketInvoiceRequestListPage/components/TicketInvoiceRequestLink';

const InvoiceRequestStatusDescription = (props: {
    invoiceRequest: TicketInvoiceRequestResponseData | JobInvoiceRequestResponseData,
    createdByUser: UserResponseData,
    processedByUser: UserResponseData | undefined,
    isJob?: boolean,
    hideLink?: boolean,
}) => {
    const getLink = () => {
        return <>
            {!props.isJob ?
                <TicketInvoiceRequestLink id={props.invoiceRequest.id}/> :
                <JobInvoiceRequestLink id={props.invoiceRequest.id}/>
            }&nbsp;
        </>
    }

    if (!props.invoiceRequest.data.is_processed) {
        return <>
            {`Invoice request `}
            {!props.hideLink ? getLink() : null}
            {`created by ${getUserFullName(props.createdByUser)} on ${formatDate(props.invoiceRequest.data.created_at)}`}
            {`. This invoice request has not yet been processed.`}
        </>
    } else {
        return <>
            {`Invoice request `}
            {!props.hideLink ? getLink() : null}
            {`processed by ${props.processedByUser ? getUserFullName(props.processedByUser) : 'unknown'} on ${formatDate(props.invoiceRequest.data.processed_date)}`}
            {`.`}
        </>
    }
}

export default InvoiceRequestStatusDescription