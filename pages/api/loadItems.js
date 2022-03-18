

export default function api(req, res) {
    console.log(req)

    setTimeout(() => {
        res.json({hello: "world"})
      }, 2000)
    
    /*
    // a slow endpoint for getting repo data
    fetch(`https://deep-index.moralis.io/api/v2/${req.query.address}/nft?chain=eth&format=decimal`, {
        headers: {
            'accept': 'application/json',
            'X-API-Key': process.env.MORALIS_API_KEY
        }
    })
    .then(resp => resp.json())
    .then(data => {
        setTimeout(() => {
        res.json(data)
        }, 2000)
    })
    */
}