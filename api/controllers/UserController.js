/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var Firebase = require('firebase');

module.exports = {

    /**
     * `UserController.index()`
     */
    index: function(req, res) {

        return res.view("homepage", {
            id : req.param("id")
        });
        // var now = new Date().getTime();
        // var firstArrived = false;
        // var fbRef = new Firebase("https://yamsaferio.firebaseio.com/search/en/cities/" + req.param('id') + "/1448150400/1448323200");

        // fbRef.on('child_added', function(dataSnapshot) {

        //     sails.sockets.blast('hotel-added', {
        //         hotel : dataSnapshot.val()
        //     });

        //     if (!firstArrived) {
        //         firstArrived = true;
        //         console.log("now", ((new Date().getTime() - now) / 1000));
        //     }

        // });

        // console.log(sails.sockets.id());

        // res.end();
        // return res.json({
        //   todo: 'index() is not implemented yet!'
        // });
    },
    sucker: function(req, res) {

        if (!req.isSocket) return res.badRequest();

        var socketId = sails.sockets.id(req.socket);

        var fbRef = new Firebase("https://yamsaferio.firebaseio.com/search/en/cities/" + req.param("id") + "/1448150400/1448323200");
        fbRef.on("child_added", function(dataSnapshot) {
            sails.sockets.emit(socketId, 'hotel-added', dataSnapshot.val());
        })

        res.json({
            id : socketId
        })
    },

    /**
     * `UserController.show()`
     */
    show: function(req, res) {
        return res.json({
            todo: 'show() is not implemented yet!'
        });
    },

    /**
     * `UserController.edit()`
     */
    edit: function(req, res) {
        return res.json({
            todo: 'edit() is not implemented yet!'
        });
    },

    /**
     * `UserController.delete()`
     */
    delete: function(req, res) {
        return res.json({
            todo: 'delete() is not implemented yet!'
        });
    }
};
