import { readdirSync, readFileSync, existsSync } from 'node:fs'
import { spawn } from 'node:child_process'

function exec(command, params, ops) {
  let p = spawn(command, params, ops);

  return new Promise((resolveFunc) => {
    p.on("exit", (code) => {
      resolveFunc(code);
    });
  });
}

const examples = readdirSync('./')
  .filter((f) => existsSync(`./${f}/package.json`))
  .map((f) => ({
    folder: `./${f}`,
    package: JSON.parse(readFileSync(`./${f}/package.json`).toString()),
  }))

async function buildExamples () {
  for (const example of examples) {
    console.log(`building ${example.folder}...`)
    await exec('pnpm', ['i'], { stdio: 'inherit', cwd: example.folder })
    await exec('pnpm', ['build'], { stdio: 'inherit', cwd: example.folder })
  }

  for (const typescriptExample of examples.filter((ex) => ex.package.scripts.typecheck != null)) {
    console.log(`typechecking ${typescriptExample.folder}...`)
    await exec('pnpm', ['typecheck'], { stdio: 'inherit', cwd: typescriptExample.folder })
  }
}

await buildExamples()
