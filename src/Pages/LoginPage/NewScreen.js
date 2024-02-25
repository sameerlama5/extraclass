import { useState } from "react";
import { textField } from "./LoginStyles";
import { Button, TextField } from "@mui/material";
import axios from "axios";

function NewScreen() {
    const [text, setText] = useState('');
    const [news, setNews] = useState([]);
    const onClickSearch = () => {
        axios.get(`https://newsapi.org/v2/everything?q=${text}&from=2024-01-25&sortBy=publishedAt&apiKey=${process.env.REACT_APP_NEWSAPIKEY}`)
        .then(function (response) {
        // handle success
        setNews(response?.data?.articles);  
        })
        .catch(function (error) {
        // handle error
        console.log(error);
        })
    }

    return(
        <div className="api-hit">
             <TextField
          value={text}
          style={textField}
          label={'Text'}
          onChange={(event) => setText(event.target.value)}
        />
        <>
        <Button variant="text" onClick={onClickSearch}> {'Search'}</Button>
        </>
        <div style={apiHitStyle}>
        {news.map((news) => (
            <div className="api-content" style={apiContentStyle}>
            <h1>{news.title}</h1>
            <img src={news.urlToImage} style={imgStyle}/>
            <p>{news.description}</p>
            <h2>{news.author}</h2>
            </div>
        ))}
        </div>
        </div>
    )
}
const apiHitStyle = {
    display: 'grid',
    gridTemplateColumns:'auto auto auto auto',
    gap: '40px',
    // flexWrap: 'wrap',
}
const imgStyle = {
    with: '350px'
}
const apiContentStyle = {
    border: '1px solid black',
}
export default NewScreen;