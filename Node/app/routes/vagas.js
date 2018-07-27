'use strict'

const Vaga = require('../../model/vaga.js');
const auth = require('../../config/security/tokenValidator');

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
            const docs = await vagasCollection.doc(req.params.id).get();
            if(docs.exists)
                return res.send(extractVaga(docs));
            
                
                return res.status(405).send('Not Found');

        } catch (error){
            return res.status(500).send(error.message);
        }        
    });

    app.put('/vagas/:id', auth, async(req, res, next) => {

        try {
            
            let id = req.params.id;
            const docs = await vagasCollection.doc(id).get();

            if (docs.exists){
                let ret = vagasCollection.doc(id).update(req.body);
                if(ret)
                    return res.send('Alterado');
                else 
                return res.status(500).send('Internal Error'); 
            }

            return res.status(404).send('Not found');

        } catch (error){
            return res.status(500).send(error.message);
        }
    });

    app.delete('/vagas/:id', auth, async(req, res, next) => {
        try{
            let id = req.params.id;
            const docs = await vagasCollection.doc(id).get();
            if (!docs.exists)
                return res.status(405).send('Not Found');

            const fbReturn = await vagasCollection.doc(id).delete();

            if (fbReturn)
                return res.send('Deleted');

            
            return res.status(500).send('Internal error');
        } catch (error){
            return res.status(500).send(error.message);
        }
        
    });

    app.post('/vagas', auth, async(req, res, next) =>{
            vagasCollection.add(req.body)
            .then( ref => {
                return res.send(ref.id);
	    })
            .catch(error =>{
            	return res.status(500).send(error.message);
            });
    });

    const extractVaga = (vaga) => {
        let v = vaga.data();
        return{
            id: vaga.id,
            name: v.name,
            description: v.description,
            salary: v.salary,
            skills: v.skills,
            area: v.area,
            differentials: v.differentials,
            isPcd: v.isPcd,
            isActive: v.isActive
        }
    };
    const createVaga = (obj) => new Vaga(obj.id, obj.name, obj.description, obj.salary,obj.skills, obj.area, obj.differentials, obj.isPcd, obj.isActive);
}