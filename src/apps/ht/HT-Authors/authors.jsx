import React, { useEffect, useState } from 'react'
import { SpinnerCircle } from '../../../components/ui-components/ui_components';
import { AuthorTable } from './table';

export default function Authors({ id_dataset }) {
    //console.log(data)
    const [_tableData, set_tableData] = useState();

    useEffect(() => {
        if (!_tableData) {
            try {
                //REACT_APP_PROSSES_SERVICE
                fetch(`${process.env.REACT_APP_PROSSES_SERVICE}/wdps/process/ht-dataset/${id_dataset}/authorData/jsonTable`,{cache: "no-cache"})
                    .then(response => response.json())
                    .then(data => set_tableData(data))
                    .catch(error => {
                        console.error(error)
                        set_tableData({ error: error })
                    });
            } catch (error) {
                console.error(error)
                set_tableData({ error: error })
            }

        }
    }, [_tableData, id_dataset]);

    console.log(_tableData);

    if (!id_dataset) {
        return null
    }
    try {
        return (
            <div>
                {
                    _tableData 
                    ?<AuthorTable tableData={_tableData} id_dataset={id_dataset} />
                    : <SpinnerCircle />
                }
            </div>
        )
    } catch (error) {
        return null
    }

}