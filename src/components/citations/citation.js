export function Citation(cit, small = true) {
    
    //W->weak S->strong
    //console.log(cit)
    const publication = cit?.publication
    const citation = publication?.citation
    const evidence = cit?.evidence
    const eviCode = evidence?.code
    //const id = publication?.id
    
    const authors = publication?.authors
    const year = publication?.year
    
    const code = () => {
        if (eviCode) {
            if (evidence.type === 'S') {
                return `<b>[${eviCode}]</b>`
            }
            return `[${eviCode}]`
        }
        return ''
    }
    if (small) {
        if(!authors){
            return `${code()}`.trim()
        }
        if(authors[0]){
            return `${authors[0]}., et al. ${year?year:''} ${code()}`
        }
        return `${code()}`.trim()
    }
    return `${citation?`${citation},`:''} ${code()}`
    // [i]autor., et al. año [evidence]
}