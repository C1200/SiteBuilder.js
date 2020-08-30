const readline = require('readline');
const process = require('process');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('What should I name the file?', fileName => {
    if (!fileName.endsWith('.html')) {
        console.log('Filename is not a .html file.');
        process.exit();
    }

    fs.appendFile(fileName, '<html>\n<head>\n', err => { if (err) console.log(err); });

    rl.question('What should the title be?', title => {
        fs.appendFile(fileName, `<title>${title}</title>\n</head>\n<body>\n<h2>${title}</h2>\n`, err => { if (err) console.log(err); });

        rl.question('What are the tags (seperated by a space)?', tags => {
            fs.appendFile(fileName, `<p>Tags: ${tags.split(' ')}</p>\n`, err => { if (err) console.log(err); });

            rl.question('What is the status?', status => {
                fs.appendFile(fileName, `<p>Status: ${status}</p>\n`, err => { if (err) console.log(err); });

                rl.question('What is the description?', desc => {
                    fs.appendFile(fileName, `<p>Description: ${desc}</p>`, err => { if (err) console.log(err); });

                    rl.question('Any links? (Y/n)', anyLinks => {
                        anyLinks = anyLinks.toLowerCase();
                        
                        if (anyLinks === 'y') {
                            rl.question('What links (seperated by a space)?', links => {
                                fs.appendFile(fileName, `<h4>Links:</h4>\n`, err => { if (err) console.log(err); });

                                links = links.split(' ');

                                links.forEach(element => {
                                    fs.appendFile(fileName, `<a href='${element}'>${element}</a><br>\n`, err => { if (err) console.log(err); });
                                });

                                fs.appendFile(fileName, `<p style='font-size: x-small;'>Made with <a href='https://C1200.github.io/projects/sitebuilder'>SiteBuilder.js</a>\n</body></html>`, err => { if (err) console.log(err); });
                                process.exit();
                            });
                        } else {
                            fs.appendFile(fileName, `<h4>Links:</h4>\n<p>None yet.</p>\n`, err => { if (err) console.log(err); });
                            fs.appendFile(fileName, `<p style='font-size: x-small;'>Made with <a href='https://C1200.github.io/projects/sitebuilder'>SiteBuilder.js</a>\n</body></html>`, err => { if (err) console.log(err); });
                            process.exit();
                        }
                    });
                });
            });
        });
    });
});