import OuterContainer from "../../components/ui/Containers/OuterContainer/OuterContainer";
import UnderDevelopment from "../../components/ui/UnderDevelopment/UnderDevelopment";

const SystemAdministrationPage = () => {
    const description = 'Configure system settings and manage system resources.'

    return (
        <OuterContainer
            title='System Administration'
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

export default SystemAdministrationPage