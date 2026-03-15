import Router from 'express';

const router = Router();

// Router GET
router.get('/', (req, res) =>{
    res.send('Vamos a crear una api en node');
});





export default router