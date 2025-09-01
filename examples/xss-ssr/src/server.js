import express from "express";
import ejs from "ejs";
import compression from "compression";
import path from "path";
import React from "react";
import {renderToString} from "react-dom/server"
import Index from "./components/pages/index"
import DangerousInnerHtml from "./components/pages/dangerousInnerHtml";
import Escaping from "./components/pages/escaping";
import { expressCspHeader, NONCE, SELF } from "express-csp-header";

// Server var
const app = express();


// View engine setup
app.set("views", path.join(__dirname,"views"));
app.set("view engine", "ejs");


// Middleware
app.use(compression());
app.use(express.static(__dirname + "/public"));

// CSP
app.use(expressCspHeader({
    directives: {
        // 'script-src': [NONCE, "'strict-dynamic'"]
        // 'script-src': [SELF]
    }
}));


//Routes

app.get('/escaping', async (req, res) => {
    let props = {
        htmlContent: "<b>bold!</b>",
        htmlStyleAttribute: { color: "red" },
        url: `https://pragmaticwebsecurity.com" rel="noopener`
    }
    let reactComp = renderToString(<Escaping {...props} />);
    res.status(200).render('index', { name: "escaping", nonce: req.nonce, reactApp: reactComp });
});

app.get('/dangerousInnerHtml', async (req, res) => {
    let reactComp = renderToString(<DangerousInnerHtml/>);
    // res.setHeader("Content-Security-Policy", "require-trusted-types-for 'script'")
    res.status(200).render('index', { name: "dangerousInnerHtml", nonce: req.nonce, reactApp: reactComp});
});

app.get('/', async (req, res) => {
    let reactComp = renderToString(<Index/>);
    res.status(200).render('index', { name: "index", nonce: req.nonce, reactApp: reactComp});
});



// Server setup
const port = process.env.PORT || 3000;
app.listen(port, function listenHandler() {
    console.info(`Running on ${port}`)
});