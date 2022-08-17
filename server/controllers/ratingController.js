const {Rating, Device} = require('../models/models');
const jwt = require('jsonwebtoken');

class RatingController {
    async addRating(req, res) {
        try {
            const {rate, deviceId} = req.body;
            const token = req.headers.authorization.split(' ')[1];
            const user = jwt.verify(token, process.env.SECRET_KEY);
            await Rating.create({rate, deviceId, userId: user.id});

            let rating = await Rating.findAndCountAll({
                where: {
                    deviceId
                },
            });

            let allRating = 0;
            let middleRating;
            rating.rows.forEach(item => allRating += item.rate);
            middleRating = Number(allRating) / Number(rating.count);

            await Device.update(
                {rating: middleRating},
                {where: {id: deviceId}}
            );

            return res.json("Rating success added");
        } catch (e) {
            console.error(e);
        }
    }
}

module.exports = new RatingController();