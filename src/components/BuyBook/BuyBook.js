import React from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function BuyBook () {
    const buyBook = useSelector(state => state.order.buyBook);
    const buyBookItems = buyBook.map(item => {
        return (
            <tr>
                <td>{item.id}</td>
                <td>{item.currency}</td>
                <td>{item.quantity}</td>
                <td>{item.cost}</td>
                <td>{item.totalVal}</td>
                <td>{item.timestamp}</td>
            </tr>
        )
    })
    return (
        <Table>
            <tr>
                <td>ID</td>
                <td>Currency</td>
                <td>Quantity Purchased</td>
                <td>Cost per Unit</td>
                <td>Total Value purchased</td>
                <td>Timestamp</td>
            </tr>
            {buyBookItems}
        </Table>
    )
}