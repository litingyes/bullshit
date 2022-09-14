import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const currentFileUrl = import.meta.url
const corpusDataPath = resolve(dirname(fileURLToPath(currentFileUrl)), 'corpus/data.json')

const data = readFileSync(corpusDataPath, { encoding: 'utf-8' })
