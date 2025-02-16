import GridItem from "../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../components/ui/Containers/InfoGrid/InfoGrid";
import InnerContainer from "../../components/ui/Containers/InnerContainer/InnerContainer";
import OuterContainer from "../../components/ui/Containers/OuterContainer/OuterContainer";
import Label from "../../components/ui/General/Label/Label";
import IconTitleText from "../../components/ui/IconTitleText/IconTitleText";

const TestStatusPage = () => {
    const data = require('./../../test-results.json');

    console.log(data)

    return (
        <>
            <OuterContainer
                title="Test Statuses"
                maxWidth={1000}
            >
                <div className="page-grid no-side">
                    <div className="page-main">
                        <section>
                            <InfoGrid>
                                <GridItem span={2}>
                                    <InnerContainer color="light-green">
                                        <IconTitleText
                                            iconFont="done"
                                            color="light-green"
                                            title={`${data.stats.expected} Passing`}
                                            text="Tests that behaved as expected."
                                        />
                                    </InnerContainer>
                                </GridItem>
                                <GridItem span={2}>
                                    <InnerContainer color="red">
                                        <IconTitleText
                                            iconFont="close"
                                            color="red"
                                            title={`${data.stats.unexpected} Failing`}
                                            text="Tests that had unexpected behaviour."

                                        />
                                    </InnerContainer>
                                </GridItem>
                                <GridItem span={2}>
                                    <InnerContainer color="grey">
                                        <IconTitleText
                                            iconFont="skip_next"
                                            color="grey"
                                            title={`${data.stats.skipped} Skipped`}
                                            text="Tests there were not performed."
                                        />
                                    </InnerContainer>
                                </GridItem>
                            </InfoGrid>
                        </section>
                        {data.suites.map((suite, suiteIndex) => 
                            suite.suites.map((suiteAgain, suiteIndexAgain) => <section key={suiteIndex}>
                                <h2>{suiteAgain.title}</h2>
                                <table>
                                    <tbody>
                                        {suiteAgain.specs.filter(spec => spec.tests[0].projectId === "chromium" || spec.tests[0].projectId === "setup").map((spec, specIndex) => <tr key={specIndex}>
                                            <td style={{ width: '52px', paddingRight: '0px' }}>{spec.tests[0].status === "expected" ?
                                                <Label iconFont="done" color="light-green" circular/> :
                                                    spec.tests[0].status === "skipped" ?
                                                    <Label iconFont="skip_next" color="grey" circular/> :
                                                    <Label iconFont="close" color="red" circular/>
                                            }</td>
                                            <td className="text-left">{spec.title}</td>
                                            {/* <td style={{ width: '70px' }} className="text-left">{spec.tests[0].results[0].duration / 1000}s</td> */}
                                        </tr>)}
                                    </tbody>
                                </table>
                            </section>
                        ))}
                    </div>
                </div>
            </OuterContainer>
        </>
    )
}

export default TestStatusPage