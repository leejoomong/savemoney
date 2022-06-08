import React, { useState, useEffect }  from 'react'
import { Dropdown } from 'semantic-ui-react'

import CardTable from './CardTable'
import CardGraph from './CardGraph'
import axios from 'axios';

function Card() {
    const [data, setData] = useState([]);
    const [cardOptions, setCardOptions] = useState([]);

    const fetchExpense = async () => {
        try {
          const response = await axios.get(
            '/expenses'
          );
          setData(response.data); // 데이터는 response.data 안에 들어있습니다.
        } catch (e) {
          console.log(e);
        }
      };

    useEffect(() => {
        fetchExpense();
      }, []);

      useEffect(() => {
        let cardOptions = []
        let cards = ([...new Set(data.map(data => data.instrument))])
        cards.forEach(card => {
            cardOptions.push({
                key: card,
                text: card,
                value: card
            })
        });

        setCardOptions(cardOptions);
        setCard(cards[cards.length-1])
    }, [data])
    

    const [card, setCard] = useState("")
    // const [instruments, setInstruments] = useState([])

    // useEffect(() => {
    //     setInstruments([...new Set(data.map(data => data.instrument))])
    // }, [data])

    let handleCardChange = (e, { value }) => {
        setCard(value)
    }

    return (
        <>
            <Dropdown selection options={cardOptions} value={card} onChange={handleCardChange}/>
            <br /><br />
            <CardGraph data={data.filter(expense => expense.instrument === card)}/>
            <CardTable data={data.filter(expense => expense.instrument === card)}/>
        </>
    )
}

export default Card