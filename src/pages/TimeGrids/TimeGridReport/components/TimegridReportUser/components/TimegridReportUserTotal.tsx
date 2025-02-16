import { ReducedTimegridTicketTime } from "../../../../../../utils/reduceTimegridTicketTime"
import LabelIconBox from "../../../../TimieGridReview/components/LabelIconBox/LabelIconBox"
import { ReducedAdditionalTime } from "../../../../TimieGridReview/components/utils/reducedAdditionalTime"

const TimegridReportUserTotal = (props: {
    reducedTimegridTicketTime: ReducedTimegridTicketTime,
    reducedAdditionalTime: ReducedAdditionalTime,
    isAccounts: boolean
}) => {
    return (
        <section>
            {!props.isAccounts ?
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '1fr 1fr 1fr 1fr',
                    marginTop: 'var(--normal-gap)'
                }}>
                    <LabelIconBox
                        label='Time'
                        text={(
                            props.reducedTimegridTicketTime.on_site_time + 
                            props.reducedAdditionalTime.activity_time + 
                            props.reducedTimegridTicketTime.travel_time + 
                            props.reducedAdditionalTime.travel_time
                        )}
                        icon='timer'
                        suffix=' hrs'
                    />
                    <LabelIconBox
                        label='Miles'
                        text={props.reducedTimegridTicketTime.mileage + props.reducedAdditionalTime.mileage}
                        icon='local_gas_station'
                        secondaryText={props.reducedTimegridTicketTime.own_mileage > 0 ? 
                            props.reducedTimegridTicketTime.own_mileage.toString() : 
                            undefined
                        }
                        secondaryColor='purple'
                        suffix=' mi'
                    />
                    <LabelIconBox
                        label='Expenses'
                        text={props.reducedTimegridTicketTime.expenses + props.reducedAdditionalTime.expenses}
                        icon='currency_pound'
                        prefix='£'
                    />
                </div> : 
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '1fr 1fr',
                    marginTop: 'var(--normal-gap)'
                }}>
                    <LabelIconBox
                        label='Time'
                        text={(
                            props.reducedTimegridTicketTime.on_site_time + 
                            props.reducedAdditionalTime.activity_time + 
                            props.reducedTimegridTicketTime.travel_time + 
                            props.reducedAdditionalTime.travel_time
                        )}
                        icon='timer'
                        suffix=' hrs'
                    />
                    <LabelIconBox
                        label='Own Miles'
                        text={props.reducedTimegridTicketTime.own_mileage}
                        icon='local_gas_station'
                        suffix=' mi'
                    />
                </div>
            }
        </section>
    )
}

export default TimegridReportUserTotal