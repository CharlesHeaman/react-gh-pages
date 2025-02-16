import { useNavigate } from "react-router-dom";
import ListItem from "../../components/ui/Containers/ListItem/ListItem";
import ListWrapper from "../../components/ui/Containers/ListWrapper/ListWrapper";
import OuterContainer from "../../components/ui/Containers/OuterContainer/OuterContainer";
import IconTitleText from "../../components/ui/IconTitleText/IconTitleText";

const RAMSAdministration = () => {
    const navigate = useNavigate();

    return (
        <>
            <OuterContainer
                title='RAMS Administration'
                maxWidth={600}
                description="Managed templates, headers and footers that are use for generating documents."
                noBorder
            >
                <div className="page-grid no-side">
                    <div className="page-main">
                        <ListWrapper>
                            <ListItem
                                clickFunc={() => navigate('description_of_works')}
                            >
                                <IconTitleText
                                    iconFont="description"
                                    title="Description of Works"
                                    text="Create, edit, deactivate and manage reviews of description of works."
                                />
                            </ListItem>
                            <ListItem
                                clickFunc={() => navigate('risk_assessments')}
                            >
                                <IconTitleText
                                    iconFont="assignment_late"
                                    title="Risk Assessment Templates"
                                    text="The templates used to generate risk assessments that are attached to method statements when creating RAMS for tickets."
                                />
                            </ListItem>
                        </ListWrapper>
                    </div>
                </div>
            </OuterContainer>
        </>
    )
}

export default RAMSAdministration