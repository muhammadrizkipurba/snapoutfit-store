import React from 'react';
import CardBlock from './CardBlock';

function LoadMoreCards(props) {
    return (
        <div>
            <div>
                <CardBlock 
                    grid={props.grid}
                    list={props.products}
                />
            </div>
            {
                props.size > 0 && props.size >= props.limit ?
                    <div className="load_more_container">
                        <span onClick={() => props.loadMore() }>
                            See More
                        </span>
                    </div>
                : null
            }
        </div>
    )
}

export default LoadMoreCards

