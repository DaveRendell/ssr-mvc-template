import {readFileSync} from "fs"
import Handlebars from "handlebars"
import {join} from "path"
import {renderToString} from "react-dom/server"

const template = Handlebars.compile(
  readFileSync(join(__dirname, "pageLayout.hbs"), "utf8"))

export function renderPage(
  Component: (...args: any) => JSX.Element,
  initialState: any,
  bundleName: string
) {
  return template({
    initialData: JSON.stringify(initialState),
    component: renderToString(Component(initialState)),
    bundleName
  })
}
