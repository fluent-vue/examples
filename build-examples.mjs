import { readdirSync, readFileSync, existsSync } from 'fs'
import { execa } from 'execa'

const id = Math.random().toString(36).substr(2, 9)

const examples = readdirSync('./')
  .filter((f) => existsSync(`./${f}/package.json`))
  .map((f) => ({
    folder: `./${f}`,
    package: JSON.parse(readFileSync(`./${f}/package.json`).toString()),
  }))

async function buildExamples () {
  for (const example of examples) {
    console.log(`building ${example.folder}...`)
    await execa('pnpm', ['i'], { stdio: 'inherit', cwd: example.folder })
    await execa('pnpm', ['build'], { stdio: 'inherit', cwd: example.folder })
  }

  for (const typescriptExample of examples.filter((ex) => ex.package.scripts.typecheck != null)) {
    console.log(`typechecking ${typescriptExample.folder}...`)
    await execa('pnpm', ['typecheck'], { stdio: 'inherit', cwd: typescriptExample.folder })
  }
}

await buildExamples()
