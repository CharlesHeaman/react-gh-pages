import { useNavigate } from "react-router-dom";
import ListItem from "../../components/ui/Containers/ListItem/ListItem";
import ListWrapper from "../../components/ui/Containers/ListWrapper/ListWrapper";
import OuterContainer from "../../components/ui/Containers/OuterContainer/OuterContainer";
import IconTitleText from "../../components/ui/IconTitleText/IconTitleText";

const ISOAdministration = () => {
    const navigate = useNavigate();

    return (
        <OuterContainer
            title='ISO Administration'
            description="[Some header text goes here.]"
            maxWidth={600}
            noBorder
        >
            <div className="page-grid no-side">
                <div className="page-main">
                    <ListWrapper>
                        <ListItem
                            clickFunc={() => navigate('performance')}
                        >
                            <IconTitleText
                                iconFont="difference"
                                title="Performance Report"
                                text="View report for quote conversions, ticket performance and contract values."
                            />
                        </ListItem>
                        <ListItem
                            clickFunc={() => navigate('non_conformance_reports')}
                        >
                            <IconTitleText
                                iconFont="feedback"
                                title="Non-conformance Reports"
                                text="Create, review and process non-conformance reports."
                            />
                        </ListItem>
                        <ListItem
                            clickFunc={() => navigate('rams_admin')}
                        >
                            <IconTitleText
                                iconFont="assignment_late"
                                title="RAMS Administration"
                                text="Create, edit and plant/tools types. Manage PAT, calibration, inspection and maintenance requirements and frequency."
                            />
                        </ListItem>
                    </ListWrapper>
                </div>
            </div>
        </OuterContainer>
    )
}

export default ISOAdministration