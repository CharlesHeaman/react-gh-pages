import { fireEvent, render, screen, waitForElementToBeRemoved } from "@testing-library/react"
import AcceptRequest from "./AcceptRequest"
import mockAxios from 'jest-mock-axios';
import mockHeaders from "../../../../../../../jest/mockHeaders";
import { SetStateAction } from "react";

afterEach(() => {
    mockAxios.reset();
});

describe('The AcceptRequest component', () => {
    it('displays the title', () => {
        render(<AcceptRequest
            requestID={1}
            responseFunction={() => null}
            show={true} 
            setShow={function (value: SetStateAction<boolean>): void {
                throw new Error("Function not implemented.");
            } }        />)

        expect(screen.getByText('Accept Request?')).toBeInTheDocument();
    })

    it('can click submit', async () => {
        render(<AcceptRequest
            show={true}
            requestID={1}
            responseFunction={() => null} 
            setShow={function (value: SetStateAction<boolean>): void {
                throw new Error("Function not implemented.");
            } }        
        />)

        fireEvent(
            screen.getByRole('button', {
                name: 'Accept Request'
              }),
            new MouseEvent('click', {
              bubbles: true,
              cancelable: true,
            }),
        )

        expect(mockAxios.put).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/api/post_completion_change_requests/1/respond`, {
            "accepted": true
        }, {
            "headers": mockHeaders,
            "params": {}
        });

        mockAxios.mockResponse({
            data: {}
        });

        await waitForElementToBeRemoved(() => screen.queryByText('Accepting...'))
    });
})