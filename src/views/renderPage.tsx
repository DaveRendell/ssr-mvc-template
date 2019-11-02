import { JSXElement } from "@babel/types"
import * as React from "react"
import {renderToStaticMarkup, renderToString} from "react-dom/server"

export function renderStaticPage(Component: JSX.Element) {
  return renderToStaticMarkup(
    <html>
      <head>
        <link rel="stylesheet" type="text/css" href="styles/app.css" />
      </head>
      <body>
        <div id="page-header">
          <strong>App Header</strong>
        </div>
        <div id="page-content">
          {Component}
        </div>
      </body>
    </html>
  )
}

export function renderPage(
  Component: (...args: any) => JSX.Element,
  initialState: any,
  bundleName: string
) {
  return `<html>
    <head>
      <link rel="stylesheet" type="text/css" href="styles/app.css" />
      <script>window.__INITIAL__DATA__ = ${JSON.stringify(initialState)}</script>
    </head>
    <body>
      <div id="page-header">
        <strong>App Header</strong>
      </div>
      <div id="page-content">${renderToString(Component(initialState))}</div>
      <script src="public/${bundleName}.js"></script>
    </body>
  </html>`
}
