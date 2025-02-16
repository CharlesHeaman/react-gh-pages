import { useState } from "react"
import TextareaAutosize from 'react-textarea-autosize'
import ActivateButton from "../../ui/Buttons/ActivateButton/ActivateButton"
import ToggleButton from "../../ui/Buttons/ToggleButton/ToggleButton"
import ContainerFooter from "../../ui/Containers/ContainerFooter/ContainerFooter"
import GridItem from "../../ui/Containers/GridItem/GridItem"
import InfoGrid from "../../ui/Containers/InfoGrid/InfoGrid"
import InnerContainer from "../../ui/Containers/InnerContainer/InnerContainer"
import SubmitButton from "../SubmitButton/SubmitButton"

function SendEmail(props) {
    const [recipients, setRecipients] = useState(props.recipients ? formatRecipientData(props.recipients) : []);
    const [ccs, setCcs] = useState(props.recipients ? formatRecipientData(props.recipients) : []);
    const [subject, setSubject] = useState(props.subject ? props.subject : '');
    const [body, setBody] = useState(props.body ? props.body : '');
    const [showCcs, setShowCcs] = useState(false);

    function formatRecipientData(contacts) {
        return contacts.map((contact) => {
            return {
                id: contact.id,
                fullName: contact.fullName,
                email: contact.email,
                selected: false
            }
        })
    }

    function updateRecipients(contactID) {
        setRecipients(prevState => 
            prevState.map(obj => {
                if (obj.id === contactID) {
                    let newOjb = obj;
                    newOjb.selected = !obj.selected;
                    return newOjb;
                }
                return obj
            })
        )
    }

    function updateCcs(contactID) {
        setCcs(prevState => 
            prevState.map(obj => {
                if (obj.id === contactID) {
                    let newOjb = obj;
                    newOjb.selected = !obj.selected;
                    return newOjb;
                }
                return obj
            })
        )
    }

    const sendEmail = () => {
        props.sendFunc({
            recipients: recipients.filter((recipient) => recipient.selected).map((recipient) => {
                return {
                    fullName: recipient.fullName,
                    email: recipient.email
                }
            }),
            ccs: ccs.filter((recipient) => recipient.selected).map((recipient) => {
                return {
                    fullName: recipient.fullName,
                    email: recipient.email
                }
            }),
            subject: subject,
            body: body
        })
    }

    function getRecipientSelectedCount(recipients) {
        let count = 0;
        recipients.forEach((obj) => {
            if (obj.selected) {
                count++;
            }
        })
        return count
    }

    return (
        <InnerContainer title='Send Email'>
            {!showCcs && <div style={{position: 'absolute', right: 'var(--normal-gap)', top: 'var(--normal-gap)'}}>
                <ActivateButton text='Cc' clickFunc={ () => setShowCcs(true) }/>
            </div>}
            <InfoGrid>
                {/* Recipients  */}
                <GridItem title='Recipients'>
                    {recipients.map((item, index) => 
                        <ToggleButton text={item.fullName} selected={item.selected} clickFunc={() => updateRecipients(item.id)} color='dark-blue' key={index}/>
                    )}
                </GridItem>
                {/* Cc  */}
                {showCcs && <GridItem title='Cc'>
                    {ccs.map((item, index) => 
                        <ToggleButton text={item.fullName} selected={item.selected} clickFunc={() => updateCcs(item.id)} color='dark-blue' key={index}/>
                    )}
                </GridItem>}
                {/* Subject */}
                <GridItem title='Subject'>
                    <input type='text' value={subject} onChange={(e) => setSubject(e.target.value)}/>
                </GridItem>
                {/* Body */}
                <GridItem title='Body'>
                    <TextareaAutosize 
                        minRows={5}
                        onChange={(e) => setBody(e.target.value) } 
                        value={body}
                    />
                    {props.footer}
                </GridItem>
            </InfoGrid>
            <ContainerFooter>
                <SubmitButton text='Send Email' clickFunc={sendEmail} disabled={getRecipientSelectedCount(recipients) === 0}/>
            </ContainerFooter>
        </InnerContainer>
    )
}

export default SendEmail