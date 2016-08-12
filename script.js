var AWS = require("aws-sdk")
var _ = require('lodash')

var ec2 = new AWS.EC2({region: 'ap-south-1'});

ec2.describeInstances(function(err, data){
  if (err) {
    throw err
  }

  data.Reservations.forEach(function(r, i) {
    var tags = r.Instances[0].Tags;
    var isDevEnv = _.find(tags, {Key: 'role', Value: 'devenv'});
    var name = _.find(tags, {Key: "slack"})
console.log(data)


    if(isDevEnv) {
      var vid = r.Instances[0].BlockDeviceMappings[0].Ebs.VolumeId

      var params = {
        VolumeId: vid,
        Description: "devenv of " + name.Value
      }; console.log(data)
      // ec2.createSnapshot(params, function(err, data) {
      //   if (err) console.log(err, err.stack);
      //   else     console.log(data);
      // });
    // }
  })
})




// var validation_messages = {
//     "key_1": {
//     	"your_name": "jimmy",
//     	"your_msg": "hello world"
//     },
//     "key_2": {
//     	"your_name": "billy",
//     	"your_msg": "foo equals bar"
//     }
// }
//
// for (var key in validation_messages) {
//     // skip loop if the property is from prototype
//     if (!validation_messages.hasOwnProperty(key)) continue;
//
//     var obj = validation_messages[key];
//     for (var prop in obj) {
//         // skip loop if the property is from prototype
//         if(!obj.hasOwnProperty(prop)) continue;
//
//         // your code
//         console.log(prop + " = " + obj[prop]);
//     }
// }
