import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import { generate } from './lib/generator.js'
import { createRandomPicker } from './lib/random.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

function loadCorpus(src) {
    const path = resolve(__dirname, src)
    const data = readFileSync(path, { encoding: 'utf-8' })
    return JSON.parse(data)
}

const corpus = loadCorpus('corpus/data.json')

const pickTitle = createRandomPicker(corpus.title)
const title = pickTitle()

const article = generate(title, { corpus })
console.log(`${title}\n\n    ${article.join('\n  ')}`)