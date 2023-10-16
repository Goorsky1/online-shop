class YourController {
    constructor(dao) {
        this.dao = dao;
    }

    // insertData(req, res) {
    //     const data = { name: 'x' };
    //     this.dao.insertData(data);
    //     res.send('Data inserted successfully');
    // }

    getAllData(req, res) {
        this.dao.getAllData((err, data) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error retrieving data');
            } else {
                console.log(data);
                res.json(data);
            }
        });
    }
}

module.exports = YourController;