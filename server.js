/********************************************************************************
* WEB322 – Assignment 04
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
*
* Name:Anurag Bhusal Student ID:164724221 Date:2024-02-14
*
* Published URL:https://web-assignment-3-fh3s.onrender.com/
*
********************************************************************************/
const express = require("express");
const path = require("path");
const app = express();
const port = 8080;

const legoData = require("./Modules/legoSets");

app.set('view engine', 'ejs');

legoData.initialize()
    .then(() => {
        app.use(express.static('public'));

        app.get('/', (req, res) => {
            res.render('home');
        });


        app.get('/about', (req, res) => {
            res.render('about');
        });

       
        app.get('/lego/sets', (req, res) => {
            const theme = req.query.theme;
            if(theme) {
                legoData.getSetsByTheme(theme)
                    .then(sets => res.json(sets))
                    .catch(error => res.status(404).send("Error: " + error.message));
            } else {
                legoData.getAllSets()
                    .then(allSets => res.json(allSets))
                    .catch(error => res.status(404).send("Error: " + error.message));
            }
        });

      
        app.get('/lego/sets/:id', (req, res) => {
            const setId = req.params.id;
            legoData.getSetByNum(setId)
                .then(set => {
                    if(set) {
                        res.render('set', { set });
                    } else {
                        res.status(404).send("Lego set not found");
                    }
                })
                .catch(error => res.status(404).send("Error: " + error.message));
        });
 
      
        app.use((req, res, next) => {
            res.status(404).render('404');
        });

        app.listen(port, () => {
            console.log(`Server is running on port http://localhost:${port}/`);
        });
    })
    .catch(error => {
        console.error("Failed to initialize Lego data:", error);
    });
