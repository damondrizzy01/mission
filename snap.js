var AWS = require("aws-sdk")
var _ = require('lodash')

var ec2 = new AWS.EC2({region: 'ap-south-1'});

var userSnapshots = {}

function d(err, data) {
  var snapshots = data.Snapshots.filter(function(s,t) {
    return s.Description.startsWith('devenv of ');
  })


  snapshots.forEach(function(snapshot) {
    var user = snapshot.Description.split(' ').reverse()[0]

    if(!userSnapshots[user]){
      userSnapshots[user] = []
    }

    userSnapshots[user].push(snapshot);
  })

  _.forEach(userSnapshots, function(snapshots) {
    lastSnapshot = _.maxBy(snapshots, function (snapshot){
      return (new Date(snapshot.StartTime))
    })

    snapshots.forEach(function(snapshot){

      if(lastSnapshot.SnapshotId !== snapshot.SnapshotId) {

        //
        var params = {
          SnapshotId: snapshot.SnapshotId, /* required */

        };
        ec2.deleteSnapshot(params, function(err, data) {
          if (err) console.log(err, err.stack); // an error occurred
          else     console.log(data);           // successful response
        });
      }
    })
  })
}


ec2.describeSnapshots(d)




//
//
//
//
//
//
//
// ec2.describeInstances(function(err, data) {
//   if (err) {
//     throw err
//   }
//
//   data.Reservations.forEach(function(r, i) {
//     var tags = r.Instances[0].Tags;
//     var isDevEnv = _.find(tags, {Key: 'role', Value: 'devenv'});
//     var name = _.find(tags, {Key: "slack"})
//
//     if(isDevEnv) {
//       var vid = r.Instances[0].BlockDeviceMappings[0].Ebs.VolumeId
//
//       var params = {
//         VolumeId: vid,
//         Description: "devenv of " + name.Value
//       };
//       ec2.createSnapshot(params, function(err, data) {
//         if (err) console.log(err, err.stack);
//         else     console.log(data);
//       });
//     }
//   })
// })
