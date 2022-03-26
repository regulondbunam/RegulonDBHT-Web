export function ExtQuery(search = "") {
    let querys = {
        dataset: undefined,
        nlpgcLogic: undefined,
        nlpgc: undefined
    }
    let q = search.split('#nlpgc#')
    console.log(q[1].toLowerCase());
    if (q.length > 0) {
        querys.dataset = q[0]
        querys.nlpgc = q[2]
        if (q[1].toLowerCase() === 'or' || q[1].toLowerCase() === 'and' || q[1].toLowerCase() === 'not') {
            querys.nlpgcLogic = q[1]
        }
        
    }else{
        querys.dataset = q[0]
    }

    return querys
}