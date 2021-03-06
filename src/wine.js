const db = require('./services/db');
const { uuid } = require('uuidv4');

module.exports = {
    async getWines(req, res, next) {
        db.query('SELECT w.id, title, points, price, price_descount, country, province, region1, region2, description, designation, variety, winery, taster_name, taster_twitter FROM wines AS w JOIN wine_Location AS wl ON w.id = wl.id JOIN wine_data AS wd ON w.id = wd.id JOIN wine_taster AS wt ON w.id = wt.id;', [], async(err, results) => {
            if(err) return res.status(404).json({message: err})
            return res.json({data: results})  
        })
    },

    async qtdOfWines(req, res){
        db.query('SELECT count(*) from wines', [], async(err, results) => {
            if(err) return res.status(404).json({message: err})
            return res.json({data: results})  
        })
    },

    async qtdPerGrapes(req, res){
        db.query('SELECT variety, count(id) quantity from wine_data as w group by variety;', [], async(err, results) => {
            if(err) return res.status(404).json({message: err})
            return res.json({data: results})  
        })
    },

    async getWine(req, res) {
        const {id} = req.params;
        db.query('SELECT w.id, title, points, price, country, province, region1, region2, description, designation, variety, winery, taster_name, taster_twitter FROM wines AS w JOIN wine_Location AS wl ON w.id = wl.id JOIN wine_data AS wd ON w.id = wd.id JOIN wine_taster AS wt ON w.id = wt.id where w.id = ?;', [id], async(err, results) => {
            if(err) return res.status(404).json({message: err})
            return res.json({data: results})  
        })
    },

    async filterWine(req, res) {
        let {title} = req.params;
        title = '%' + title + '%'

        db.query('SELECT * FROM wines where title LIKE ?;', [title], async(err, results) => {
            if(err) return res.status(404).json({message: err});
            else{
                return res.json(results);
            }
        })
    },

    async postWine(req, res) {
        const {title, points,
               price, country, province, region1,
               region2, description, designation, variety,
               winery, taster_name, taster_twitter} = req.body;
        
        
        db.query('INSERT INTO wines (title, points, price, price_descount) VALUES( ?, ?, ?, ?)', [title, points, price, null], async(err, results) => {
            if(err) return res.status(404).json({message: err})
            else{
                
                db.query('INSERT INTO wine_location (country, province, region1, region2) VALUES( ?, ?, ?, ?);', [country, province, region1, region2], async(err, results) =>{
                    if(err) return res.status(404).json({message: err})
                    else {
                        db.query('INSERT INTO wine_data (description, designation, variety, winery) VALUES( ?, ?, ?, ?);', [description, designation, variety, winery],async(err, results) =>{
                            if(err) return res.status(404).json({message: err})
                            else{
                                db.query('INSERT INTO wine_taster (taster_name, taster_twitter) VALUES( ?, ?);', [taster_name, taster_twitter],async(err, results) =>{
                                    if(err) return res.status(404).json({message: err})
                                    else{
                                        return res.json({
                                            statusCode: 200,
                                            type: 'post',
                                            message: 'Created'
})}})}})}})}})},

    async deleteWine(req, res){
        const {id} = req.params;
        db.query('DELETE from wines where id = ?;', [id], async(err, results) => {
            if(err) return res.status(404).json({message: err});
            return res.json({data: results});
        })
    },

    async updateWine(req, res){
        console.log('Updating');
        const {id} = req.params;
        const {title, points, price, country, province, region1,
               region2, description, designation,
               variety, winery, taster_name, taster_twitter} = req.body;
        
        console.log(id);
        console.log(title);
        // db.query('update wines SET title = ?, points = ?, price = ? where id = ?;', [title, points, price, id], async(err, results)=>{
        //     if(err) return res.status(404).json({message: err});
        //     else return res.json(results);
        // })

        
        await  db.query('UPDATE wines SET title = ?, points = ?, price = ?, price_descount = ? where id = ?;', [title, points, price, (price * 0.9), id], async(err, results) => {
            if(err) return res.status(404).json({message: err})
            else{
                db.query('UPDATE wine_data SET description = ?, designation = ?, variety = ?, winery = ? where id = ?;', [description, designation, variety, winery, id], async(err, results) => {
                    if(err) return res.status(404).json({message: err})
                    else{
                        db.query('UPDATE wine_location SET country = ?, province = ?, region1 = ?, region2 = ? where id = ?;', [country, province, region1, region2, id], async(err, results) => {
                            if(err) return res.status(404).json({message: err})
                            else{
                                db.query('UPDATE wine_taster SET taster_name = ?, taster_twitter = ? where id = ?;', [taster_name, taster_twitter, id], async(err, results) => {
                                    if(err) return res.status(404).json({message: err})
                                    else {
                                        return res.json(results)
                                    } 

// , points, price,
//                country, province, region1,
//                region2, description, designation,
//                variety, winery, taster_name, taster_twitter
})}})}})}})}

} 