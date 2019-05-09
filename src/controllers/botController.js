const bot = require('./../bot')

exports.getMedia = (req, res, next) => {
    let url = req.query.url

    if(url != undefined){
        bot.getMedia(url)
        .then((response) => {
            res.status(200).send(response);
        })
        .catch((reason) => {
            res.status(400).send(reason);
        })
    }else{
        res.status(404).send()
    }
}

exports.get = (req, res, next) =>{
    let q = req.query.q

    if(q != undefined){
        bot.pesquisaPorInicial(q)
        .then((obj) => {
            res.status(200).send(obj);
        })
        .catch((reason) =>{
            res.status(400).send(reason);
        })
    }else{
        res.status(404).send()
    }
}