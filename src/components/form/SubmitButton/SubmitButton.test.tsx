import { fireEvent, render, screen } from "@testing-library/react"
import SubmitButton from "./SubmitButton"

describe('The SubmitButton component', () => {
    it('displays the text', () => {
        render(<SubmitButton
            text='Text test'
            color='red'
            clickFunc={() => null}
            left
        />)

        expect(screen.getByText('Text test')).toBeInTheDocument();
    });

    it('displays with default colour', () => {
        render(<SubmitButton
            text='Text test'
            clickFunc={() => null}
        />)

        expect(screen.getByText('Text test')).toBeInTheDocument();
    });

    it('calls the click function', () => {
        const clickFunc = jest.fn()

        render(<SubmitButton
            text='Text test'
            clickFunc={clickFunc}
        />)

        fireEvent(
            screen.getByText('Text test'),
            new MouseEvent('click', {
              bubbles: true,
              cancelable: true,
            }),
        )

        expect(clickFunc).toHaveBeenCalled();
    });

    it('displays with submitting text', () => {
        render(<SubmitButton
            text='Text test'
            clickFunc={() => null}
            submitting
            submittingText='Submitting Text...'
        />)

        expect(screen.getByText('Submitting Text...')).toBeInTheDocument();
    });

    it('displays with default submitting text', () => {
        render(<SubmitButton
            text='Text test'
            clickFunc={() => null}
            submitting
        />)

        expect(screen.getByText('Submitting...')).toBeInTheDocument();
    });
})