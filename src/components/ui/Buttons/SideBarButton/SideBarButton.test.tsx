import { render, screen } from "@testing-library/react"
import SideBarButton from "./SideBarButton"

describe('The SideBarButton component', () => {
    it('displays the text', () => {
        render(<SideBarButton
            text="Test Text"
            iconFont="close"
            clickEvent={() => null}
        />)

        expect(screen.getByText('Test Text')).toBeInTheDocument();
    });

    it('displays the icon', () => {
        render(<SideBarButton
            text="Test Text"
            iconFont="close"
            clickEvent={() => null}
        />)

        expect(screen.getByText('close')).toBeInTheDocument();
    })
})