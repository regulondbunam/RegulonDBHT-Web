import React from 'react'
import Style from "./modal.module.css"
import { Remarkable } from 'remarkable';
const md = new Remarkable();

export default function ModalHT({ title = "modal", md_data, footer = "" }) {

    function hide() {
        let modal = document.getElementById("myModal");
        if (modal) {
            modal.style.display = "none";
        }
    }

    return (
        <>
            <button
                onClick={() => {
                    let modal = document.getElementById("myModal");
                    if (modal) {
                        modal.style.display = "block";
                    }
                }}
            >
                Read more</button>
            <div id="myModal" onClick={() => { hide() }} className={Style.modal}>
                <div className={Style.modal_content}>
                    <div className={Style.modal_header}>
                        <span onClick={() => { hide() }}
                            className={Style.close}>&times;</span>
                        {title}
                    </div>
                    <div className={Style.modal_body}>
                        <div dangerouslySetInnerHTML={{ __html: md.render(md_data) }} />
                    </div>
                    <div className={Style.modal_footer}>
                        {footer}
                    </div>
                </div>
            </div>
        </>
    )
}
