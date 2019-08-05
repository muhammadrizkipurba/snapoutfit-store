import React from 'react'
import Card from '../utils/card'
import notFound from '../utils/Images/icons/not_found.jpg'

function CardBlock(props) {

    const renderCards = () => (
        props.list ?
            props.list.map(card => (
                <Card 
                    key={card._id}
                    {...card}
                    grid={props.grid}
                />
            ))
        :null
    )
    return (
        <div className="card_block_shop">
            <div>
                <div>
                    {props.list ? 
                        props.list.length === 0 ? 
                            <div className="no_result">
                                <img src={notFound} alt="404" style={{width: "100px"}}  />
                                <h2 className="mt-4">Sorry, no product match with that filter</h2>
                            </div>
                        :null
                    :null}
                    {renderCards(props.list)}
                </div>
            </div>
        </div>
    )
}

export default CardBlock
