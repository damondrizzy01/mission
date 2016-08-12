var AWS = require("aws-sdk")
var _ = require('lodash')

var ec2 = new AWS.EC2({region: 'ap-south-1'});

ec2.describeInstances(function(err, data){
  if (err) {
    throw err
  }
  // console.log(data)

  // console.log(_.filter(data.Reservations , {Key:"Name"}))

  // var isInstance = _.find(data.Tags, {Key: 'role', Value: 'devenv'})
// console.log('------------',item)
    // return item.Key == "Name
  //
  data.Reservations.forEach(function(r, i) {
    // console.log(r)
    var tags = r.Instances[0].Tags;
    var isDevEnv = _.find(tags, {Key: 'name', Value: 'devenv'});
    var name = _.find(tags, {Key: "slack"})
console.log(name)

// var tagprefix = tags

    // console.log(_.filter(r, {KeyName:"devenv"}))
  })
})
