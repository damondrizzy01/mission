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

    if(isDevEnv) {
      var vid = r.Instances[0].BlockDeviceMappings[0].Ebs.VolumeId

      var params = {
        VolumeId: vid,
        Description: "devenv of " + name.Value
      };
      ec2.createSnapshot(params, function(err, data) {
        if (err) console.log(err, err.stack);
        else     console.log(data);
      });
    }
  })
})
