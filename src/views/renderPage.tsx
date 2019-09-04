import * as React from "react"
import {renderToStaticMarkup} from "react-dom/server"

export function renderStaticPage(Component: JSX.Element) {
  return renderToStaticMarkup(
    <html>
      <head>
        <link rel="stylesheet" type="text/css" href="styles/app.css" />
      </head>
      <body>
        <div className="page-header">
          <strong>App Header</strong>
        </div>
        <div className="page-content">
          {Component}
        </div>
      </body>
    </html>
  )
}
