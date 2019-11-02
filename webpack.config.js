const { readdirSync, copyFile } = require('fs')
const { join } = require('path')

// Generate an entrypoint for each directory in the views folder
const viewsDirectory = join(__dirname, "src", "views")

const pages = readdirSync(
  join(viewsDirectory, "pages"), { withFileTypes: true })
    .filter(child => child.isDirectory())
    .map(directory => directory.name)

let entryPoints = {}
pages
  .forEach(name => entryPoints[name] = `./src/views/pages/${name}/public.tsx`)

// Copy `public.tsx` wrapper for hydrating components to each view directory
for (directory in pages) {
  copyFile(
    join(viewsDirectory, "public.tsx.template"), 
    join(viewsDirectory, "pages", pages[directory], "public.tsx"),
    (err) => {
      if (err) throw err
    })
}

module.exports = {
  entry: entryPoints,
  output: {
    path: join(__dirname, "public"),
    filename: "[name].js"
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: "ts-loader" }
    ]
  }
}
