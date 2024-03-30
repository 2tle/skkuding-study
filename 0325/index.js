import http from 'http';
import fs from 'fs';
import { exec } from 'child_process';

const uuidv4= () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16 | 0, v=c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

const httpServer = http.createServer((req, res) => {
    if(req.method == "POST" && req.url == "/code") {
        let code = "";
        req.on('data', (data) => {code += data});
        req.on('end', async () => {
            try {
                const uid = uuidv4();
                fs.writeFileSync(`${uid}.py`, code);
                exec(`python ${uid}.py`, (err,stdout, stderr) => {
                    if(!err) {
                        res.setHeader('Content-Type', 'text/plain');
                        res.end(stdout)
                    } else {
                        res.statusCode = 500;
                        console.error(err)
                        res.end(`Internal Server Error\n${err}`)
                    }
                    exec(`rm -rf ${uid}.py`, (err,stdout,stderr) => {
                        
                    });

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
