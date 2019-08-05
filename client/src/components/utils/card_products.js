import React from 'react'
import Card from './card';

function CardProducts(props) {
    
    const renderCards = () => (
        props.list ?
            props.list.map((card,i) => (
                <Card key={i} {...card} />
            ))
        :
        null
    )
    
    return (
        <div className="card_block mt-0 p-2">
            <div className="container">
                {
                    props.title ? 
                        <div className="title">
                            {props.title}
                        </div>
                    :
                    null
                }
                <div style={{display: "flex", flexWrap:"wrap"}}>
                    {renderCards(props.list)}
                </div>
            </div>
        </div>
    )
}

export default CardProducts; 
