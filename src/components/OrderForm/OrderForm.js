import React from "react";
import axios from "axios";
import { DropdownButton, Form } from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from "react-redux";
import { setCrypto, buyFor, sellFor, setQuantity, setBuyBook } from "../../redux/orderSlice";

export default function OrderForm () {
    const dispatch =  useDispatch();
    const currentCrypto = useSelector(state => state.order.currentCrypto);
    const selectedCrypto = useSelector(state => state.order.selectedCrypto);
    const quantity = useSelector(state => state.order.quantity);
    const cryptoValue = useSelector(state => state.order.value);
    const xRate = useSelector(state => state.order.xRate);
    const isBuying = useSelector(state => state.order.isBuying);

    const buyBook = useSelector(state => state.order.buyBook);

    let cryptoArr = [];
    let btc = "";
    let eth = "";
    let xrp = "";
    async function getExchangeRates () {
        await axios.get("https://api.coingecko.com/api/v3/exchange_rates")
            .then(response => {
                btc = response.data.rates.btc;
                eth = response.data.rates.eth;
                xrp = response.data.rates.xrp;
            }).catch(err => {
                console.error("error: ", err.message);
            })
    }
    getExchangeRates();
    return (
        <Form>
            <Form.Label>Crypto In Possession: {cryptoValue} {selectedCrypto.toUpperCase()}</Form.Label>
            <DropdownButton id="crypto-currencies" title="Cryptocurrencies">
                <Dropdown.ItemText>Select Crypto Type</Dropdown.ItemText>
                <Dropdown.Item
                    onClick={(e)  => {
                    dispatch(setCrypto("ETH"));
                }}>ETH</Dropdown.Item>
                <Dropdown.Item onClick={(e)  => {
                    dispatch(setCrypto("BTC"));
                }}>BTC</Dropdown.Item>
                <Dropdown.Item onClick={(e)  => {
                    dispatch(setCrypto("XRP"));
                }}>XRP</Dropdown.Item>
            </DropdownButton>
            <Form.Group>
                <Form.Label>Quantity: </Form.Label>
                <Form.Control type="quantity" placeholder="enter number" onChange={(e) => dispatch(setQuantity(e.target.value))}/>
            </Form.Group>
            <Button id="crypto-buy" variant="success" onClick={() => {
                if (currentCrypto !== "") {
                    if (currentCrypto === "ETH") {
                        dispatch(buyFor(eth.value));
                    } else if (currentCrypto === "XRP") {
                        dispatch(buyFor(xrp.value));
                    } else {
                        dispatch(buyFor(btc.value));
                    }
                } else {
                    alert("Please select a Crypto type");
                }
            }}>Buy</Button>
            <Button variant="danger" onClick={() => {
                if (currentCrypto !== "") {
                    if (currentCrypto === "ETH") {
                        dispatch(sellFor(eth.value));
                    } else if (currentCrypto === "XRP") {
                        dispatch(sellFor(xrp.value));
                    } else {
                        dispatch(sellFor(btc.value));
                    }
                } else {
                    alert("Please select a Crypto type");
                }
            }}>Sell</Button>
            <Form.Group>
                {isBuying && <p>Buying {quantity} {currentCrypto} </p>}
                {(!isBuying && isBuying !== null) && <p>Selling {quantity} bitcoin for {currentCrypto} </p>}
            </Form.Group>
            {isBuying === null ? <p>Select Buy or Sell to get exchange value</p> : <p>{xRate.toFixed(2) + " " + currentCrypto} {isBuying ? "value in bitcoin" : ""}</p>}
            <Button 
                variant="primary"
                onClick={() => {
                    if (isBuying) {
                        let date = new Date();
                        let currentDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
                        dispatch(setBuyBook({
                            id: buyBook.length,
                            currency:  currentCrypto,
                            quantity: quantity,
                            cost: xRate,
                            totalVal: quantity * xRate,
                            timestamp: currentDate
                        }))
                        console.log("buyBook: ", buyBook);
                    }
            }}>Submit</Button>
        </Form>
    )
}