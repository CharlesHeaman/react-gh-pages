import OuterContainer from "../../components/ui/Containers/OuterContainer/OuterContainer";
import DashboardWidgets from "./DashboardWidgets";

const GeneralDashboard = () => {
    return (
        <OuterContainer
            title="Dashboard"
            maxWidth={1300}
        >
            <div className="page-grid no-side">
                <div className="page-main">
                    <DashboardWidgets departmentID={null}/>
                </div>
            </div>
        </OuterContainer>
    )
}

export default GeneralDashboard