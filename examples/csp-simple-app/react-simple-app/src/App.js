import React from 'react';
import './App.css';

function App() {
    
    function tellAJoke() {
        let jokes = ["Why are people from Norway so good at editing files in Linux?\n\nTheir ancestors are vi-kings.", "I’m starting a band called HTML Encoder.\n\nLooking to buy a guitar &amp;", "My dog ate my computer science homework.\n\nIt took him a couple of bytes."];
        let joke = jokes[Math.floor(Math.random() * jokes.length)];
        alert(joke);
    }

    return (
        <div className="App">
            <h1>Want to hear a lame joke?</h1>
            <button onClick={tellAJoke}>Hit me!</button>
            <br />
            <br />
            <a href="https://twitter.com/LameJokes69" style={{fontSize: "small"}}>Jokes courtesy of the <i>Lame Joke Of The Day</i> Twitter account.</a>
        </div>
    );
}

export default App;
