import React from "react"
import ReactDOM from "react-dom"
import Component from "./"

ReactDOM.hydrate(
  <Component {...(window as any).__INITIAL__DATA__} />,
  document.getElementById("page-content")
)
