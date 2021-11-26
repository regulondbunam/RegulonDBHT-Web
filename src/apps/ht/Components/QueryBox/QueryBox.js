
import React, { Component } from 'react';
import Style from './QueryBox.module.css'


class QueryBox extends Component {
    render() {
        return (
            <div>
                <h3>Query Box</h3>
                <div style={{ marginLeft: "5%" }}>
                    <textarea id="query_area" type="text" className={Style.QueryArea}
                        onChange={(e) => {
                            let queryB = e.target.value
                            const builder = document.getElementById("builder_HT")
                            console.log(queryB.length)
                            if (builder) {
                                if(queryB.length === 0){
                                    const builerR = new CustomEvent('builderR', {
                                        bubbles: true,
                                        detail: {
                                            buildedQuery: undefined
                                        }
                                    });
                                    builder.dispatchEvent(builerR);
                                }else{
                                    const builerR = new CustomEvent('builderR', {
                                        bubbles: true,
                                        detail: {
                                            buildedQuery: queryB
                                        }
                                    });
                                    builder.dispatchEvent(builerR);
                                }
                                
                            }
                        }}
                    />
                </div>
            </div>
        );
    }
} export default QueryBox;