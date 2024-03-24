import http from 'http';
import fs from 'fs';
import { exec } from 'child_process';

const httpServer = http.createServer((req, res) => {
    if(req.method == "POST" && req.url == "/code") {
        let code = "";
        req.on('data', (data) => {code += data});
        req.on('end', async () => {
            try {
                fs.writeFileSync("script.py", code);
                exec('python script.py', (err,stdout, stderr) => {
                    if(!err) {
                        res.setHeader('Content-Type', 'text/plain');
                        res.end(stdout)
                    } else {
                        res.statusCode = 500;
                        console.error(err)
                        res.end(`Internal Server Error\n${err}`)
                    }
                    

                })
                
            } catch(e) {
                res.statusCode = 500;
                console.error(e)
                res.end(`Internal Server Error\n${e}`)
            }
        });
    }
})

httpServer.listen(3000, () => {console.log("Server is now listening at PORT 3000")})
