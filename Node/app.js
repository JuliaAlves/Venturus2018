const express = require('express');
const app =express();
const port = 3000;
const bodyParser = require('body-parser');
let vagas = require('./config/vagas.js');
const Vaga = require('./model/vaga.js');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', async(req, res) => {
    return res.send('Hello Word!');
});

app.get('/vagas', async(req, res) => {
    try {
        return res.send(vagas);
    } catch (error){
        console.log(error.message);
    }
    
});

app.get('/vaga/:id', async(req, res) => {
    try {
        let id = req.params.id;
        let found = vagas.find(v => { return v.id === id;});
        
        if (found !== undefined)
            return res.send(found);

        return res.status(404).send('Not found');
    } catch (error){
        console.log(error.message);
    }
    
});

app.put('/altVaga/:id', async(req, res) => {

    try {
        
        let id = req.params.id;
        let found = vagas.find(v => { return v.id === id;});

        let vaga = createVaga(req.body);

        if (found !== undefined){
            vagas[vagas.indexOf(found)] = vaga;
            return res.send('Alterado');
        }

        return res.status(404).send('Not found');

    } catch (error){
        console.log(error.message);
    }
});

app.delete('/delVaga/:id', async(req, res) => {
    try {
        let vagasLenght = vagas.length;
        let id = req.params.id;
        let found = vagas.find(v => { return v.id === id;});

        if(found !== undefined){
            vagas.splice(vagas.indexOf(found), 1);
            if(vagas.length < vagasLenght) 
                return res.send('Deleted');
            
            return res.status(500).send('Internal error');
        }

        return res.status(404).send('Not found');
    } catch (error){
        console.log(error.message);
    }
    
});

app.post('/addVaga', async(req, res) =>{
    try{
        let vagasLenght = vagas.length;
        let vaga = createVaga(req.body);
        vagas.push(vaga);
        if(vagas.length > vagasLenght) 
            return res.send('Added');
        return res.status(500).send('Internal error');
    }catch(error){
        return res.status(500).send('Internal error');
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

const createVaga = (obj) => new Vaga(obj.id, obj.name, obj.description, obj.skills, obj.area, obj.differentials, obj.isPcd, obj.isActive);