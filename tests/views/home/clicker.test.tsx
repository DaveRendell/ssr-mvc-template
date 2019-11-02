import TestRenderer from 'react-test-renderer'
import Clicker from '../../../src/views/components/clicker'
import * as React from "react"

describe("Clicker", () => {
  function click(button: TestRenderer.ReactTestInstance) {
    TestRenderer.act(() => {
      button.props.onClick()
    })
  }

  it("increments the counter when the button is clicked", () => {
    // Arrange
    let clicker: TestRenderer.ReactTestRenderer
    TestRenderer.act(() => {
      clicker = TestRenderer.create(<Clicker />)
    })
    const button = clicker.root.findByType("button")
    const span = clicker.root.findByType("span")

    // Act
    click(button)
    click(button)
    click(button)

    expect(span.props.children).toContain(3)
  })
})
