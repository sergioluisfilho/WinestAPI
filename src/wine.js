const db = require('./services/db');

module.exports = {
    async getWines(req, res, next) {
        db.query('SELECT w.id, title, points, price, country, province, region1, region2, description, designation, variety, winery, taster_name, taster_twitter FROM wines AS w JOIN wine_Location AS wl ON w.id = wl.id JOIN wine_data AS wd ON w.id = wd.id JOIN wine_taster AS wt ON w.id = wt.id;', [], async(err, results) => {
            if(err) return res.status(404).json({message: err})
            return res.json({data: results})  
        })
    },

    async postWine(req, res) {
        const {id, title, points, price, country, province, region1, region2, description, designation, variety, winery, taster_name, taster_twitter} = req.body;
        
        await db.query('INSERT INTO wines VALUES(?, ?, ?, ?)', [id, title, points, price,], async(err, results) => {
            if(err) return res.status(404).json({message: err})
            else{
                
                db.query(' INSERT INTO wine_location VALUES(?, ?, ?, ?, ?);', [id, country, province, region1, region2], async(err, results) =>{
                    if(err) return res.status(404).json({message: err})
                    else {
                        db.query(' INSERT INTO wine_data VALUES(?, ?, ?, ?, ?);', [id, description, designation, variety, winery],async(err, results) =>{
                            if(err) return res.status(404).json({message: err})
                            else{
                                db.query(' INSERT INTO wine_taster VALUES(?, ?, ?);', [id, taster_name, taster_twitter],async(err, results) =>{
                                    if(err) return res.status(404).json({message: err})
                                    else{
                                        return res.json({
                                            statusCode: 200,
                                            type: 'post',
                                            message: 'Created'
})}})}})}})}})}}