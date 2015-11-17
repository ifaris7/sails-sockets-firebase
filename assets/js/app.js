
var now = new Date().getTime();

(function() {

    var myFirebaseRef = new Firebase("https://yamsaferio.firebaseio.com/search/en/cities/" + window.cityId + "/1448150400/1448323200");
    var hotels = [];

    myFirebaseRef.on("child_added", function(dataSnapshot) {
      var hotel = dataSnapshot.val();
      if (hotel.EOF) {
          console.log("Firebase on the client side: ", ((new Date().getTime() - now) / 1000));
          console.log(_.size(hotels));
          Firebase.goOffline();
          return true;
      }
      hotels.push(hotel);
  })
})();

(function() {
    var hotels = [];
    io.socket.get("/socket/" + window.cityId);
    io.socket.on('hotel-added', function(hotel) {

        if (hotel.EOF) {
            console.log("Firebase on MW + Socket.io: ", ((new Date().getTime() - now) / 1000));
            console.log(_.size(hotels));
            io.socket.disconnect();
            return true;
        }

        hotels.push(hotel);

    });
})();

// console.log(window.cityId);
// io.socket.on('hotel-added', function(hotel) {

//     if (hotel.EOF) {
//         console.log("Time till last hotel", ((new Date().getTime() - now) / 1000));
//         console.log(_.size(hotels));
//         io.socket.disconnect();
//         return true;
//     }

//     hotels.push(hotel);

// });

// var client = algoliasearch('1B2S8DRRHK', '43cbfe67b0a8136f2ca58ef9ea034cf8');
// var index = client.initIndex('suggestions');

// (function() {

//     var now = new Date().getTime();
//     var hotels = [];
//     var firbaseHotels = [];
//     var page = 0;
//     var unmatch = 0;

//     getAlgolia(page, null, onAlgoliaSuccess);

//     function onAlgoliaSuccess(content) {
//         hotels = hotels.concat(content.hits);
//         if (content.cursor) {
//             getAlgolia(++page, content.cursor, onAlgoliaSuccess);
//         } else {
//             hotels = _.indexBy(hotels, 'id');
//             io.socket.get("/socket");
//             io.socket.on('hotel-added', function(hotel) {

//                 if (hotel.EOF) {
//                     console.log("Time till last hotel",  ((new Date().getTime() - now) / 1000));
//                     console.log(_.size(hotels));
//                     console.log("UNMATCH", unmatch);
//                     return true;
//                 }

//                 if (!hotels[hotel.hotel_id]) unmatch++;

//             });

//         }

//     }
// })();

// function getAlgolia(page, cursor, callback) {

//     var q = {
//         "page": page,
//         "hitsPerPage": "2300",
//         "facetFilters": [
//             "parents.id:16120",
//             "type:Property",
//             "parents.name:Rome"
//         ]
//     };

//     if (cursor) q["cursor"] = cursor;

//     index.browse("", q).then(callback)
// }
