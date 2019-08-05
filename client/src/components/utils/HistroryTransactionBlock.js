import React from 'react'
import moment from 'moment';


function HistroryTransactionBlock(props) {
    const renderBlocks = () => (
        props.products ?
            props.products.map((product, i) => (
                <tr key={i}>
                    <td className="text-center">{i+1}</td>
                    <td className="text-center">{moment(product.dateOfPurchase).format("DD-MM-YYYY")}</td>
                    <td>{product.brand.name} - {product.name}</td>
                    <td className="text-center">{product.quantity}</td>
                    <td className="text-center">{(product.price * product.quantity).toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</td>
                    <td>{product.paymentId}</td>
                </tr>
            ))
        :null
    )

    return (
        <div className="table table-hover">
            <table>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Date</th>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price paid</th>
                        <th>Payment ID</th>
                    </tr>
                </thead>
                <tbody>
                    {renderBlocks()}
                </tbody>
            </table>
        </div>
    )
}

export default HistroryTransactionBlock
