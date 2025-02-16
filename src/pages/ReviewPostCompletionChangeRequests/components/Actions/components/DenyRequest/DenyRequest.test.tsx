import { fireEvent, render, screen, waitForElementToBeRemoved } from "@testing-library/react"
import DenyRequest from "./DenyRequest"
import mockAxios from 'jest-mock-axios'
import mockHeaders from "../../../../../../../jest/mockHeaders"
import { SetStateAction } from "react"

describe('The DenyRequest component', () => {
    it('displays the title', () => {
        render(<DenyRequest
            requestID={1}
            responseFunction={() => null} 
            show={true} 
            setShow={function (value: SetStateAction<boolean>): void {
                throw new Error("Function not implemented.")
            } }        />)

        expect(screen.getByText('Deny Request?')).toBeInTheDocument();
    })

    it('can click submit', async () => {
        render(<DenyRequest
            requestID={1}
            responseFunction={() => null} 
            show={true} 
            setShow={function (value: SetStateAction<boolean>): void {
                throw new Error("Function not implemented.")
            } }        />)

        fireEvent(
            screen.getByRole('button', {
                name: 'Deny Request'
            }),
            new MouseEvent('click', {
              bubbles: true,
              cancelable: true,
            }),
        )

        expect(mockAxios.put).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/api/post_completion_change_requests/1/respond`, {
            "accepted": false
        }, {
            "headers": mockHeaders,
            "params": {}
        });

        mockAxios.mockResponse({
            data: {}
        });

        await waitForElementToBeRemoved(() => screen.queryByText('Denying...'))
    })
})