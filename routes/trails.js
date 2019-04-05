const express = require('express');
const router = express.Router();
const axios = require('axios')


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

module.exports = router;