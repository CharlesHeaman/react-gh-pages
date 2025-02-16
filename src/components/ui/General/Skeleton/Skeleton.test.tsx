import { render } from "@testing-library/react"
import Skeleton from "./Skeleton"

describe('The Skeleton component', () => {
    it('renders', () => {
        render(<Skeleton
            type="text"
            align="left"
            width={120}
            marginRight={true}
        />)
    })
})