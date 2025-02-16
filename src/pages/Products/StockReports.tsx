import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextareaAutosize from 'react-textarea-autosize';
import SubmitButton from "../../components/form/SubmitButton/SubmitButton";
import ContainerFooter from "../../components/ui/Containers/ContainerFooter/ContainerFooter";
import GridItem from "../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../components/ui/Containers/InfoGrid/InfoGrid";
import OuterContainer from "../../components/ui/Containers/OuterContainer/OuterContainer";
import Header from "../../components/ui/Structure/Header/Header";
import UnderDevelopment from "../../components/ui/UnderDevelopment/UnderDevelopment";
import ListItem from "../../components/ui/Containers/ListItem/ListItem";
import ListWrapper from "../../components/ui/Containers/ListWrapper/ListWrapper";

const StockReports = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const pageDescription = 'Select a stock report to run.';

    const isDisabled = false;

    return (
        <>
            <Header
                links={[
                    {
                        to: 'stock',
                        text: 'Stock'
                    },
                    {
                        to: 'create',
                        text: 'Create'
                    }
                ]}
            />
            <OuterContainer
                title='Stock Reports'
                headerContent={pageDescription}
                stickyHeaderContent={<p style={{ fontSize: '0.85em' }}>{pageDescription}</p>}
                maxWidth={600}
                noBorder
            >
                <div className="page-grid no-side">
                    <div className="page-main">
                        <ListWrapper>
                        <ListItem
                                clickFunc={() => navigate('')}
                            >
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 'var(--small-gap)'
                                }}>
                                    <h2>Negative Stock Report</h2>
                                    <p>List stock items that have a negative stock level.</p>
                                </div>
                            </ListItem>
                            <ListItem
                                clickFunc={() => navigate('')}
                            >
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 'var(--small-gap)'
                                }}>
                                    <h2>Suggest Stock Order</h2>
                                    <p>View suggested orders of products organized by supplier.</p>
                                </div>
                            </ListItem>
                        </ListWrapper>
                    </div>
                </div>
            </OuterContainer>
        </>
    )
}

export default StockReports