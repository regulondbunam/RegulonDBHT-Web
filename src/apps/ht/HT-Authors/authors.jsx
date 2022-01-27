import React, { useEffect, useState } from 'react'
import { SpinnerCircle } from '../../../components/ui-components/ui_components';
import { AuthorTable } from './table';

export default function Authors({ data, id_dataset }) {
    //console.log(data)
    const [_tableData, set_tableData] = useState();

    useEffect(() => {
        if (!_tableData) {
            try {
                //REACT_APP_PROSSES_SERVICE
                fetch(`${process.env.REACT_APP_PROSSES_SERVICE}/process/ht-dataset/${id_dataset}/authorData/jsonTable`)
                .then(response => response.json())
                .then(data => set_tableData(data))
                .catch(error => {
                    console.error(error)
                    set_tableData({error: error})
                });
            } catch (error) {
                console.error(error)
                set_tableData({error: error})
            }
            
        }
    }, [_tableData, id_dataset]);

    console.log(_tableData);

    const authorData = data[0]?.authorsData
    if (!authorData) {
        return null
    }
    try {
        let link = saveStaticDataToFile(authorData, data[0]?._id)
        return (
            <div>
                <button
                    onClick={() => { window.location = link }}
                >Download File</button>
                {
                    _tableData ?
                    <div>
                        <p>
                            {_tableData?.comments}
                        </p>
                        <AuthorTable tableData={_tableData} />
                    </div>
                    :<SpinnerCircle />
                }
            </div>
        )
    } catch (error) {
        return null
    }

}

function saveStaticDataToFile(str, name) {
    let blob = new Blob([str],
        { type: "text/csv;charset=utf-8" },
        `n_S${name}.csv`
    );
    return window.URL.createObjectURL(blob);
}