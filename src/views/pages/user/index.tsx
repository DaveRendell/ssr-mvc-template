import * as React from "react"

export interface UserIndexProps {
  displayName: string
}

export default function indexView({displayName}: UserIndexProps) {
  return (
    <div>
      <h1>User Page</h1>
      <p>Display name: {displayName}</p>
    </div>
  )
}
