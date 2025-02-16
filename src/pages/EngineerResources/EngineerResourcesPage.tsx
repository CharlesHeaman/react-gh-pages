import { useNavigate } from "react-router-dom";
import ListItem from "../../components/ui/Containers/ListItem/ListItem";
import ListWrapper from "../../components/ui/Containers/ListWrapper/ListWrapper";
import OuterContainer from "../../components/ui/Containers/OuterContainer/OuterContainer";

const EngineerResourcesPage = () => {
    const navigate = useNavigate();

    return (
        <>
            <OuterContainer
                title='Engineer Resources'
                description="Manage the resources that are accessible to engineers."
                maxWidth={600}
                noBorder
            >
                <div className="page-grid no-side">
                    <div className="page-main">
                        <ListWrapper>
                            <ListItem
                                clickFunc={() => navigate('schedule_of_works')}
                            >
                                <div style={{
                                    display: 'flex',
                                    gap: 'var(--small-gap)'
                                }}>
                                    <span className="material-icons" style={{ fontSize: '75px'}}>description</span>
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 'var(--small-gap)'
                                    }}>
                                        <h2>Schedule of Works</h2>
                                        <p>Upload resources to ensure that engineers are performing all of the necessary checks when performing jobs and that they are fulfilling the full scope of works.</p>
                                    </div>
                                </div>
                            </ListItem>
                            <ListItem
                                clickFunc={() => navigate('manuals')}
                            >
                                <div style={{
                                    display: 'flex',
                                    gap: 'var(--small-gap)'
                                }}>
                                    <span className="material-icons" style={{ fontSize: '75px'}}>find_in_page</span>
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 'var(--small-gap)'
                                    }}>
                                        <h2>Manuals</h2>
                                        <p>Upload manuals for engineers to reference when completing work on equipment.</p>
                                    </div>
                                </div>
                            </ListItem>
                        </ListWrapper>
                    </div>
                </div>
            </OuterContainer>
        </>
    )
}

export default EngineerResourcesPage