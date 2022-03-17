import React from 'react'
import Style from "./modal.module.css"
import { Remarkable } from 'remarkable';
const md = new Remarkable();

export default function ModalHT({ title = "modal", md_data, footer = "", id }) {

    function hide() {
        let modal = document.getElementById(`modal_${title}_${id}`);
        if (modal) {
            modal.style.display = "none";
        }
    }

    return (
        <>
            <button className="aBase"
                onClick={() => {
                    let modal = document.getElementById(`modal_${title}_${id}`);
                    if (modal) {
                        modal.style.display = "block";
                    }
                }}
            >Read more</button>
            <div id={`modal_${title}_${id}`}  className={Style.modal}>
                <div className={Style.modal_content}>
                    <div className={Style.modal_header}>
                        <span onClick={() => { hide() }}
                            className={Style.close}>&times;</span>
                        <h2 style={{color: "white", fontSize: "5vh"}} >{title}</h2>
                    </div>
                    <div className={Style.modal_body}>
                        <div dangerouslySetInnerHTML={{ __html: md.render(md_data) }} />
                    </div>
                    <div onClick={() => { hide() }} className={Style.modal_footer}>
                        <button className="accent" > EXIT </button>
                    </div>
                </div>
            </div>
        </>
    )
}
