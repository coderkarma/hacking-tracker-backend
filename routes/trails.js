const express = require('express');
const router = express.Router();
const axios = require('axios');
db = require('../models'),


    router.post('/add', (req, res) => {
        const user = res.locals.userData;
        if (!user) {
            res.status(401).json({});
            return
        }
        console.log(req.body)
        db.User.findById(res.locals.userData._id)
            .then((user) => {
                const trails = user.trails || [];
                trails.push(req.body.trail)
                console.log("********* here is the trails", trails)
                db.User.findOneAndUpdate({
                        _id: user._id
                    }, {
                        trails
                    },
                    (err, updatedUser) => {
                        if (err) {
                            console.log(err);
                        }
                        res.json(updatedUser);
                    }
                );
            })

    })

router.delete('/remove/:id', (req, res) => {
    const user = res.locals.userData;
    if (!user) {
        res.status(401).json({});
        return
    }
    console.log(req.body)
    db.User.findById(res.locals.userData._id)
        .then((user) => {
            let trails = user.trails || [];
            trails = trails.filter((trail) => {
                if (!trail) {
                    return false
                }
                return trail.id !== Number(req.params.id)
            })
            db.User.findOneAndUpdate({
                    _id: user._id
                }, {
                    trails
                },
                (err, updatedUser) => {
                    if (err) {
                        console.log(err);
                    }
                    res.json(updatedUser);
                }
            );
        })
})



/* GET users listing. */
router.get('/geolocation/:city', function (req, res, next) {
    let address = req.params.city;
    console.log(address)
    let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyAVaHMTuOSJrUzFISOWTUtJMiSXLh6BuwM`;
    console.log(url);

    axios.get(url)
        .then(response => {
            // console.log(response.data.results[0].geometry.location)
            let location = response.data.results[0].geometry;
            let lat = location.location.lat;
            let lng = location.location.lng;

            axios.get(
                `https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${lng}&maxDistance=10&key=200439239-c0f23da15aa93f591bfc0baf98024eeb`
            ).then(response => {
                console.log(response)
                res.json(response.data)
            }).catch(response => {
                res.json({
                    "message": "error encounter"
                })
            })
        })
        .catch(response => {
            res.json({
                "message": "error encounter"
            })
        })

});


router.get('/comments/:id', function (req, res, next) {
    db.Comment.find({
        trails_id: req.params.id
    }).populate('userId').exec((err, data) => {
        if (err) {
            res.json({
                "message": "error"
            })
        } else {
            res.json(data)
        }
    })
});

router.get('/details/:id', function (req, res, next) {
    let id = req.params.id;

    let url = `https://www.hikingproject.com/data/get-trails-by-id?ids=${id}&key=200439239-c0f23da15aa93f591bfc0baf98024eeb`;
    console.log(url);

    // 
    axios.get(url)
        .then(response => {
            // console.log(response.data.results[0].geometry.location)
            console.log("here is the response", response)
            res.json(response.data)

        })
        .catch(response => {
            res.json({
                "message": "error encounter"
            })
        })

});
module.exports = router;