import React from 'react'
import notFoundIcon from './Images/icons/404.png'

function PageNotFound() {
    return (
        <div className="page_not_found">
            <div className="not_found_container">
                <img alt="404" src={notFoundIcon} style={{height: "160px", color:"white"}} />
                <h2>Oppss.. something went wrong</h2>
                <h4>Page not found</h4>
            </div>
        </div>
    )
}

export default PageNotFound;
