import React, { useContext } from 'react'
import { Citation } from './citation'
import { Modal } from './citation_modal'

export function TableCitations({ CitationCONTEXT, citations, small = true }) {
    const { allCitations } = useContext(CitationCONTEXT)
    if (!citations) {
        return null
    }
    return (
        <>

            <table>
                <tbody>
                    {

                        citations.map((cit, indx) => {
                            try {
                                let index = allCitations.findIndex((citation) => citation?.publication?.id === cit?.publication?.id && citation?.evidence?.id === cit?.evidence?.id)
                                return (
                                    <tr key={`citation_no_000${index}`}>
                                        <td>
                                            [{index + 1}]
                                            <Modal
                                                classNameModal="citation"
                                                title={`${Citation(cit, small)}`}
                                                cit={cit}
                                            />
                                        </td>
                                    </tr>
                                )
                            } catch (error) {
                                return null
                            }
                        })
                    }
                </tbody>
            </table>
            <br />
            <br />
        </>
    )
}

export function ParagraphCitations({ CitationCONTEXT, citations, small = true }) {
    const { allCitations } = useContext(CitationCONTEXT)
    if (!citations) {
        return null
    }
    return (
        <>
            {

                citations.map((cit, indx) => {
                    try {
                        let index = allCitations.findIndex((citation) => citation?.publication?.id === cit?.publication?.id && citation?.evidence?.id === cit?.evidence?.id)
                        return (
                            <Modal key={`CitaitopnPH_${cit?.publication?.id}_${cit?.evidence?.id}_${indx}`}
                                classNameModal="citation"
                                title={`[${index + 1}]${Citation(cit, small)}`}
                                cit={cit}
                            />
                        )
                    } catch (error) {
                        return null
                    }
                })
            }
        </>
    )
}

export function TableCitationContext({ CitationCONTEXT, small = false }) {
    const { allCitations } = useContext(CitationCONTEXT)
    if(!allCitations){
        return null
    }
    return (
        <>

            <table>
                <tbody>
                    {

                        allCitations.map((cit, index) => {
                            try {
                                return (
                                    <tr key={`citation_no_000${index}`}>
                                        <td>
                                            <Modal
                                                classNameModal="citation"
                                                title={`[${index + 1}]${Citation(cit, small)}`}
                                                cit={cit}
                                            />
                                        </td>
                                    </tr>
                                )
                            } catch (error) {
                                return null
                            }
                        })
                    }
                </tbody>
            </table>
            <br />
            <br />
        </>
    )
}