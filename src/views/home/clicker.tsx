import * as React from 'react'

export default function Clicker() {
  const [clicks, setClick] = React.useState(0)

  return (
    <div>
      <span>{clicks} clicks</span>
      <button onClick={() => setClick(clicks + 1)}>Click!</button>
    </div>
  )
}