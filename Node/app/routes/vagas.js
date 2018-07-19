'use strict'

let vagas = require('../../config/vagas.js');
const Vaga = require('../../model/vaga.js');

module.exports = app =>{
    app.get('/vagas', async(req, res) => {
        try {
            return res.send(vagas);
        } catch (error){
            return res.status(500).send(error);
        }
        
    });

    app.get('/vagas/:id', async(req, res) => {
        try {
            let id = req.params.id;
            let found = vagas.find(v => { return v.id === id;});
            
            if (found !== undefined)
                return res.send(found);

            return res.status(404).send('Not found');
        } catch (error){
            return res.status(500).send(error);
        }
        
    });

    app.put('/vagas/:id', async(req, res) => {

        try {
            
            let id = req.params.id;
            let found = vagas.find(v => { return v.id === id;});

            if (found !== undefined){
                let index = vagas.indexOf(found);
                Object.keys(req.body).forEach(job => {
                    vagas[index][job] = req.body[job]
                })
                return res.send('Alterado');
            }

            return res.status(404).send('Not found');

        } catch (error){
            return res.status(500).send(error);
        }
    });

    app.delete('/vagas/:id', async(req, res) => {
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
            return res.status(500).send(error);
        }
        
    });

    app.post('/vagas', async(req, res) =>{
        try{
            let vagasLenght = vagas.length;
            let vaga = createVaga(req.body);
            vagas.push(vaga);
            if(vagas.length > vagasLenght) 
                return res.send('Added');
            return res.status(500).send('Internal error');
        }catch(error){
            return res.status(500).send(error);
        }
    });

    const createVaga = (obj) => new Vaga(obj.id, obj.name, obj.description, obj.skills, obj.area, obj.differentials, obj.isPcd, obj.isActive);
}