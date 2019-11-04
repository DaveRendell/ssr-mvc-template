import * as React from "react"
import Clicker from "../../components/clicker"

export interface UserIndexProps {
  displayName: string
}

export default function indexView({displayName}: UserIndexProps) {
  return (
    <div>
      <h1>User Page</h1>
      <p>Display name: {displayName}</p>
      <Clicker />
    </div>
  )
}
