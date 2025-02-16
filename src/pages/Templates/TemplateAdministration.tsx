import { useNavigate } from "react-router-dom";
import ListItem from "../../components/ui/Containers/ListItem/ListItem";
import ListWrapper from "../../components/ui/Containers/ListWrapper/ListWrapper";
import OuterContainer from "../../components/ui/Containers/OuterContainer/OuterContainer";
import IconTitleText from "../../components/ui/IconTitleText/IconTitleText";

const TemplateAdministration = () => {
    const navigate = useNavigate();

    return (
        <>
            <OuterContainer
                title='Template Administration'
                maxWidth={600}
                description="Managed templates, headers and footers that are use for generating documents."
                noBorder
            >
                <div className="page-grid no-side">
                    <div className="page-main">
                        <ListWrapper>
                            <ListItem
                                clickFunc={() => navigate('method_statements')}
                            >
                                <IconTitleText
                                    iconFont="feed"
                                    title="Method Statement Templates"
                                    text="The templates used to generate method statements when creating RAMS for tickets."
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
                            <ListItem
                                clickFunc={() => navigate('headers')}
                            >
                                <IconTitleText
                                    iconFont="vertical_align_top"
                                    title="Template Headers"
                                    text="Create, edit and deactivate template headers."
                                />
                            </ListItem>
                            <ListItem
                                clickFunc={() => navigate('footers')}
                            >
                                <IconTitleText
                                    iconFont="vertical_align_bottom"
                                    title="Template Footers"
                                    text="Create, edit and deactivate template footers."
                                />
                            </ListItem>
                        </ListWrapper>
                    </div>
                </div>
            </OuterContainer>
        </>
    )
}

export default TemplateAdministration