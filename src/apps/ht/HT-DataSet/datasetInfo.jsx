import React, { useState, useEffect } from 'react'
import GetInfoDataset from '../webServices/dataset/dataset_info'
import { SpinnerCircle } from '../../../components/ui-components/ui_components'
import BasicInfo from './components/basicInfo'
import TfInfo from './components/tfInfo'
import GrowthConditions from './components/growthConditions'
import { Viewer } from './igv/viewer'
import CONF from '../config/ht_conf_enus.json'
import Tabs from './components/tabs'
import Related from '../relatedTool/related'

const conf = CONF?.pages?.dataset_page

export default function DatasetInfo({ id_dataset }) {
    const [_data, set_data] = useState()
    const [_state, set_state] = useState()

    useEffect(() => {
        let title = "Loading ..."
        if (_data) {
            title = _data?.sample?.title
            //console.log(_data)
        }
        const COVER = document.getElementById("title-cover-ht")
        if (COVER) {
            const COVER_REACTION = new CustomEvent('coverR', {
                bubbles: true,
                detail: {
                    state: _state,
                    title: title
                }
            });
            COVER.dispatchEvent(COVER_REACTION);
        }
        return () => {
            const COVER = document.getElementById("title-cover-ht")
            if (COVER) {
                const COVER_REACTION = new CustomEvent('coverR', {
                    bubbles: true,
                    detail: {
                        state: "done",
                        title: "High Throughput Collection"
                    }
                });
                COVER.dispatchEvent(COVER_REACTION);
            }
        }
    }, [_state, _data])
    return (
        <div>
            <article>
                {
                    !_data
                        ? <div>
                            <SpinnerCircle />
                            <GetInfoDataset id_dataset={id_dataset}
                                status={(state) => { set_state(state) }}
                                resoultsData={(data) => { set_data(data) }}
                            />
                        </div>
                        : <Body data={_data} />
                }
            </article>
            <aside>
                <Related />
            </aside>
        </div>
    )
}

function Body({ data }) {
    const section = conf?.sections
    console.log(data)

    useEffect(() => {
        const RELATED = document.getElementById("related_ht")
        if (RELATED && data) {
            const REL_REACTION = new CustomEvent('upR', {
                bubbles: true,
                detail: {
                    Dataset: data
                }
            });
            RELATED.dispatchEvent(REL_REACTION);
        }
    }, [data])

    return (
        <div>
            {
                data?._id
                    ? null
                    : <h2>Error on ID</h2>
            }
            {
                data?.sample?.title
                    ? <div>
                        <h2 dangerouslySetInnerHTML={{ __html: section?.dataset_info?.title }} />
                        <p dangerouslySetInnerHTML={{ __html: section?.dataset_info?.description }} />
                        <div style={{ marginLeft: "5%" }}>
                            <BasicInfo data={data} />
                        </div>
                    </div>
                    : null
            }
            {
                data?.objectTested?._id
                    ? <div>
                        <h2 dangerouslySetInnerHTML={{ __html: section?.dataset_tf?.title }} />
                        <p dangerouslySetInnerHTML={{ __html: section?.dataset_tf?.description }} />
                        <div style={{ marginLeft: "5%" }}>
                            <TfInfo data={data} />
                        </div>
                    </div>
                    : null
            }

            <h2 dangerouslySetInnerHTML={{ __html: section?.dataset_growthc?.title }} />
            <p dangerouslySetInnerHTML={{ __html: section?.dataset_growthc?.description }} />
            <div style={{ marginLeft: "5%" }}>
                <GrowthConditions growthCondition={data?.growthConditions} />
            </div>
            <Tabs id_dataset={data?._id} data={data} />
            <h2 dangerouslySetInnerHTML={{ __html: section?.dataset_igv?.title }} />
            <p dangerouslySetInnerHTML={{ __html: section?.dataset_igv?.description }} />
            <Viewer  id_dataset={data?._id} tf={data?.objectTested?.name} />
            <br />
            <br />
            <br />
        </div>
    )

}
 //<Tabs id_dataset={data?._id} data={data} />