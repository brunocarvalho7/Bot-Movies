const rp = require('request-promise')
const cheerio = require('cheerio')

exports.pesquisaPorInicial = (inicial) => {
    const pesquisa = {
        uri: 'https://megaseriehd.com/wp-json/dooplay/glossary/?term='+inicial+'&nonce=38b002cc28&type=all',
        transform: function(body, response){
            return {
                body: body,
                response: response
            }
        }
    }
    
    return new Promise((resolve, reject) => {
        rp(pesquisa)
        .then(({body, response}) => {
            resolve({
                body: JSON.parse(body),
                response: response
            })
        })
        .catch((error) => reject(error))
    })
}

exports.getMedia = (url) => {
    return new Promise((resolve, reject) => {
        getUrl(url)
        .then((embed) => {
            let medias = []
            embed.forEach((link, index) =>{   
                getScript(link)
                .then((script) => {
                    getEpisodes(link)
                    .then((lista) => {
                        medias[index] = {linkBase: link, script: script, seasons: lista}
                        resolve(medias) //TODO: Resolver isso
                    })
                })
            })    
        })
        .catch((error => reject(error)))
    })
}

function getUrl(urlBase){
    const options = {
        uri: urlBase,
        transform: function(body, response){
            return {
                $: cheerio.load(body),
                response: response
            }
        }
    }

    return new Promise((resolve, reject) => {
        rp(options)
        .then(({$}) => {
            iframes = []
            $("iframe").each(function(i, elem){
                iframes[i] = $(this).attr('src')
            })

            resolve(iframes)
        })
        .catch((error) => reject(error))
    })
}

function getScript(url){
    const options = {
        uri: url,
        transform: function(body, response){
            return {
                $: cheerio.load(body),
                response: response
            }
        }
    }

    return new Promise((resolve, reject) => {
        rp(options)
        .then(({$}) => {
            let inicio = $('script')[3].children[0].data.indexOf('function InitPlayer(s,e,t)')
            let fim = $('script')[3].children[0].data.indexOf('$(".Svplayer")')
            let script = $('script')[3].children[0].data.substring(inicio, fim)
        
            resolve(script)
        })
        .catch((error) => reject(error))
    })
}

function getEpisodes(url){
    const options = {
        uri: url,
        transform: function(body, response){
            return {
                $: cheerio.load(body),
                response: response
            }
        }
    }

    return new Promise((resolve, reject) => {
        rp(options)
        .then(({$}) => {
            lista = []
            $("#seriePlayer2016 ul").each(function(i, x){
                lista[i] = {titulo: $(this).children('p').children('a').text(), episodios: []}
                
                $(this).children('p').children('c').children('a').each(function(j){
                    lista[i].episodios[j] = {
                        titulo: $(this).text(),
                        link: $(this).attr('href')
                    }
                })
            })
            resolve(lista)
        })
        .catch((error) => reject(error))
    })
}