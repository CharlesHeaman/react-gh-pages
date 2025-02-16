import { render, screen } from "@testing-library/react"
import SideBarModule from "./SideBarModule"

describe('The SideBarModule component', () => {
    it('displays the title', () => {
        render(<SideBarModule
            title='Test Title'
        >
            
        </SideBarModule>)

        expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    it('displays the children', () => {
        render(<SideBarModule
            title='Test Title'
        >
            <p>Test child</p>
        </SideBarModule>)

        expect(screen.getByText('Test child')).toBeInTheDocument();
    });

    it('displays skeleton', () => {
        render(<SideBarModule
            title='Test Title'
            skeleton
        >
            <p>Test child</p>
        </SideBarModule>)

        expect(screen.queryByText('Test Title')).not.toBeInTheDocument();
    })
})