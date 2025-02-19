import OuterContainer from "../../components/ui/Containers/OuterContainer/OuterContainer";
import UnderDevelopment from "../../components/ui/UnderDevelopment/UnderDevelopment";

const ReportsPage = () => {
    const description = 'Select a report to run.'

    return (
        <OuterContainer
            title='Reports'
            description={description}
            maxWidth={1600}
            noBorder
        >
            <div className="page-grid no-side">
                <div className="page-main">
                    <UnderDevelopment/>
                </div>
            </div>
        </OuterContainer>
    )
}

export default ReportsPage