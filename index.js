import { generate } from './lib/generator.js'
import { createRandomPicker } from './lib/random.js'
import { loadCorpus, savaCorpus } from './lib/corpus.js'

const corpus = loadCorpus('corpus/data.json')

const pickTitle = createRandomPicker(corpus.title)
const title = pickTitle()

const article = generate(title, { corpus })
savaCorpus(title, article)