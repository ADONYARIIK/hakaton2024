const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const { logger } = require('./logEvents.js');
const errorHandler = require('./errorHandler.js');
const PORT = process.env.PORT || 3500;

app.use(logger);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/hackatoon2024(-u6n7.onrender.com)?', (req,res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})

app.post('/hackatoon2024', (req,res) => {
    let {age, male, female, other, salary, dream, workplace, careerHigh, careerLow, country, abroadYes, abraodNo, hobby, selfDevLow, selfDevMedium, selfDevHigh} = req.body;

    let numAge = Number(age)
    let okresPrzepowiedni = 10;
    numAge += okresPrzepowiedni;

    const response = [
        `
            ${numAge} lat i żyjesz na styku technologii i harmonii. 
            Jesteś liderem globalnych projektów, pracując zdalnie z inteligentnego, 
            futurystycznego domu, który łączy naturę z zaawansowaną technologią. 
            ${hobby} stał się Twoją medytacją, a rozwój zawodowy płynie naturalnie dzięki AI dostarczającej 
            wiedzę w tle codzienności. Twoja praca i życie osobiste przenikają się, a międzynarodowe doświadczenia 
            uczyniły Cię częścią globalnej społeczności. Twoje marzenia stały się rzeczywistością, a przyszłość – 
            spokojem pełnym możliwości.
        `,
        `
            Masz ${numAge} lata, a życie toczy się stabilnym, choć nie zawsze ekscytującym rytmem. 
            Pracujesz jako ${workplace} w lokalnym salonie, mając stałych klientów, ale bez większych perspektyw na rozwój. 
            ${dream}, o którym marzyłaś, 
            udało się kupić, choć wymaga on częstych napraw, co bywa źródłem frustracji.
            Twoje ${hobby} pozostało hobby, które realizujesz rzadko z braku czasu i energii po pracy.
            Brak wyraźnego zaangażowania w samorozwój sprawił, że czujesz czasami, jakbyś utknęła w miejscu. 
            Jednak znajdujesz ukojenie w małych codziennych przyjemnościach i w kontakcie z bliskimi, co pozwala
            Ci utrzymać równowagę w życiu.
        `,
        `
            Masz ${numAge} lat, żyjąc spokojnie i skromnie w ${country}. Choć nie założyłeś/aś tradycyjnej rodziny, 
            bliscy przyjaciele stali się Twoim wsparciem. Drobne prace dorywcze pozwalają się utrzymać, 
            a ${hobby} jest Twoją ucieczką i źródłem równowagi.
            Cieszysz się prostymi chwilami, odnajdując sens w relacjach i codziennym spokoju.
        `
    ];

    const randomAIGeneration = Math.floor(Math.random() * 3);

    console.log(`Odebrano dane ${response[randomAIGeneration]}`);

    res.json({
        message: "Dane odebrane",
        recievedData: response[randomAIGeneration]
    })
})


app.listen(PORT, () => {
    console.log('Listening on a port 3500...');
});

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, '404.html'));
    } else if (req.accepts('json')) {
        res.json({ error: "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found")
    }

});

app.use(errorHandler);
