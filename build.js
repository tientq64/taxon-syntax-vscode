!(async function() {
   process.chdir(__dirname)

   const fs = require('fs-extra')
   const jsYaml = require('js-yaml')
   const terser = require('terser')

   const dist = 'F:/apps/Microsoft VS Code/resources/app/extensions/taxon'

   let text, json

   fs.emptyDirSync(dist)

   text = fs.readFileSync('./syntaxes/taxon.tmLanguage.yaml', 'utf8')
   json = jsYaml.load(text)

   fs.outputJsonSync(`${dist}/syntaxes/taxon.tmLanguage.json`, json)

   text = fs.readFileSync('./src/extension.js', 'utf8')
   text = (await terser.minify(text)).code
   fs.outputFileSync(`${dist}/dist/extension.js`, text)

   json = fs.readJsonSync('./package.json')
   fs.outputJsonSync(`${dist}/package.json`, json)

   json = fs.readJsonSync('./language-configuration.json')
   fs.outputJsonSync(`${dist}/language-configuration.json`, json)
})()
