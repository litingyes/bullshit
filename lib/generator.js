import { createRandomPicker, randomInt } from './random.js'

function sentence(pick, replacer) {
    let ret = pick()
    for (const key in replacer) {
        ret = ret.replace(new RegExp(`{{${key}}}`, 'g'), typeof replacer[key] === 'function' ? replacer[key]() : replacer[key])
    }
    return ret
}


export function generate(title, { corpus, min = 6000, max = 10000 } = {}) {
    const articleLength = randomInt(min, max)
    const { famous, bosh_before, bosh, said, conclude } = corpus
    const [pickFamous, pickBoshBefore, pickBoth, pickSaid, pickConclude] = [famous, bosh_before, bosh, said, conclude].map(createRandomPicker)
    const article = []
    let totalLength = 0

    while (totalLength < articleLength) {
        let section = ''
        const sectionLength = randomInt(200, 500)
        while (section.length < sectionLength || !/[。？]$/.test(section)) {
            const n = randomInt(0, 100)
            if (n < 20) {
                section += sentence(pickFamous, { said: pickSaid, conclude: pickConclude })
            } else if (n < 50) {
                section += sentence(pickBoshBefore, { title }) + sentence(pickBoth, { title })
            } else {
                section += sentence(pickBoth, { title })
            }
        }
        totalLength += section.length
        article.push(section)
    }

    return article
}