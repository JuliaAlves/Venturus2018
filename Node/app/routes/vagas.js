'use strict'

const Vaga = require('../../model/vaga.js');

module.exports = app =>{
    const vagasCollection = app.config.firebaseConfig.collection('vagas');

    app.get('/vagas', async(req, res) => {
        try {
            const docs = await vagasCollection.get();
            let vagas = [];
            docs.forEach(doc => { vagas.push(extractVaga(doc)); })
            return res.send(vagas);
        } catch (error){
            return res.status(500).send(error.message);
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
            return res.status(500).send(error.message);
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
            return res.status(500).send(error.message);
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
            return res.status(500).send(error.message);
        }
        
    });

    app.post('/vagas', async(req, res) =>{
        try{
            let fbReturn = await vagasCollection.doc().set(req.body);
            if (fbReturn)
                return res.send('Sucess');
            else
                throw Error;

            
        }catch(error){
            return res.status(500).send(error.message);
        }
    });

    const extractVaga = (vaga) => {
        let v = vaga.data();
        return{
            id: vaga.id,
            name: v.name,
            description: v.description,
            skills: v.skills,
            area: v.area,
            differentials: v.differentials,
            isPcd: v.isPcd,
            isActive: v.isActive
        }
    };
    const createVaga = (obj) => new Vaga(obj.id, obj.name, obj.description, obj.skills, obj.area, obj.differentials, obj.isPcd, obj.isActive);
}