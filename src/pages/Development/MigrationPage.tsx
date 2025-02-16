import { useState } from "react";
import GridItemWrapper from "../../components/ui/Containers/GridWrapper/GridItemWrapper";
import GridWrapper from "../../components/ui/Containers/GridWrapper/GridWrapper";
import OuterContainer from "../../components/ui/Containers/OuterContainer/OuterContainer";
import WindowOverlay from "../../components/ui/Containers/WindowOverlay/WindowOverlay";
import IconTitleText from "../../components/ui/IconTitleText/IconTitleText";
import SubmitButton from "../../components/form/SubmitButton/SubmitButton";
import postAPI from "../../utils/postAPI";

const MigrationPage = () => {

    const [showMigrateNew, setShowMigrateNew] = useState(false);
    const [showInsertTest, setShowInsertTest] = useState(false);

    const [isMigrationLoading, setIsMigrationLoading] = useState(false);
    const [isMigrationTest, setIsMigrationTest] = useState(false);
    
    const migrateToDataBase = () => {
        postAPI('migration/migrate', {}, {}, () => {
            setShowMigrateNew(false)
        }, setIsMigrationLoading)
    }

    const migrateTestData = () => {
        postAPI('migration/migrate_test', {}, {}, () => {
            setShowInsertTest(false)
        }, setIsMigrationTest)
    }

    return (
        <>
            <OuterContainer
                title='Automatic Migration'
                maxWidth={600}
                noBorder
            >
                <div className="page-grid no-side">
                    <div className="page-main">
                        <section>
                            <GridWrapper>
                                <GridItemWrapper
                                    clickFunc={() => setShowMigrateNew(true)}
                                >
                                    <IconTitleText 
                                        title={`Migrate to New Database`}
                                        text="Maps database MGLIntranet to mitchells while sanitizing data and removing redundant fields." 
                                        symbolFont={"database_upload"}
                                        color="purple"
                                    />
                                </GridItemWrapper> 
                            </GridWrapper>
                        </section>
                        <section>
                            <GridWrapper>
                                
                                <GridItemWrapper
                                    clickFunc={() => setShowInsertTest(true)}
                                >
                                    <IconTitleText 
                                        title={`Insert Test Data`}
                                        text="Inserts data into mitchells_test database to prepare for e2e tests." 
                                        symbolFont={"database_upload"}
                                        color="light-green"
                                    />
                                </GridItemWrapper> 
                            </GridWrapper>
                        </section>
                    </div>
                </div>
            </OuterContainer>

            {/* Migrate New */}
            <WindowOverlay 
                title={"Migrate to New Database"} 
                maxWidth={300} 
                show={showMigrateNew}
                hideFunc={() => setShowMigrateNew(false)} 
                footer={<SubmitButton
                    text="Migrate Database"
                    color="purple"
                    iconSymbol="database_upload"
                    clickFunc={migrateToDataBase}
                    submitting={isMigrationLoading}
                    submittingText="Migrating..."
                />}
            >
                <>
                    <p>Are you sure you want to migrate to the new database?</p>
                </>
            </WindowOverlay>

            {/* Insert Test */}
            <WindowOverlay 
                title={"Insert Test Data"} 
                maxWidth={300} 
                show={showInsertTest}
                hideFunc={() => setShowInsertTest(false)} 
                footer={<SubmitButton
                    text="Insert Data"
                    color="light-green"
                    iconSymbol="database_upload"
                    clickFunc={migrateTestData}
                    submitting={isMigrationTest}
                    submittingText="Inserting..."
                />}
            >
                <>
                    <p>Are you sure you want to insert the test data?</p>
                </>
            </WindowOverlay>
        </>
    )
}

export default MigrationPage