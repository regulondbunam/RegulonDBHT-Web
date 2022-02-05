import React, { useState } from 'react';
import SummaryObj from './summary_OT';

export default function ObjectsTested({
  objectsTested = []
}) {

  const [_view, set_view] = useState(0);


  return (
    <div>
      {
        objectsTested.length > 1
          ? <h2>TRANSCRIPTIONS FACTOR</h2>
          : <h2>TRANSCRIPTION FACTOR</h2>
      }
      <div style={{marginLeft: "5%"}} >
      <SummaryObj objectsTested={objectsTested} />
      </div>
    </div>
  )
}

/**
 * {
        objectsTested.length > 1
        && <div>
          <select name="select" onChange={(e)=>{
            set_view(e.target.value)
          }}>
            <option value={0}>Tabs</option>
            <option value={1} selected>Summary</option>
          </select>
        </div>
      }
 */