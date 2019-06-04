exports.login =  function(req, res, HOST){
    res.setHeader('Access-Control-Allow-Origin', 'http://'+ HOST + ':8080');
    res.setHeader('Access-Control-Allow-Credentials',true);
    res.setHeader("Access-Control-Allow-Methods","GET","POST");
    res.writeHead(200,{'Content-Type': 'application/json'});
    var data = '';
    req.on('data', (chunk) => {
        data += chunk;
    });
    req.on('end', () => {
        data = JSON.parse(data);
        if(data.password == '123') {
            res.end(JSON.stringify(1));
        } else {
            res.end('Password Mistake')
        }
    })
}
