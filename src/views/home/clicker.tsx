import * as React from "react"

export default function Clicker() {
  const [clicks, setClicks] = React.useState(0)

  function handleClick() {
    setClicks(clicks + 1)
  }

  return (
    <div>
      <span>{clicks} clicks</span>
      <button onClick={handleClick}>Click!</button>
    </div>
  )
}
