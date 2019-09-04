import * as React from "react"

export interface UserIndexProps {
  email: string
}

export default function indexView({email}: UserIndexProps) {
  return (
    <div>
      <h1>User Page</h1>
      <p>Email address: {email}</p>
    </div>
  )
}
