'use strict';

var lightweight = angular.module('lightweight', [
'ngResource', 
'ngAnimate', 
'ngFileUpload',
'ngSanitize'
])
.service("lightweight_firebase", [
"$rootScope",
"$q",
"$timeout",
"$firebaseObject",
"$firebaseArray",
"$firebaseAuth",
"uuid",
"$http",
"$window",
"$location",
function(
$rootScope,
$q,
$timeout,
$firebaseObject,
$firebaseArray,
$firebaseAuth,
uuid,
$http,
$window,
$location){

    var realtimeDatabase = firebase.database();
    var firebaseStorage = firebase.storage();
    $rootScope.auth = $firebaseAuth();
    $rootScope.userslist = [];

    // Start Here
    this.media = {
        "image": {
            create: function(arg){
                var defer = $q.defer();
                var imagelist = [];
                angular.forEach(arg, function(file) {
                    var metadata = {};
                    metadata.name = file.name;
                    return new Promise(function (resolve, reject) {
                        var task = firebaseStorage.ref().child('media/images').child(file.name).put(file, metadata);
                        task.on('state_changed',
                            function progress(snapshot){
                                file.percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
                                file.filename = file.name;
                            },
                            function error(err){
                                $timeout(function(){
                                   $rootScope.$broadcast('server-event', {
                                        data:{
                                            message: file.name + " upload failed."
                                        }
                                    });
                                }, 500);
                            },
                            function complete(){
                                var obj = {};
                                obj.metadata = {};
                                var appended_cloud_source = "https://storage.googleapis.com/spsd-189118.appspot.com/media/images/"
                                obj.source = appended_cloud_source + task.snapshot.metadata.name;
                                file.source = obj.source;
                                if(file.tags) {obj.metadata.tags = file.tags};
                                obj.id = uuid.v4();

                                realtimeDatabase.ref().child('media/images').child(obj.id).set(obj)
                                .then(function(){
                                    realtimeDatabase.ref().child('media/images').once('value')
                                    .then(function(snapshot) {
                                        snapshot.forEach(function(childSnapshot) {
                                            var childKey = childSnapshot.key;
                                            var childData = childSnapshot.val();
                                            var childDataValue = childData;
                                            childDataValue.id = childKey;
                                            imagelist.push(childDataValue);
                                        }); 
                                    })
                                    .catch(function(error) {
                                        console.log(error);
                                        $timeout(function(){
                                            $rootScope.$broadcast('server-event', {
                                                data:{
                                                    message: "Error updating Media Vault. Please refresh."
                                                }
                                            });
                                        }, 500);
                                    });
                                }).catch(function(error) {
                                    $timeout(function(){
                                        $rootScope.$broadcast('server-event', {
                                            data:{
                                                message: "Error uploading image."
                                            }
                                        });
                                    }, 500);
                                });
                            }
                        );
                    });
                });
                defer.resolve(imagelist);
                $timeout(function(){
                   $rootScope.$broadcast('server-event', {
                        data:{
                            message: "Image uploaded"
                        }
                    });
                }, 500);
                return defer.promise;
            },
            read: function(){
               var defer = $q.defer();
                var imagelist = [];
                realtimeDatabase.ref().child('media/images')
                .once('value')
                .then(function(snapshot) {
                    snapshot.forEach(function(childSnapshot) {
                        var childKey = childSnapshot.key;
                        var childData = childSnapshot.val();
                        var childDataValue = childData;
                        childDataValue.id = childKey;
                        imagelist.push(childDataValue);
                        defer.resolve(imagelist);
                    });
                })
                .catch(function(error) {
                    console.log(error);
                });
                return defer.promise; 
            },
            update: function(arg){
                var imagelist = [];

                var validate_metadata = function(obj){
                    var value = "";
                    if(obj == null){
                        value = "";
                    } else {
                        value = obj;
                    }
                    return value;
                }

                arg.metadata.tags = validate_metadata(arg.metadata.tags);
                arg.metadata.cover = validate_metadata(arg.metadata.cover);
                arg.metadata.name = validate_metadata(arg.metadata.name);
                arg.metadata.description = validate_metadata(arg.metadata.description);

                var tags = arg.metadata.tags;
                var cover = arg.metadata.cover;
                var name = arg.metadata.name;
                var description = arg.metadata.description;

                var newMetadata = {
                    tags: tags,
                    cover: cover,
                    name: name,
                    description: description
                };

                realtimeDatabase.ref().child('media/images').child(arg.id).child("metadata").update(newMetadata, function(error){
                    if(error){
                        $timeout(function(){
                            $rootScope.$broadcast('server-event', {
                                data:{
                                    message: "Error updating image."
                                }
                            });
                        }, 500);
                    } else {
                        $timeout(function(){
                            $rootScope.$broadcast('server-event', {
                                data:{
                                    message: "Image updated."
                                }
                            });
                        }, 500);
                    }
                });
            },
            delete: function(arg){
                var image_source;
                var imagelist = [];
                
                image_source = arg.source.split('https://storage.googleapis.com/spsd-189118.appspot.com/media/images/').pop();
                
                firebaseStorage.ref().child('media/images').child('/' + image_source).delete()
                .then(function() {
                    $timeout(function(){
                        $rootScope.$broadcast('server-event', {
                            data:{
                                message: "Image removed from storage."
                            }
                        });
                    }, 500);
                }).catch(function(error) {
                    $timeout(function(){
                        $rootScope.$broadcast('server-event', {
                            data:{
                                message: "Error removing image from storage."
                            }
                        });
                    }, 500);
                });
            
                realtimeDatabase.ref().child('media/images').child(arg.id).remove()
                .then(function(){
                    realtimeDatabase.ref().child('media/images').once('value')
                    .then(function(snapshot) {
                        snapshot.forEach(function(childSnapshot) {
                            var childKey = childSnapshot.key;
                            var childData = childSnapshot.val();
                            var childDataValue = childData;
                            childDataValue.id = childKey;
                            imagelist.push(childDataValue);
                        });
                        $rootScope.imagelist = imagelist; 
                    });
                    $timeout(function(){
                        $rootScope.$broadcast('server-event', {
                            data:{
                                message: "Image removed from database."
                            }
                        });
                    }, 500);
                }).catch(function(error) {
                    $timeout(function(){
                        $rootScope.$broadcast('server-event', {
                            data:{
                                message: "Error removing image from database."
                            }
                        });
                    }, 500);
                });
            },
            download: function(arg){
                var image_source;
                if(arg.source){
                    image_source = arg.source.split('https://storage.googleapis.com/spsd-189118.appspot.com/media/images/').pop();
                    firebaseStorage.ref().child('media/images').child('/' + image_source).getDownloadURL()
                    .then(function(url){
                        var image_download = url;
                        $timeout(function(){
                            $rootScope.$broadcast('server-event', {
                                data:{
                                    message: "Image " + image_source + " downloaded."
                                }
                            });
                        },  500);
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
                } else if (arg.avatar){
                    image_source = arg.avatar.split('https://storage.googleapis.com/spsd-189118.appspot.com/media/images/').pop();
                    firebaseStorage.ref().child('media/images').child('/' + image_source).getDownloadURL()
                    .then(function(url){
                        var image_download = url;
                        $timeout(function(){
                            $rootScope.$broadcast('server-event', {
                                data:{
                                    message: "Image " + image_source + " downloaded."
                                }
                            });
                        },  500);
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
                }
            }
        },
        "video": {
            create: function(arg){
                var defer = $q.defer();
                var imagelist = [];
                angular.forEach(arg, function(file) {
                    var metadata = {};
                    metadata.name = file.name;
                    return new Promise(function (resolve, reject) {
                        var task = firebaseStorage.ref().child('media/videos').child(file.name).put(file, metadata);
                        task.on('state_changed',
                            function progress(snapshot){
                                file.percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
                                file.filename = file.name;
                            },
                            function error(err){
                                $timeout(function(){
                                   $rootScope.$broadcast('server-event', {
                                        data:{
                                            message: file.name + " upload failed."
                                        }
                                    });
                                }, 500);
                            },
                            function complete(){
                                var obj = {};
                                obj.metadata = {};
                                var appended_cloud_source = "https://storage.googleapis.com/spsd-189118.appspot.com/media/videos/"
                                obj.source = appended_cloud_source + task.snapshot.metadata.name;
                                file.source = obj.source;
                                if(file.tags) {obj.metadata.tags = file.tags};
                                obj.id = uuid.v4();

                                realtimeDatabase.ref().child('media/videos').child(obj.id).set(obj)
                                .then(function(){
                                    realtimeDatabase.ref().child('media/videos').once('value')
                                    .then(function(snapshot) {
                                        snapshot.forEach(function(childSnapshot) {
                                            var childKey = childSnapshot.key;
                                            var childData = childSnapshot.val();
                                            var childDataValue = childData;
                                            childDataValue.id = childKey;
                                            imagelist.push(childDataValue);
                                        }); 
                                    })
                                    .catch(function(error) {
                                        console.log(error);
                                        $timeout(function(){
                                            $rootScope.$broadcast('server-event', {
                                                data:{
                                                    message: "Error updating Media Vault. Please refresh."
                                                }
                                            });
                                        }, 500);
                                    });
                                }).catch(function(error) {
                                    $timeout(function(){
                                        $rootScope.$broadcast('server-event', {
                                            data:{
                                                message: "Error uploading video."
                                            }
                                        });
                                    }, 500);
                                });
                            }
                        );
                    });
                });
                defer.resolve(imagelist);
                $timeout(function(){
                   $rootScope.$broadcast('server-event', {
                        data:{
                            message: "Image uploaded"
                        }
                    });
                }, 500);
                return defer.promise;
            }
        },
        "tags": {
            update: function(arg){
                var tagsBucket = realtimeDatabase.ref().child('tags');
                var tagArray = $firebaseArray(tagsBucket);
                angular.forEach(arg, function(tag) {
                    return new Promise(function (resolve, reject) {
                        //Upload tag
                        var tagObj = {}
                        tagObj.tag = tag;
                        tagArray.$add(tagObj);
                        $rootScope.taglist.push(tagObj);
                    });
                });
                $timeout(function(){
                   $rootScope.$broadcast('server-event', {
                        data:{
                            message: "Tags added."
                        }
                    });
                }, 500);
            }
        },
        "files": {
            create: function(arg, argErr){
                var myFilesUpload = arg;
                var myErrFiles = argErr;
                angular.forEach(arg, function(file) {
                    var metadata = {};
                    metadata.name = file.name;
                    return new Promise(function (resolve, reject) {
                        var task = firebaseStorage.ref().child('media/files').child($rootScope.me.id + "/files/" + file.name).put(file, metadata);
                        task.on('state_changed',
                            function progress(snapshot){
                                file.percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
                            },
                            function error(err){
                                $timeout(function(){
                                   $rootScope.$broadcast('server-event', {
                                        data:{
                                            message: "Your upload failed."
                                        }
                                    });
                                }, 500);
                            },
                            function complete(){
                                var obj = {};
                                obj.metadata = {};
                                var appended_cloud_source = "https://storage.googleapis.com/spsd-189118.appspot.com/media/files/" + $rootScope.me.id + "/files/"
                                obj.source = appended_cloud_source + task.snapshot.metadata.name;
                                obj.id = uuid.v4();
                                file.link = obj.source;
                                obj.name = task.snapshot.metadata.name;
                                obj.modified = new Date();
                                $rootScope.$broadcast('server-event', {
                                    data:{
                                        message: "File(s) Added"
                                    }
                                });
                                realtimeDatabase.ref().child('users').child($rootScope.me.id + "/files/" + obj.id).set(obj)
                                .then(function(){
                                    realtimeDatabase.ref().child('users').child($rootScope.me.id).child("files")
                                    .once("value")
                                    .then(function(snapshot){
                                        $rootScope.me.files = snapshot.val();
                                        $rootScope.$apply();
                                        resolve();
                                    }).catch(function(error){
                                        $timeout(function(){
                                            $rootScope.$broadcast('server-event', {
                                                data:{
                                                    message: "Something\'s wrong."
                                                }
                                            });
                                        }, 500);
                                        reject();
                                    });
                                }).catch(function(error) {
                                    $timeout(function(){
                                        $rootScope.$broadcast('server-event', {
                                            data:{
                                                message: "Something\'s wrong."
                                            }
                                        });
                                    }, 500);
                                    reject();
                                });
                            }
                        );
                    });
                });
            },
            delete: function(arg, argFile){
                realtimeDatabase.ref().child('users').child(arg.id).child("files/" + argFile.id).remove()
                .then(function(){
                    realtimeDatabase.ref().child('users').child(arg.id).child("files")
                    .once("value")
                    .then(function(snapshot){
                        var taskSnapshot = snapshot.val();
                        $rootScope.me.files = taskSnapshot;
                        $timeout(function(){
                            $rootScope.$broadcast('server-event', {
                                data:{
                                    message: "File deleted"
                                }
                            });
                        }, 500);
                    });
                }).catch(function(error) {
                    $timeout(function(){
                        $rootScope.$broadcast('server-event', {
                            data:{
                                message: "Error deleting file"
                            }
                        });
                    }, 500);
                });
            },
            share: function(){

            }
        },
        "iframe": {
            create: function(arg, argIframe){
                argIframe.id = uuid.v4();
                argIframe.link = "/resources/" + argIframe.id;
                // Write cloud function to handle each user in the id and send notification and emails
                // arg.share comes with user ID's to share resource with
                // an http xhr request should be made here to api
                realtimeDatabase.ref().child('users').child($rootScope.me.id + "/files/").child(argIframe.id).set(argIframe)
                .then(function(){
                    $rootScope.$broadcast('server-event', {
                        data:{
                            message: "Resource added"
                        }
                    });
                }).catch(function(error) {
                    $timeout(function(){
                        $rootScope.$broadcast('server-event', {
                            data:{
                                message: "Error adding resource"
                            }
                        });
                    }, 500);
                });
            },
            read: function(){

            },
            update: function(){

            },
            delete: function(){

            },
            share: function(){

            }
        },
        "gallery": {
            create: function(arg){
                // trim titles to become urls
                var trim_title = function(title){
                    var newURL = title.trim().toLowerCase().replace(/ /g,'-').replace(/[-]+/g, '-').replace(/[^\w-]+/g,'');
                    return newURL;
                }
                // trim titles to become urls    
                var newGalleryIndex = 0;     
                var newGallery = {};
                newGallery.name = arg.name;
                newGallery.description = arg.description;
                newGallery.url = trim_title(arg.name);
                newGallery.featured = arg.featured;
                newGallery.transition = (arg.transition ? arg.transition : 0);
                newGallery.tag = arg.name;
                newGallery.id = uuid.v4();
                // tags
                var tagObj = {}
                tagObj.tag = arg.name;
                var tagsBucket = realtimeDatabase.ref().child('tags');
                $firebaseArray(tagsBucket).$add(tagObj);
                $rootScope.taglist.push(tagObj);
                // tags
                $rootScope.galleries.splice(newGalleryIndex, 1);
                newGalleryIndex = null;
                realtimeDatabase.ref().child('galleries').child(newGallery.id).set(newGallery, function(error){
                    if(error){
                        $rootScope.$broadcast('server-event', {
                            data:{
                                message: "Error adding gallery."
                            }
                        });
                    } else {
                        realtimeDatabase.ref().child('galleries').once("value")
                        .then(function(snapshot){
                            $rootScope.galleries = snapshot.val();
                            $rootScope.new_gallery = false;
                            $timeout(function(){
                               $rootScope.$broadcast('server-event', {
                                    data:{
                                        message: "New gallery added."
                                    }
                                });
                            }, 500);
                        })
                        .catch(function(error){
                            $rootScope.$broadcast('server-event', {
                                data:{
                                    message: "Error retrieving galleries."
                                }
                            });
                        });
                    }
                });
            },
            update: function(arg){
                var updatedGallery = {};
                updatedGallery.description = arg.description;
                updatedGallery.featured = arg.featured;
                updatedGallery.transition = (arg.transition ? arg.transition : 0);
                updatedGallery.id = arg.id
                realtimeDatabase.ref().child('galleries').child(arg.id).update(updatedGallery, function(error){
                    if(error){
                        $rootScope.$broadcast('server-event', {
                            data:{
                                message: "Error updating gallery."
                            }
                        });
                    } else {
                        realtimeDatabase.ref().child('galleries').child(arg.id).once("value")
                        .then(function(snapshot){
                            $rootScope.galleries[arg.id] = snapshot.val();
                            $timeout(function(){
                               $rootScope.$broadcast('server-event', {
                                    data:{
                                        message: "Gallery updated."
                                    }
                                });
                            }, 500);
                        })
                        .catch(function(error){
                            $timeout(function(){
                               $rootScope.$broadcast('server-event', {
                                    data:{
                                        message: "Error retrieving updated gallery."
                                    }
                                });
                            }, 500);
                        });
                    }
                });
            },
            reorder: function(arg){
                var galleriesList = {};
                var newID = 0;
                angular.forEach(arg, function(value, key){
                    galleriesList[newID] = value;
                    galleriesList[newID].id = newID;
                    galleriesList[newID].key = newID;
                    newID++;
                });
                var data = angular.toJson(galleriesList);
                var update = JSON.parse(data);        
                realtimeDatabase.ref().child('galleries').set(update, function(error){
                    if(error){
                        $rootScope.$broadcast('server-event', {
                            data:{
                                message: "Error reordering galleries."
                            }
                        });
                    } else {
                        realtimeDatabase.ref().child('galleries').once("value")
                        .then(function(snapshot){
                            $rootScope.galleries = snapshot.val();
                            $timeout(function(){
                               $rootScope.$broadcast('server-event', {
                                    data:{
                                        message: "Gallery reordered."
                                    }
                                });
                            }, 500);
                        })
                        .catch(function(error){
                            $rootScope.$broadcast('server-event', {
                                data:{
                                    message: "Error retrieving galleries."
                                }
                            });
                        });
                    }
                });
            }
        }
    }

    this.users = {
        create: function(arg){
            var userslist = [];
            var data = {
                address : {
                    city : arg.address.city,
                    state : arg.address.state,
                    street : arg.address.street,
                    zipcode : arg.address.zipcode
                },
                birthday : arg.birthday,
                firstname : arg.firstname,
                lastname : arg.lastname,
                phone : arg.phone,
                email : arg.email,
                security : {
                    roles : arg.security.roles
                },
                permissions : {
                    email : true,
                    notifications : true
                },
                sender : $rootScope.me.token
            };
            $http({
                url: ("https://us-central1-spsd-189118.cloudfunctions.net/addUser"),
                method: 'POST',
                data: data
            })
            .then(function(response) {
                $rootScope.messageStatus = true;
                $timeout(function(){
                   $rootScope.$broadcast('server-event', {
                        data:{
                            message: "User added."
                        }
                    });
                }, 500);
                realtimeDatabase.ref().child('users').once("value")
                .then(function(snapshot) {
                    snapshot.forEach(function(childSnapshot) {
                        var childKey = childSnapshot.key;
                        var childData = childSnapshot.val();
                        childData.id = childKey;
                        userslist.push(childData);
                    });
                    $rootScope.userslist = userslist;
                    $rootScope.messageStatus = true;
                    $timeout(function(){
                       $rootScope.$broadcast('server-event', {
                            data:{
                                message: "Users list synced"
                            }
                        });
                    }, 1000);
                })
                .catch(function(error){
                    $timeout(function(){
                        $rootScope.$broadcast('server-event', {
                            data:{
                                message: 'User\'s list out of sync'
                            }
                        });
                    }, 500);
                });
            })
            .catch(function(response){
                $timeout(function(){
                    $rootScope.$broadcast('server-event', {
                        data:{
                            message: 'Registration failed ' + response.data
                        }
                    });
                }, 500);
            });
        },
        read: function(){
            var defer = $q.defer();
            var userslist = [];
            realtimeDatabase.ref().child('users')
            .once('value')
            .then(function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    var childKey = childSnapshot.key;
                    var childData = childSnapshot.val();
                    childData.id = childKey;
                    userslist.push(childData);
                });
                defer.resolve(userslist);
            }).catch(function(error) {
                console.log("Insufficient Permissions");
                defer.reject();
            });
            return defer.promise;
        },
        "self": {
            read: function(){
                var defer = $q.defer();
                var user = {};
                realtimeDatabase.ref().child('users').child(arg).once('value')
                .then(function(snapshot) {
                    var childData = snapshot.val();
                    childData.id = arg;
                    defer.resolve(childData); 
                })
                .catch(function(error){
                    $timeout(function(){
                        $rootScope.$broadcast('server-event', {
                            data:{
                                message: "Something\'s wrong."
                            }
                        });
                    }, 500);
                });
                return defer.promise;
            },
            update: function(arg){
                var data = angular.toJson(arg);
                var update = JSON.parse(data);
                realtimeDatabase.ref().child('users').child($rootScope.me.id).update(update)
                .then(function(){
                    realtimeDatabase.ref().child('users').child($rootScope.me.id).once("value")
                    .then(function(snapshot) {
                        $rootScope.userslist[$rootScope.me.id] = snapshot.val();
                        $timeout(function(){
                           $rootScope.$broadcast('server-event', {
                                data:{
                                    message: "Account updated."
                                }
                            });
                        }, 500);
                    })
                    .catch(function(error){
                        $timeout(function(){
                            $rootScope.$broadcast('server-event', {
                                data:{
                                    message: "Something\'s wrong."
                                }
                            });
                        }, 500);
                    });
                }).catch(function(error) {
                    $timeout(function(){
                        $rootScope.$broadcast('server-event', {
                            data:{
                                message: "Failed to update account."
                            }
                        });
                    }, 500);
                });
            }
        },
        signup: function(arg){
            $rootScope.progressAnimation = true;
            var e = {};
            var userslist = [];
            var data = {
                recaptcha : arg.recaptcha,
                email : arg.email,
                permissions : {
                    emails : true,
                    notifications : false
                },
                ip: $rootScope.ip_for_events,
                clickpath: $rootScope.clickpath
            };
            $http({
                url: ("https://us-central1-spsd-189118.cloudfunctions.net/signup"),
                method: 'POST',
                data: data
            })
            .then(function(response) {
                $rootScope.messageStatus = true;
                $timeout(function(){
                   $rootScope.$broadcast('server-event', {
                        data:{
                            message: response.data
                        }
                    });
                   $rootScope.progressAnimation = false;
                   $location.path('/login');
                }, 500);
            })
            .catch(function(response) {
                $rootScope.messageStatus = false;
                $rootScope.progressAnimation = false;
                $rootScope.$broadcast('server-event', {
                    data:{
                     message: response.data
                    }
                });
            });
        },
        update: function(arg){
            var data = angular.toJson(arg);
            var update = JSON.parse(data);
            realtimeDatabase.ref().child('users').child(arg.id).update(update)
            .then(function(){
                realtimeDatabase.ref().child('users').child(arg.id)
                .once("value")
                .then(function(snapshot) {
                    $rootScope.userslist[arg.id] = snapshot.val();
                    $timeout(function(){
                       $rootScope.$broadcast('server-event', {
                            data:{
                                message: "User updated."
                            }
                        });
                    }, 500);
                })
                .catch(function(error) {
                    $rootScope.messageStatus = false;
                    $rootScope.$broadcast('server-event', {
                        data:{
                         message: 'Error updating user.'
                        }
                    });
                });
            })
            .catch(function(error) {
                $rootScope.messageStatus = false;
                $rootScope.$broadcast('server-event', {
                    data:{
                     message: 'Failed to update user ' + response.data
                    }
                });
            });
        },
        delete: function(arg){
            var userslist = [];   
            var data = {
                sender : $rootScope.me.token,
                id: arg.id,
                email: arg.email
            };
            $http({
                url: ("https://us-central1-spsd-189118.cloudfunctions.net/deleteUser"),
                method: 'POST',
                data: data
            })
            .then(function(response) {
                realtimeDatabase.ref().child('users').once("value")
                .then(function(snapshot) {
                    snapshot.forEach(function(childSnapshot) {
                        var childKey = childSnapshot.key;
                        var childData = childSnapshot.val();
                        childData.id = childKey;
                        userslist.push(childData);
                    });
                    $rootScope.userslist = userslist;
                    $rootScope.messageStatus = true;
                    $timeout(function(){
                       $rootScope.$broadcast('server-event', {
                            data:{
                                message: "User deleted"
                            }
                        });
                    }, 500);
                });
            }).catch(function(error) {
                $rootScope.messageStatus = false;
                $rootScope.$broadcast('server-event', {
                    data:{
                     message: 'Failed to delete user. ' + response.data
                    }
                });
            });
        },
        "reset": {
            password: function(arg){
                $rootScope.progressAnimation = true;  
                var data = {
                    recaptcha : arg.recaptcha,
                    password : arg.resetPassword,
                    uid: $rootScope.me.id
                };

                $http({
                    url: ("https://us-central1-spsd-189118.cloudfunctions.net/resetPassword"),
                    method: 'POST',
                    data: data
                })
                .then(function(response) {
                    $timeout(function(){
                        $rootScope.progressAnimation = false;
                        $rootScope.$broadcast('server-event', {
                            data:{
                                message: "Password updated."
                            }
                        });
                    }, 500);
                })
                .catch(function(response){
                    $rootScope.progressAnimation = false;
                    $rootScope.$broadcast('server-event', {
                        data:{
                            message: response.data
                        }
                    });
                });
            },
            email: function(arg){
                $rootScope.progressAnimation = true;
                var data = {
                    recaptcha : arg.recaptcha,
                    email : arg.resetEmail,
                    uid: $rootScope.me.id
                };
                $http({
                    url: ("https://us-central1-spsd-189118.cloudfunctions.net/updateEmail"),
                    method: 'POST',
                    data: data
                })
                .then(function(response) {
                    $rootScope.auth.$signOut();
                    $timeout(function(){
                        $location.path("/login");
                        $rootScope.$broadcast('server-event', {
                            data:{
                                message: "Email address updated."
                            }
                        });
                    }, 500);
                })
                .catch(function(response){
                    $rootScope.progressAnimation = false;
                    $rootScope.$broadcast('server-event', {
                        data:{
                            message: response.data
                        }
                    });
                });
            }
        }
        recover: function(arg){
            $rootScope.progressAnimation = true;
            if(arg.init == true){
                var e = {};
                var userslist = [];
                var data = {
                    recaptcha : arg.recaptcha,
                    email : arg.email,
                    ip: $rootScope.ip_for_events,
                    clickpath: $rootScope.clickpath
                };
                $http({
                    url: ("https://us-central1-spsd-189118.cloudfunctions.net/recover"),
                    method: 'POST',
                    data: data
                })
                .then(function(response) {
                    $rootScope.messageStatus = true;
                    $rootScope.recovery = response.recovery;
                    $timeout(function(){
                       $rootScope.$broadcast('server-event', {
                            data:{
                                message: response.data
                            }
                        });
                       $rootScope.progressAnimation = false;
                    }, 500);
                })
                .catch(function(response) {
                    $rootScope.messageStatus = false;
                    $rootScope.progressAnimation = false;
                    $rootScope.$broadcast('server-event', {
                        data:{
                         message: response.data
                        }
                    });
                });
            } else {
                var data = {
                    recaptcha : arg.recaptcha,
                    answers : arg.answers,
                    ip: $rootScope.ip_for_events,
                    clickpath: $rootScope.clickpath
                };
                $http({
                    url: ("https://us-central1-spsd-189118.cloudfunctions.net/recover"),
                    method: 'POST',
                    data: data
                })
                .then(function(response) {
                    if(response.result == "success"){
                        $rootScope.messageStatus = true;
                        $rootScope.recovery = response.recovery;
                        $timeout(function(){
                           $rootScope.$broadcast('server-event', {
                                data:{
                                    message: response.data
                                }
                            });
                           $rootScope.progressAnimation = false;
                        }, 500);
                    } else {

                    }
                })
                .catch(function(response) {
                    $rootScope.messageStatus = false;
                    $rootScope.progressAnimation = false;
                    $rootScope.$broadcast('server-event', {
                        data:{
                         message: response.data
                        }
                    });
                });
            }   
        },
        "roles": {
            read: function(){
                var defer = $q.defer();
                var rolelist = [];
                realtimeDatabase.ref().child('roles').once('value')
                .then(function(snapshot) {
                    snapshot.forEach(function(childSnapshot) {
                        var childKey = childSnapshot.key;
                        var childData = childSnapshot.val();
                        var childDataValue = {};
                        childDataValue.id = childKey;
                        childDataValue.role = childData;
                        rolelist.push(childDataValue);
                    });
                    defer.resolve(rolelist); 
                })
                .catch(function(error){
                    $rootScope.$broadcast('server-event', {
                        data:{
                            message: "Error retrieving roles"
                        }
                    });
                    defer.reject(false);
                });
                return defer.promise;
            }
        },
        permissions: function(){

        }
    }

    this.content = {
        "app": {
            update: function(arg){
                var index_content = arg.settings.configs.index_content;
                var save_path;
                if (index_content){
                    save_path = "index/" + arg.settings.configs.contentId;
                } else {
                    save_path = arg.settings.configs.contentId;
                }
                var data = angular.toJson($rootScope[arg.settings.configs.contentId]);
                var update = JSON.parse(data);
                realtimeDatabase.ref().child('data').child(save_path).set(update, function(error){
                    if(error){
                        $timeout(function(){
                           $rootScope.$broadcast('server-event', {
                                data:{
                                    message: "Error updating content."
                                }
                            });
                        }, 500);
                    } else {
                        $timeout(function(){
                           $rootScope.$broadcast('server-event', {
                                data:{
                                    message: "Content updated."
                                }
                            });
                        }, 500);
                    }
                });
            }
        },
        "pages": {
            create: function(arg, argData){
                // trim titles to become urls
                var trim_title = function(title){
                    var newURL = title.trim().toLowerCase().replace(/ /g,'-').replace(/[-]+/g, '-').replace(/[^\w-]+/g,'');
                    return newURL;
                }
                // trim titles to become urls

                var tagsBucket = realtimeDatabase.ref().child('tags');
                var tagArray = $firebaseArray(tagsBucket);

                // configure data structure
                var new_page_data = {};
                new_page_data.data = {};
                new_page_data.data.page = {};
                new_page_data.data.page.foreground = {};
                new_page_data.data.page.foreground.images = {};
                new_page_data.data.page.background = {};
                new_page_data.data.page.background.images = {};
                new_page_data.data.page.contents = [];
                if (arg == 'explore'){
                    new_page_data.data.page.contents[0].items = [];
                }
                new_page_data.settings = {};
                new_page_data.settings.configs = {};
                // configure data structure

                // mock content
                var paragraphObj = {};
                paragraphObj.data = "It started with a paragraph...";
                paragraphObj.type = "text";

                var imageObj = {};
                imageObj.source = "https://storage.googleapis.com/spsd-189118.appspot.com/media/images/missing-image-wide.png";

                switch(arg){
                    case "info":
                        new_page_data.data.title = argData.title;
                        new_page_data.data.page.foreground.images.source = imageObj.source;
                        new_page_data.data.page.contents.push(paragraphObj);
                        new_page_data.settings.url = "/info/" + trim_title(argData.title);
                        new_page_data.settings.page_type = "info";
                        new_page_data.settings.name = argData.title;
                        new_page_data.settings.locked = false;
                        new_page_data.settings.configs.add_content = true;
                        new_page_data.settings.configs.contentId = "pages";
                        new_page_data.settings.configs.has_title_subtitle = false;
                        new_page_data.settings.configs.index_content = false;
                        new_page_data.settings.configs.multiview = false;
                        new_page_data.settings.configs.mulitview_label = "column";
                        new_page_data.settings.configs.primary_image = true;
                        new_page_data.settings.configs.reorder_content = true;
                        new_page_data.settings.configs.title_view = false;
                        $rootScope.pages.push(new_page_data);
                        var data = angular.toJson($rootScope.pages);
                        var update = JSON.parse(data);
                        realtimeDatabase.ref().child('data').child("pages").set(update, function(error){
                            if(error){
                                $timeout(function(){
                                    $rootScope.$broadcast('server-event', {
                                        data:{
                                            message: "Error adding page."
                                        }
                                    });
                                }, 500);
                            } else {
                                $timeout(function(){
                                    $rootScope.$broadcast('server-event', {
                                        data:{
                                            message: "Page added."
                                        }
                                    });
                                }, 500);
                            }
                        });
                        
                        break;
                    case "announcement":
                        new_page_data.data.title = argData.title;
                        new_page_data.data.page.contents.push(paragraphObj);
                        new_page_data.settings.url = "/announcement/" + trim_title(argData.title);
                        new_page_data.settings.page_type = "announcement";
                        new_page_data.settings.name = argData.title;
                        new_page_data.settings.locked = false;
                        new_page_data.settings.configs.add_content = true;
                        new_page_data.settings.configs.contentId = "pages";
                        new_page_data.settings.configs.has_title_subtitle = false;
                        new_page_data.settings.configs.index_content = false;
                        new_page_data.settings.configs.multiview = false;
                        new_page_data.settings.configs.mulitview_label = "column";
                        new_page_data.settings.configs.primary_image = false;
                        new_page_data.settings.configs.reorder_content = true;
                        new_page_data.settings.configs.title_view = false;
                        $rootScope.pages.push(new_page_data);
                        var data = angular.toJson($rootScope.pages);
                        var update = JSON.parse(data);
                        realtimeDatabase.ref().child('data').child("pages").set(update, function(error){
                            if(error){
                                $timeout(function(){
                                    $rootScope.$broadcast('server-event', {
                                        data:{
                                            message: "Error adding page."
                                        }
                                    });
                                }, 500);
                            } else {
                                $timeout(function(){
                                    $rootScope.$broadcast('server-event', {
                                        data:{
                                            message: "Page added."
                                        }
                                    });
                                }, 500);
                            }
                        });
                        break;
                    case "spotlight":
                        new_page_data.data.title = argData.title;
                        new_page_data.data.page.background.images.source = imageObj.source;
                        new_page_data.data.page.contents.push(paragraphObj);
                        new_page_data.settings.url = "/spotlight/" + trim_title(argData.title);
                        new_page_data.settings.page_type = "spotlight";
                        new_page_data.settings.name = argData.title;
                        new_page_data.settings.locked = false;
                        new_page_data.settings.configs.add_content = true;
                        new_page_data.settings.configs.contentId = "pages";
                        new_page_data.settings.configs.has_title_subtitle = false;
                        new_page_data.settings.configs.index_content = false;
                        new_page_data.settings.configs.multiview = false;
                        new_page_data.settings.configs.mulitview_label = "column";
                        new_page_data.settings.configs.primary_image = true;
                        new_page_data.settings.configs.reorder_content = true;
                        new_page_data.settings.configs.title_view = false;
                        $rootScope.pages.push(new_page_data);
                        var data = angular.toJson($rootScope.pages);
                        var update = JSON.parse(data);
                        realtimeDatabase.ref().child('data').child("pages").set(update, function(error){
                            if(error){
                                $timeout(function(){
                                    $rootScope.$broadcast('server-event', {
                                        data:{
                                            message: "Error adding page."
                                        }
                                    });
                                }, 500);
                            } else {
                                $timeout(function(){
                                    $rootScope.$broadcast('server-event', {
                                        data:{
                                            message: "Page added."
                                        }
                                    });
                                }, 500);
                            }
                        });
                        break;
                    case "blog":
                        new_page_data.data.title = argData.title;
                        new_page_data.data.subtitle = argData.subtitle;
                        new_page_data.data.headline = argData.headline;
                        new_page_data.data.author = $rootScope.me.firstname + " " + $rootScope.me.lastname;
                        new_page_data.data.date = new Date();
                        new_page_data.data.page.background.images.source = imageObj.source;
                        new_page_data.data.page.contents.push(paragraphObj);
                        new_page_data.settings.url = "/blog/" + trim_title(argData.title);
                        new_page_data.settings.page_type = "blog";
                        new_page_data.settings.name = argData.title;
                        new_page_data.settings.locked = false;
                        new_page_data.settings.configs.add_content = true;
                        new_page_data.settings.configs.contentId = "pages";
                        new_page_data.settings.configs.has_title_subtitle = true;
                        new_page_data.settings.configs.index_content = false;
                        new_page_data.settings.configs.multiview = false;
                        new_page_data.settings.configs.mulitview_label = "Section";
                        new_page_data.settings.configs.primary_image = false;
                        new_page_data.settings.configs.reorder_content = true;
                        new_page_data.settings.configs.title_view = false;
                        $rootScope.pages.push(new_page_data);
                        var data = angular.toJson($rootScope.pages);
                        var update = JSON.parse(data);
                        realtimeDatabase.ref().child('data').child("pages").set(update, function(error){
                            if(error){
                                $timeout(function(){
                                    $rootScope.$broadcast('server-event', {
                                        data:{
                                            message: "Error adding page."
                                        }
                                    });
                                }, 500);
                            } else {
                                $timeout(function(){
                                    $rootScope.$broadcast('server-event', {
                                        data:{
                                            message: "Page added."
                                        }
                                    });
                                }, 500);
                            }
                        });
                        break;
                    case "project":
                        new_page_data.data.title = argData.title;
                        var tagObj = {}
                        tagObj.tag = data.title;
                        var task = tagArray.$add(tagObj);
                        $rootScope.taglist.push(tagObj);
                        new_page_data.data.tag = argData.tag;
                        new_page_data.data.description = argData.description;
                        new_page_data.data.page.foreground.images.source = imageObj.source;
                        new_page_data.data.page.contents.push(paragraphObj);
                        new_page_data.settings.url = "/projects/" + trim_title(argData.title);
                        new_page_data.settings.page_type = "project";
                        new_page_data.settings.name = data.title;
                        new_page_data.settings.locked = false;
                        new_page_data.settings.configs.add_content = true;
                        new_page_data.settings.configs.contentId = "pages";
                        new_page_data.settings.configs.has_title_subtitle = false;
                        new_page_data.settings.configs.index_content = false;
                        new_page_data.settings.configs.multiview = false;
                        new_page_data.settings.configs.mulitview_label = "Section";
                        new_page_data.settings.configs.primary_image = true;
                        new_page_data.settings.configs.reorder_content = true;
                        new_page_data.settings.configs.title_view = false;
                        $rootScope.pages.push(new_page_data);
                        var data = angular.toJson($rootScope.pages);
                        var update = JSON.parse(data);
                        realtimeDatabase.ref().child('data').child("pages").set(update, function(error){
                            if(error){
                                $timeout(function(){
                                    $rootScope.$broadcast('server-event', {
                                        data:{
                                            message: "Error adding page."
                                        }
                                    });
                                }, 500);
                            } else {
                                $timeout(function(){
                                    $rootScope.$broadcast('server-event', {
                                        data:{
                                            message: "Page added."
                                        }
                                    });
                                }, 500);
                            }
                        });
                        break;
                    case "explore":
                        new_page_data.data.title = argData.title;
                        new_page_data.data.page.contents[0].items.push(paragraphObj);
                        new_page_data.settings.url = "/explore/" + trim_title(argData.title);
                        new_page_data.data.page.tabs.push("New Tab");
                        new_page_data.settings.page_type = "explore";
                        new_page_data.settings.name = argData.title;
                        new_page_data.settings.locked = false;
                        new_page_data.settings.configs.add_content = true;
                        new_page_data.settings.configs.contentId = "pages";
                        new_page_data.settings.configs.has_title_subtitle = false;
                        new_page_data.settings.configs.index_content = false;
                        new_page_data.settings.configs.multiview = true;
                        new_page_data.settings.configs.mulitview_label = "tab";
                        new_page_data.settings.configs.primary_image = false;
                        new_page_data.settings.configs.reorder_content = true;
                        new_page_data.settings.configs.title_view = false;
                        $rootScope.pages.push(new_page_data);
                        var data = angular.toJson($rootScope.pages);
                        var update = JSON.parse(data);
                        realtimeDatabase.ref().child('data').child("pages").set(update, function(error){
                            if(error){
                                $timeout(function(){
                                    $rootScope.$broadcast('server-event', {
                                        data:{
                                            message: "Error adding page."
                                        }
                                    });
                                }, 500);
                            } else {
                                $timeout(function(){
                                    $rootScope.$broadcast('server-event', {
                                        data:{
                                            message: "Page added."
                                        }
                                    });
                                }, 500);
                            }
                        });
                        break;
                    default:
                        return;
                }
            },
            delete: function(arg){
                var settings = $rootScope.pages[arg].settings;
                if(settings.locked == false){
                    $rootScope.pages.splice(arg, 1);
                    var data = angular.toJson($rootScope.pages);
                    var update = JSON.parse(data);
                    realtimeDatabase.ref().child('data').child("pages").set(update);
                    $timeout(function(){
                       $rootScope.$broadcast('server-event', {
                            data:{
                                message: "Page removed."
                            }
                        });
                    }, 500);
                } else {
                    $timeout(function(){
                       $rootScope.$broadcast('server-event', {
                            data:{
                                message: "Failed To Remove Page"
                            }
                        });
                    }, 500);
                }
            }
        },
        "navigation": {
            update: function(){
                var data = angular.toJson($rootScope.settings.navigation);
                var update = JSON.parse(data);
                realtimeDatabase.ref('/data/settings/navigation').set(update, function(error){
                    if(error){
                        $timeout(function(){
                        $rootScope.$broadcast('server-event', {
                            data:{
                                message: "Error updating navigation."
                            }
                        });
                    }, 500);
                    } else {
                        $timeout(function(){
                        $rootScope.$broadcast('server-event', {
                            data:{
                                message: "Navigation updated."
                            }
                        });
                    }, 500);
                    }
                });
            }
        },
        "settings": {
            update: function(){
                var data = angular.toJson($rootScope.settings.data);
                var update = JSON.parse(data);
                realtimeDatabase.ref('/data/settings/data').set(update, function(error){
                    if(error){
                        $timeout(function(){
                        $rootScope.$broadcast('server-event', {
                            data:{
                                message: "Error updating company settings."
                            }
                        });
                    }, 500);
                    } else {
                        $timeout(function(){
                        $rootScope.$broadcast('server-event', {
                            data:{
                                message: "Company settings updated."
                            }
                        });
                    }, 500);
                    }
                });
            }
        },
        "staff": {
            create: function(arg){
                var staffList = {};
                var newID = 0;
                angular.forEach($rootScope.settings.staff.members, function(value, key){
                    staffList[newID] = value;
                    staffList[newID].id = newID;
                    staffList[newID].key = newID;
                    newID++;
                });
                var data = angular.toJson(staffList);
                var update = JSON.parse(data);
                realtimeDatabase.ref('/data/settings/staff/members').set(update, function(error){
                    if(error){
                        $rootScope.messageStatus = false;
                        $rootScope.$broadcast('server-event', {
                            data:{
                             message: 'Error adding staff member.'
                            }
                        });
                    } else {
                        realtimeDatabase.ref('/data/settings/staff/members').once('value')
                        .then(function(snapshot) {
                            $rootScope.settings.staff.members = snapshot.val();
                            $timeout(function(){
                               $rootScope.$broadcast('server-event', {
                                    data:{
                                        message: arg.name + " added."
                                    }
                                });
                            }, 500);
                        })
                        .catch(function(error) {
                            $rootScope.messageStatus = false;
                            $rootScope.$broadcast('server-event', {
                                data:{
                                 message: 'Error retrieving staff list.'
                                }
                            });
                        });
                    }
                });
            },
            update: function(arg){
                var data = angular.toJson(arg);
                var update = JSON.parse(data);
                realtimeDatabase.ref('/data/settings/staff/members').child(arg.id).set(update, function(error){
                    if(error){
                        $rootScope.messageStatus = false;
                        $rootScope.$broadcast('server-event', {
                            data:{
                             message: 'Error updating staff member.'
                            }
                        });
                    } else {
                        realtimeDatabase.ref('/data/settings/staff/members').child(arg.id)
                        .once('value')
                        .then(function(snapshot) {
                            $rootScope.settings.staff.members[arg.id] = snapshot.val();
                            $timeout(function(){
                                $rootScope.$broadcast('server-event', {
                                    data:{
                                        message: arg.name + " updated"
                                    }
                                });
                            }, 500);
                        })
                        .catch(function(error) {
                            $rootScope.messageStatus = false;
                            $rootScope.$broadcast('server-event', {
                                data:{
                                 message: 'Error retrieving updated staff member.'
                                }
                            });
                        });
                    }
                });
            },
            delete: function(arg, argStaff){
                var member = argStaff[arg];
                argStaff.splice(arg, 1);
                var staffList = {};
                var newID = 0;
                angular.forEach(argStaff, function(value, key){
                    staffList[newID] = value;
                    staffList[newID].id = newID;
                    staffList[newID].key = newID;
                    newID++;
                });
                var data = angular.toJson(staffList);
                var update = JSON.parse(data);
                realtimeDatabase.ref('/data/settings/staff/members').set(update, function(error){
                    if (error){
                        $rootScope.$broadcast('server-event', {
                            data:{
                             message: 'Error removing staff member.'
                            }
                        });
                    } else {
                        $timeout(function(){
                           $rootScope.$broadcast('server-event', {
                                data:{
                                    message: member.name + " removed."
                                }
                            });
                        }, 500);
                        $rootScope.settings.staff.members = argStaff;
                    }
                });
            },
            reorder: function(arg){
                var staffList = {};
                var newID = 0;
                angular.forEach(arg, function(value, key){
                    staffList[newID] = value;
                    staffList[newID].id = newID;
                    staffList[newID].key = newID;
                    newID++;
                });
                $rootScope.staffSortObj = [];
                var data = angular.toJson(staffList);
                var update = JSON.parse(data);
                realtimeDatabase.ref('/data/settings/staff/members').set(update)
                .then(function(){
                    realtimeDatabase.ref('/data/settings/staff/members')
                    .once('value')
                    .then(function(snapshot) {
                        $rootScope.settings.staff.members = snapshot.val();
                        angular.forEach($rootScope.settings.staff.members, function(value, key){
                            $rootScope.staffSortObj.push(value);
                        });
                        $timeout(function(){
                           $rootScope.$broadcast('server-event', {
                                data:{
                                    message: "Staff order modified"
                                }
                            });
                        }, 500);
                    })
                    .catch(function(error) {
                        $rootScope.messageStatus = false;
                        $rootScope.$broadcast('server-event', {
                            data:{
                             message: 'Error retrieving updated staff order.'
                            }
                        });
                    });
                })
                .catch(function(error) {
                    $rootScope.messageStatus = false;
                    $rootScope.$broadcast('server-event', {
                        data:{
                         message: 'Error updating staff order.'
                        }
                    });
                });
            }
        }
    }

    this.tasks = {
        get: function(){

        },
        add: function(){

        },
        modify: function(){

        },
        delete: function(){

        },
        event: function(){

        }
    }
    this.transactions = {
        create: function(){

        },
        modify: function(){

        },
        cancel: function(){

        }
    }
    this.goods = {
        get: function(){

        },
        add: function(){

        },
        modify: function(){

        },
        delete: function(){

        }
    }
    this.perks = {
        get: function(){

        },
        add: function(){

        },
        modify: function(){

        },
        delete: function(){

        }
    }

    this.get_galleries = function(arg){
        var galleries = [];
        realtimeDatabase.ref().child('galleries').once('value')
        .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
                var childDataValue = childData;
                childDataValue.key = childKey;
                galleries.push(childDataValue);
            });
            $rootScope.galleries = galleries;
        })
        .catch(function(error){
            $rootScope.$broadcast('server-event', {
                data:{
                    message: "Error retrieving galleries."
                }
            });
        });
    }

    this.put_staff = function(arg){
        var staffList = {};
        var newID = 0;
        angular.forEach($rootScope.settings.staff.members, function(value, key){
            staffList[newID] = value;
            staffList[newID].id = newID;
            staffList[newID].key = newID;
            newID++;
        });
        var data = angular.toJson(staffList);
        var update = JSON.parse(data);
        realtimeDatabase.ref('/data/settings/staff/members').set(update, function(error){
            if(error){
                $rootScope.messageStatus = false;
                $rootScope.$broadcast('server-event', {
                    data:{
                     message: 'Error adding staff member.'
                    }
                });
            } else {
                realtimeDatabase.ref('/data/settings/staff/members').once('value')
                .then(function(snapshot) {
                    $rootScope.settings.staff.members = snapshot.val();
                    $timeout(function(){
                       $rootScope.$broadcast('server-event', {
                            data:{
                                message: arg.name + " added."
                            }
                        });
                    }, 500);
                })
                .catch(function(error) {
                    $rootScope.messageStatus = false;
                    $rootScope.$broadcast('server-event', {
                        data:{
                         message: 'Error retrieving staff list.'
                        }
                    });
                });
            }
        });
    }

    this.modify_staff = function(arg){
        var data = angular.toJson(arg);
        var update = JSON.parse(data);
        realtimeDatabase.ref('/data/settings/staff/members').child(arg.id).set(update, function(error){
            if(error){
                $rootScope.messageStatus = false;
                $rootScope.$broadcast('server-event', {
                    data:{
                     message: 'Error updating staff member.'
                    }
                });
            } else {
                realtimeDatabase.ref('/data/settings/staff/members').child(arg.id)
                .once('value')
                .then(function(snapshot) {
                    $rootScope.settings.staff.members[arg.id] = snapshot.val();
                    $timeout(function(){
                        $rootScope.$broadcast('server-event', {
                            data:{
                                message: arg.name + " updated"
                            }
                        });
                    }, 500);
                })
                .catch(function(error) {
                    $rootScope.messageStatus = false;
                    $rootScope.$broadcast('server-event', {
                        data:{
                         message: 'Error retrieving updated staff member.'
                        }
                    });
                });
            }
        });
    }

    this.modify_staff_order = function(staff){
        var staffList = {};
        var newID = 0;
        angular.forEach(staff, function(value, key){
            staffList[newID] = value;
            staffList[newID].id = newID;
            staffList[newID].key = newID;
            newID++;
        });
        $rootScope.staffSortObj = [];
        var data = angular.toJson(staffList);
        var update = JSON.parse(data);
        realtimeDatabase.ref('/data/settings/staff/members').set(update)
        .then(function(){
            realtimeDatabase.ref('/data/settings/staff/members')
            .once('value')
            .then(function(snapshot) {
                $rootScope.settings.staff.members = snapshot.val();
                angular.forEach($rootScope.settings.staff.members, function(value, key){
                    $rootScope.staffSortObj.push(value);
                });
                $timeout(function(){
                   $rootScope.$broadcast('server-event', {
                        data:{
                            message: "Staff order modified"
                        }
                    });
                }, 500);
            })
            .catch(function(error) {
                $rootScope.messageStatus = false;
                $rootScope.$broadcast('server-event', {
                    data:{
                     message: 'Error retrieving updated staff order.'
                    }
                });
            });
        })
        .catch(function(error) {
            $rootScope.messageStatus = false;
            $rootScope.$broadcast('server-event', {
                data:{
                 message: 'Error updating staff order.'
                }
            });
        });
    }

    this.delete_staff = function(arg, argStaff){
                var member = argStaff[arg];
                argStaff.splice(arg, 1);
                var staffList = {};
                var newID = 0;
                angular.forEach(argStaff, function(value, key){
                    staffList[newID] = value;
                    staffList[newID].id = newID;
                    staffList[newID].key = newID;
                    newID++;
                });
                var data = angular.toJson(staffList);
                var update = JSON.parse(data);
                realtimeDatabase.ref('/data/settings/staff/members').set(update, function(error){
                    if (error){
                        $rootScope.$broadcast('server-event', {
                            data:{
                             message: 'Error removing staff member.'
                            }
                        });
                    } else {
                        $timeout(function(){
                           $rootScope.$broadcast('server-event', {
                                data:{
                                    message: member.name + " removed."
                                }
                            });
                        }, 500);
                        $rootScope.settings.staff.members = argStaff;
                    }
                });
    }

    this.get_tasks = function(){
        var tasklist = [];
        var this_month;
        var next_month;
        realtimeDatabase.ref().child('data/settings/tasks').once('value')
        .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
                var childDataValue = childData;
                childDataValue.id = childKey;
                tasklist.push(childDataValue);
            });
            $rootScope.tasklist = tasklist; 
        })
        .catch(function(error) {
            $rootScope.messageStatus = false;
            $rootScope.$broadcast('server-event', {
                data:{
                 message: 'Error retrieving tasks.'
                }
            });
        });
    }

    // task.title -- 
    // task.subject --
    // task.outbound --
    // task.inbound --
    // task.action --
    // task.customURL --

    // task.delivery_medium dialog, notification, and/or email --
    // task.outbound_to_role --
    // task.outbound_to --
    // task.inbound_to_roles --
    // task.inbound_to --
    
    // task.type | reoccuring, manual, onetime, user generated, reporting --

    // if user generated
    // task.user_action_type | action, page-visit, inactive, account --
    // task.user_action_trigger --
    // action triggers action | 
    // action triggers page-visit | [/, /services, etc.] --
    // action triggers inaction | [30s, 1min, 5min, 30min] --

    // if reporting --
    // task.report visits, payments, leads, signups, permissions-enabled, appointments-made, subscriptions, most-visited-pages, feedback-received, files-shared

    // if onetime or scheduled
    // task.specified_run_date --

    // if reoccurring --
    // task.frequency --
    // task.run_day --
    // task.run_week --
    // task.run_clock_time --
    
    this.put_task = function(arg){
        var task_obj = {};
        var this_month;
        var next_month;

        // functions that help compute next runtime
        function decodeTime(c){return isNaN(c)?calcMilliseconds(c):calcTime(c)}
        function calcMilliseconds(e){var a;switch(e){case"6:30AM":a=234e5;break;case"7:00AM":a=252e5;break;case"7:30AM":a=27e6;break;case"8:00AM":a=288e5;break;case"8:30AM":a=306e5;break;case"9:00AM":a=324e5;break;case"9:30AM":a=342e5;break;case"10:00AM":a=36e6;break;case"10:30AM":a=378e5;break;case"11:00AM":a=396e5;break;case"11:30AM":a=414e5;break;case"12:00PM":a=432e5;break;case"12:30PM":a=45e6;break;case"1:00PM":a=468e5;break;case"1:30PM":a=486e5;break;case"2:00PM":a=504e5;break;case"2:30PM":a=522e5;break;case"3:00PM":a=54e6;break;case"3:30PM":a=558e5;break;case"4:00PM":a=576e5;break;case"4:30PM":a=594e5;break;case"5:00PM":a=612e5;break;case"5:30PM":a=63e6;break;case"6:00PM":a=648e5;break;case"6:30PM":a=666e5;break;case"7:00PM":a=684e5;break;case"7:30PM":a=702e5;break;case"8:00PM":a=72e6;break;default:a="No Matches"}return a}
        function calcTime(e){var a;switch(e){case 234e5:a="6:30AM";break;case 252e5:a="7:00AM";break;case 27e6:a="7:30AM";break;case 288e5:a="8:00AM";break;case 306e5:a="8:30AM";break;case 324e5:a="9:00AM";break;case 342e5:a="9:30AM";break;case 36e6:a="10:00AM";break;case 378e5:a="10:30AM";break;case 396e5:a="11:00AM";break;case 414e5:a="11:30AM";break;case 432e5:a="12:00PM";break;case 45e6:a="12:30PM";break;case 468e5:a="1:00PM";break;case 486e5:a="1:30PM";break;case 504e5:a="2:00PM";break;case 522e5:a="2:30PM";break;case 54e6:a="3:00PM";break;case 558e5:a="3:30PM";break;case 576e5:a="4:00PM";break;case 594e5:a="4:30PM";break;case 612e5:a="5:00PM";break;case 63e6:a="5:30PM";break;case 648e5:a="6:00PM";break;case 666e5:a="6:30PM";break;case 684e5:a="7:00PM";break;case 702e5:a="7:30PM";break;case 72e6:a="8:00PM";break;default:a="No Matches"}return a}
        function quantifyFrequency(e){var a=0;switch(e){case"daily":a=864e5;break;case"weekly":a=6048e5;break;case"bi-weekly":a=12096e5;break;case"monthly":a=2628288e3}return a};
        function getDayOfWeek(e,t,n){return new Date(n,t,e).getDay()}
        function compileMonth(e,n){var t={},a=e-1,r=new Date(n,e,0).getDate(),o=new Date(n,a,1);return t.date=o,t.year=n,t.number_of_days=r,t.month_number=a,t}
        function compileMonthAlg(e){for(var a=0,n=[],r=1;r<=e.number_of_days;r++){var t={};t.day=getDayOfWeek(r,e.month_number,e.year),t.date=new Date(e.year,e.month_number,r),t.milliseconds=Date.parse(t.date),t.day_number=r,t.week=a,n.push(t),t.day>5&&a++}return n};
        function checkIfNextYear(e){return e>12};
        function runtimeAlg(){var t,e=new Date,o=(Date.now(),e.getDay(),e.getDate(),e.getMonth()),n=e.getFullYear(),h=o+1,a=h+1,i=n+1,l=checkIfNextYear(a),c=compileMonth(h,n);t=!0===l?compileMonth(1,i):compileMonth(a,n),this_month=compileMonthAlg(c),next_month=compileMonthAlg(t)};
        // functions that help compute next runtime


        $rootScope.taskAddObj = {};
                
        //////////////////============== task conditional configuration

        ////////////////// Trigger type One Time
        if (arg.type == "onetime"){
            arg.frequency = "";
            arg.run_week = "";
            arg.run_day = "";
            arg.task_date = "";
            arg.run_clock_time = "";
        }
        ////////////////// Trigger type One Time

        ////////////////// Trigger type Manual
        if (arg.type == "manual"){
            arg.frequency = "";
            arg.run_week = "";
            arg.run_day = "";
            arg.task_date = "";
            arg.run_clock_time = "";
        }
        ////////////////// Trigger type Manual

        ////////////////// Trigger type Reoccuring
        // Properties being set
        // task.next_runtime
        if (arg.type == "reoccuring"){

            runtimeAlg();

            if("monthly"==arg.frequency){e:for(var i=0;i<this_month.length;i++){var this_day=this_month[i];if(this_day.week===arg.run_week&&this_day.day===arg.run_day){var clock_time=decodeTime(arg.run_clock_time),currentDate=new Date,currentDateTime=currentDate.getTime(),proposedDate=clock_time+this_day.milliseconds;if(proposedDate<currentDateTime){setTaskNextMonth();break e}arg.next_runtime=clock_time+this_day.milliseconds;var next_date=new Date(arg.next_runtime),display_date=next_date.toLocaleString();$timeout(function(){$rootScope.$broadcast("server-event",{data:{message:"Next Run Time "+display_date}})},1500);break e}setTaskNextMonth();break e}function setTaskNextMonth(){e:for(var e=0;e<next_month.length;e++){var t=next_month[e];if(t.week===arg.run_week&&t.day>arg.run_day){var a=decodeTime(arg.run_clock_time);arg.next_runtime=a+t.milliseconds;var r=new Date(arg.next_runtime).toLocaleString();$timeout(function(){$rootScope.$broadcast("server-event",{data:{message:"Next Run Time "+r}})},1500);break e}if(t.week===arg.run_week&&t.day===arg.run_day){a=decodeTime(arg.run_clock_time);arg.next_runtime=a+t.milliseconds;r=new Date(arg.next_runtime).toLocaleString();$timeout(function(){$rootScope.$broadcast("server-event",{data:{message:"Next Run Time "+r}})},1500);break e}}}}
            else if("bi-weekly"==arg.frequency||"weekly"==arg.frequency){for(var tempDate=new Date,today_day_number=tempDate.getDate(),working_day_number=today_day_number-1,i=working_day_number;i<this_month.length;i++){var this_day=this_month[i];if(this_day.day===arg.run_day){var clock_time=decodeTime(arg.run_clock_time),currentDate=new Date,currentDateTime=currentDate.getTime(),proposedDate=clock_time+this_day.milliseconds,isNextMonthCheck=i+1;if(isNextMonthCheck==this_month.length)setTaskNextMonth();else{arg.next_runtime=clock_time+this_day.milliseconds+quantifyFrequency(arg.frequency);var next_date=new Date(arg.next_runtime),display_date=next_date.toLocaleString();$timeout(function(){$rootScope.$broadcast("server-event",{data:{message:"Next Run Time "+display_date}})},1500)}break}}function setTaskNextMonth(){for(var e=0;e<next_month.length;e++){var t=next_month[e];if(t.day===arg.run_day){var a=decodeTime(task.run_clock_time);arg.next_runtime=a+t.milliseconds+quantifyFrequency(arg.frequency);var n=new Date(arg.next_runtime).toLocaleString();$timeout(function(){$rootScope.$broadcast("server-event",{data:{message:"Next Run Time "+n}})},1500);break}}}} 
            else if("daily"==arg.frequency){var tempDate=new Date,today_day_number=tempDate.getDate(),working_day_number=today_day_number,tomorrow_obj=this_month[working_day_number],clock_time=decodeTime(arg.run_clock_time);arg.next_runtime=clock_time+tomorrow_obj.milliseconds;var next_date=new Date(arg.next_runtime),display_date=next_date.toLocaleString();$timeout(function(){$rootScope.$broadcast("server-event",{data:{message:"Next Run Time "+display_date}})},1500)}
            else if (arg.frequency == 'annually'){
                
            }

        }
        ////////////////// Trigger type Reoccuring

        ////////////////// Trigger type 4
        if (arg.type == "user generated"){
            arg.frequency = "";
            arg.run_week = "";
            arg.run_day = "";
            arg.task_date = "";
            arg.run_clock_time = "";
            arg.specified_run_date = "";
        }
        ////////////////// Trigger type 4

        //////////////////============== task conditional configuration

        //created on and by
        arg.created_on = Date.now();
        arg.created_by = $rootScope.me.id;

        //task create & read (promise) operation
        realtimeDatabase.ref('/data/settings/tasks').child(arg.id).set(arg, function(error){
            if(error){
                $rootScope.messageStatus = false;
                $rootScope.$broadcast('server-event', {
                    data:{
                     message: 'Error creating task.'
                    }
                });
            } else {
                realtimeDatabase.ref().child('data/settings/tasks')
                .once('value')
                .then(function(snapshot) {
                    snapshot.forEach(function(childSnapshot) {
                        var childKey = childSnapshot.key;
                        var childData = childSnapshot.val();
                        var childDataValue = childData;
                        childDataValue.id = childKey;
                        tasklist.push(childDataValue);
                    });
                    $rootScope.messageStatus = true;
                    $rootScope.$broadcast('server-event', {
                        data:{
                         message: 'Task created.'
                        }
                    });
                    $rootScope.tasklist = tasklist; 
                })
                .catch(function(error) {
                    $rootScope.messageStatus = false;
                    $rootScope.$broadcast('server-event', {
                        data:{
                         message: 'Error retrieving tasks.'
                        }
                    });
                });
            }
        });
    }

    this.modify_task = function(arg){
        var this_month;
        var next_month;

        // functions that help compute next runtime
        function decodeTime(c){return isNaN(c)?calcMilliseconds(c):calcTime(c)}
        function calcMilliseconds(e){var a;switch(e){case"6:30AM":a=234e5;break;case"7:00AM":a=252e5;break;case"7:30AM":a=27e6;break;case"8:00AM":a=288e5;break;case"8:30AM":a=306e5;break;case"9:00AM":a=324e5;break;case"9:30AM":a=342e5;break;case"10:00AM":a=36e6;break;case"10:30AM":a=378e5;break;case"11:00AM":a=396e5;break;case"11:30AM":a=414e5;break;case"12:00PM":a=432e5;break;case"12:30PM":a=45e6;break;case"1:00PM":a=468e5;break;case"1:30PM":a=486e5;break;case"2:00PM":a=504e5;break;case"2:30PM":a=522e5;break;case"3:00PM":a=54e6;break;case"3:30PM":a=558e5;break;case"4:00PM":a=576e5;break;case"4:30PM":a=594e5;break;case"5:00PM":a=612e5;break;case"5:30PM":a=63e6;break;case"6:00PM":a=648e5;break;case"6:30PM":a=666e5;break;case"7:00PM":a=684e5;break;case"7:30PM":a=702e5;break;case"8:00PM":a=72e6;break;default:a="No Matches"}return a}
        function calcTime(e){var a;switch(e){case 234e5:a="6:30AM";break;case 252e5:a="7:00AM";break;case 27e6:a="7:30AM";break;case 288e5:a="8:00AM";break;case 306e5:a="8:30AM";break;case 324e5:a="9:00AM";break;case 342e5:a="9:30AM";break;case 36e6:a="10:00AM";break;case 378e5:a="10:30AM";break;case 396e5:a="11:00AM";break;case 414e5:a="11:30AM";break;case 432e5:a="12:00PM";break;case 45e6:a="12:30PM";break;case 468e5:a="1:00PM";break;case 486e5:a="1:30PM";break;case 504e5:a="2:00PM";break;case 522e5:a="2:30PM";break;case 54e6:a="3:00PM";break;case 558e5:a="3:30PM";break;case 576e5:a="4:00PM";break;case 594e5:a="4:30PM";break;case 612e5:a="5:00PM";break;case 63e6:a="5:30PM";break;case 648e5:a="6:00PM";break;case 666e5:a="6:30PM";break;case 684e5:a="7:00PM";break;case 702e5:a="7:30PM";break;case 72e6:a="8:00PM";break;default:a="No Matches"}return a}
        function quantifyFrequency(e){var a=0;switch(e){case"daily":a=864e5;break;case"weekly":a=6048e5;break;case"bi-weekly":a=12096e5;break;case"monthly":a=2628288e3}return a};
        function getDayOfWeek(e,t,n){return new Date(n,t,e).getDay()}
        function compileMonth(e,n){var t={},a=e-1,r=new Date(n,e,0).getDate(),o=new Date(n,a,1);return t.date=o,t.year=n,t.number_of_days=r,t.month_number=a,t}
        function compileMonthAlg(e){for(var a=0,n=[],r=1;r<=e.number_of_days;r++){var t={};t.day=getDayOfWeek(r,e.month_number,e.year),t.date=new Date(e.year,e.month_number,r),t.milliseconds=Date.parse(t.date),t.day_number=r,t.week=a,n.push(t),t.day>5&&a++}return n}
        function checkIfNextYear(e){return e>12};
        function runtimeAlg(){var t,e=new Date,o=(Date.now(),e.getDay(),e.getDate(),e.getMonth()),n=e.getFullYear(),h=o+1,a=h+1,i=n+1,l=checkIfNextYear(a),c=compileMonth(h,n);t=!0===l?compileMonth(1,i):compileMonth(a,n),this_month=compileMonthAlg(c),next_month=compileMonthAlg(t)};
        // functions that help compute next runtime


        $rootScope.taskAddObj = {};
                
        //////////////////============== task conditional configuration

        ////////////////// Trigger type One Time
        if (arg.type == "onetime"){

        }
        ////////////////// Trigger type One Time

        ////////////////// Trigger type Manual
        if (arg.type == "manual"){

        }
        ////////////////// Trigger type Manual

        ////////////////// Trigger type Reoccuring
        // Properties being set
        // task.next_runtime
        if (arg.type == "reoccuring"){

            runtimeAlg();

            if("monthly"==arg.frequency){e:for(var i=0;i<this_month.length;i++){var this_day=this_month[i];if(this_day.week===arg.run_week&&this_day.day===arg.run_day){var clock_time=decodeTime(arg.run_clock_time),currentDate=new Date,currentDateTime=currentDate.getTime(),proposedDate=clock_time+this_day.milliseconds;if(proposedDate<currentDateTime){setTaskNextMonth();break e}arg.next_runtime=clock_time+this_day.milliseconds;var next_date=new Date(arg.next_runtime),display_date=next_date.toLocaleString();$timeout(function(){$rootScope.$broadcast("server-event",{data:{message:"Next Run Time "+display_date}})},1500);break e}setTaskNextMonth();break e}function setTaskNextMonth(){e:for(var e=0;e<next_month.length;e++){var t=next_month[e];if(t.week===arg.run_week&&t.day>arg.run_day){var a=decodeTime(arg.run_clock_time);arg.next_runtime=a+t.milliseconds;var r=new Date(arg.next_runtime).toLocaleString();$timeout(function(){$rootScope.$broadcast("server-event",{data:{message:"Next Run Time "+r}})},1500);break e}if(t.week===arg.run_week&&t.day===arg.run_day){a=decodeTime(arg.run_clock_time);arg.next_runtime=a+t.milliseconds;r=new Date(arg.next_runtime).toLocaleString();$timeout(function(){$rootScope.$broadcast("server-event",{data:{message:"Next Run Time "+r}})},1500);break e}}}}
            else if("bi-weekly"==arg.frequency||"weekly"==arg.frequency){for(var tempDate=new Date,today_day_number=tempDate.getDate(),working_day_number=today_day_number-1,i=working_day_number;i<this_month.length;i++){var this_day=this_month[i];if(this_day.day===arg.run_day){var clock_time=decodeTime(arg.run_clock_time),currentDate=new Date,currentDateTime=currentDate.getTime(),proposedDate=clock_time+this_day.milliseconds,isNextMonthCheck=i+1;if(isNextMonthCheck==this_month.length)setTaskNextMonth();else{arg.next_runtime=clock_time+this_day.milliseconds+quantifyFrequency(arg.frequency);var next_date=new Date(arg.next_runtime),display_date=next_date.toLocaleString();$timeout(function(){$rootScope.$broadcast("server-event",{data:{message:"Next Run Time "+display_date}})},1500)}break}}function setTaskNextMonth(){for(var e=0;e<next_month.length;e++){var t=next_month[e];if(t.day===arg.run_day){var a=decodeTime(arg.run_clock_time);arg.next_runtime=a+t.milliseconds+quantifyFrequency(arg.frequency);var n=new Date(arg.next_runtime).toLocaleString();$timeout(function(){$rootScope.$broadcast("server-event",{data:{message:"Next Run Time "+n}})},1500);break}}}} 
            else if("daily"==arg.frequency){var tempDate=new Date,today_day_number=tempDate.getDate(),working_day_number=today_day_number,tomorrow_obj=this_month[working_day_number],clock_time=decodeTime(arg.run_clock_time);arg.next_runtime=clock_time+tomorrow_obj.milliseconds;var next_date=new Date(arg.next_runtime),display_date=next_date.toLocaleString();$timeout(function(){$rootScope.$broadcast("server-event",{data:{message:"Next Run Time "+display_date}})},1500)}
            else if (arg.frequency == 'annually'){
                
            }

        }
        ////////////////// Trigger type Reoccuring

        ////////////////// Trigger type 4
        if (arg.type == "user generated"){

        }
        ////////////////// Trigger type 4

        //////////////////============== task conditional configuration

        //modified on and by
        arg.modified_on = Date.now();
        arg.modified_by = $rootScope.me.id;

        //task modify & read (promise) operation
        realtimeDatabase.ref('/data/settings/tasks').child(arg.id).update(arg, function(error){
            if(error){
                $rootScope.messageStatus = false;
                $rootScope.$broadcast('server-event', {
                    data:{
                     message: 'Error modifying task.'
                    }
                });
            } else {
                realtimeDatabase.ref().child('data/settings/tasks').once('value')
                .then(function(snapshot) {
                    snapshot.forEach(function(childSnapshot) {
                        var childKey = childSnapshot.key;
                        var childData = childSnapshot.val();
                        var childDataValue = childData;
                        childDataValue.id = childKey;
                        tasklist.push(childDataValue);
                    });
                    $rootScope.messageStatus = false;
                    $rootScope.$broadcast('server-event', {
                        data:{
                         message: 'Task modified.'
                        }
                    });
                    $rootScope.tasklist = tasklist; 
                })
                .catch(function(error) {
                    $rootScope.messageStatus = false;
                    $rootScope.$broadcast('server-event', {
                        data:{
                         message: 'Error retrieving tasks.'
                        }
                    });
                });
            }
        });
    }

    this.save_event = function(event){
        var userID;

        if (event.user_id){
            userID = event.user_id;
        } else {
            userID = "blank"
        }

        var executable_event = {

            // User Details
            user_id: userID,
            user_ip: event.user_ip,
            // User Details

            clickpath: event.clickpath,
            timestamp: event.timestamp,
            action : event.action,
            payload : event.payload, // example payloads -- undefined, new user profile, product data for transaction, shared resources
            task_id: event.task_id,
            name: event.name,
            page: event.page,
            id: uuid.v4()

        }

        realtimeDatabase.ref('/data/events').child(executable_event.id).set(executable_event, function(error){

            if(error){

                console.error(error);

            } else {

                return true;

            }
        });
    }

    this.delete_task = function(arg){
        realtimeDatabase.ref('/data/settings/tasks').child(arg.id).remove()
        .then(function(){
            realtimeDatabase.ref().child('data/settings/tasks').once('value')
            .then(function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    var childKey = childSnapshot.key;
                    var childData = childSnapshot.val();
                    var childDataValue = childData;
                    childDataValue.id = childKey;
                    tasklist.push(childDataValue);
                });
                $rootScope.messageStatus = false;
                $rootScope.$broadcast('server-event', {
                    data:{
                     message: 'Task deleted.'
                    }
                });
                $rootScope.tasklist = tasklist; 
            })
            .catch(function(error) {
                $rootScope.messageStatus = false;
                $rootScope.$broadcast('server-event', {
                    data:{
                     message: 'Error retrieving tasks.'
                    }
                });
            });
        })
        .catch(function(error) {
            $rootScope.messageStatus = false;
            $rootScope.$broadcast('server-event', {
                data:{
                 message: 'Error deleting tasks.'
                }
            });
        });
    }

    this.notification_permission_check = function(arg){

    }

    this.get_chatter = function(arg){
        return result;
    }

    this.archive = function(arg, argTo){
        return result;
    }

}])
.filter('startFrom', function() {
    return function(input, start) {
        if(input){
            var input = input;
            start = +start; //parse to int
            return input.slice(start);
        }
    }
})
.controller('lightweightController', [
'$rootScope', 
'$scope',  
'$timeout', 
'$location',
'$window', 
'$route',
'$mdToast', 
'$q',
'$firebaseObject',
'$firebaseArray',
'$firebaseAuth',
'lightweight_firebase',
'$interval',
// 'users_data',
// 'role_data',
// 'tag_data',
// 'image_data',
// 'video_data',
// 'gallery_data',
// 'task_data',
'filterFilter',
'uuid',
'$http',
function (
$rootScope, 
$scope,  
$timeout,  
$location,
$window,
$route,
$mdToast, 
$q,
$firebaseObject,
$firebaseArray,
$firebaseAuth,
lightweight_firebase,
$interval,
// users_data,
// role_data,
// tag_data,
// image_data,
// video_data,
// gallery_data,
// task_data,
filterFilter,
uuid,
$http){






    ////////////////////////////////// Firebase Init
    var realtimeDatabase = firebase.database();
    var firebaseStorage = firebase.storage();
    $rootScope.auth = $firebaseAuth();
    ////////////////////////////////// Firebase Init






    ////////////////////////////////// Variables and scoped variables
    ////////////////////////////////// Variables and scoped variables
    ////////////////////////////////// Variables and scoped variables
    
    var newStaffIndex = 0;
    var newGalleryIndex = 0;
    var imagelist = [];
    var img_obj = null;
    var videolist = [];
    var vid_obj = null;
    var userslist = [];
    var events = {};

    $rootScope.rolelist = [];
    $rootScope.imagelist = [];
    $rootScope.editMedia = false;
    $rootScope.galleriesgridview = true;
    $rootScope.staffgridview = true;
    $rootScope.new_staff_member = false;
    $rootScope.setting = "Company Info";
    $rootScope.mediaView = "media";
    $rootScope.newPageData = {};

    $scope.dynamic_task_message_variables = [
    "First Name", 
    "Last Name", 
    "Email", 
    "Password", 
    "Phone", 
    "Your Company Name", 
    "Your Company Email", 
    "Your Company Address", 
    "Your Company Phone",  
    "My First Name", 
    "My Last Name", 
    "My Email", 
    "My Phone", 
    "My Company Name", 
    "My Company Email", 
    "My Company Phone", 
    "My Company Address", 
    "Appointment", 
    "Good Name", 
    "Good Details", 
    "Good Price", 
    "Good Sku", 
    "Message", 
    "Lead Source", 
    "Lead Fullname", 
    "Lead Phone", 
    "Lead Email", 
    "Receipt", 
    "Resource", 
    "Case"
    ];
    // For Installs With Project Media Organization
    // $rootScope.project_types = [array of types];

    ////////////////////////////////// Variables and scoped variables
    ////////////////////////////////// Variables and scoped variables
    ////////////////////////////////// Variables and scoped variables




    ///////////////////////////////////////////////////// View Controls
    ///////////////////////////////////////////////////// View Controls
    ///////////////////////////////////////////////////// View Controls

    $rootScope.edit = function(configs, page){
        if (page && configs.contentId == 'pages'){
            var param = page.settings.url;
            var page_selected_url = JSON.stringify(param);
            var continue_looping = true;
            var load_page = function(){
                for(let i = 0, l = $rootScope.pages.length; i < l && continue_looping == true; i++) {
                    var raw_url = $rootScope.pages[i].settings.url;
                    var url = JSON.stringify(raw_url);
                    if(url == page_selected_url){
                        continue_looping = false;
                        $rootScope.editor_element = $rootScope.pages[i];
                    }
                }
            }
            load_page();
        } else {
            $rootScope.editor_element = $rootScope[configs.contentId];
        }
        
        $rootScope.edit_mode = true;
    }
    $rootScope.end_edit = function(){
        $rootScope.editor_element = null;
        $rootScope.edit_mode = false;
    }
    $rootScope.open_edit_configuration = function(){
        $rootScope.edit_configuration_dialog_visible = true;
    }
    $rootScope.close_edit_configuration = function(){
        $rootScope.edit_configuration_dialog_visible = false;
    }
    $rootScope.openMediaVault = function(element) {
        $rootScope.elementToUpdate = element;
        $rootScope.media_vault_visible = true;
    }
    $rootScope.closeMediaVault = function() {
        $rootScope.elementToUpdate = null;
        $rootScope.media_vault_visible = false;
    }
    $rootScope.mediavault_filepicker = function(img_obj){
        $rootScope.$broadcast('mediavault', {
            data:{
                img_obj: img_obj
            }
        });
    }
    $rootScope.$on('mediavault', function(event, args) {
        $rootScope.media_vault_visible = true;
        img_obj = args.data.img_obj;
        $rootScope.elementToUpdate = true;
    });
    $rootScope.selectMedia = function(selected){
        img_obj.source = selected;
        $rootScope.elementToUpdate = false;
        $timeout(function(){
            $rootScope.$broadcast('server-event', {
                data:{
                    message: "Image selected."
                }
            });
        }, 500);
    }
    $rootScope.openUserVault = function() {
        $rootScope.user_vault_visible = true;
    }
    $rootScope.closeUserVault = function() {
        $rootScope.user_vault_visible = false;
    }
    $rootScope.selectUser = function(user){
        $rootScope.selectedUser = user;
        $rootScope.user_vault_detail_visible = true;
    }
    $rootScope.openMyVault = function() {
        $rootScope.my_vault_detail_visible = true;
    }
    $rootScope.closeMyVault = function() {
        $rootScope.my_vault_detail_visible = false;
    }
    $rootScope.openAddUser = function() {
        $rootScope.user_vault_add_user_visible = true;
    }
    $rootScope.closeAddUser = function() {
        $rootScope.user_vault_add_user_visible = false;
    }
    $rootScope.closeUserVaultDetail = function(){
        $rootScope.selectedUser = null;
        $rootScope.user_vault_detail_visible = false;
    }
    $rootScope.openPasswordReset = function(me){
        $rootScope.reset_password_visible = true;
        $rootScope.accountEmailPasswordReset = me.email;
    }
    $rootScope.closePasswordReset = function(){
        $rootScope.reset_password_visible = false;
    }
    $rootScope.openShare = function(file){
        $rootScope.my_vault_share_visible = true;
        $rootScope.file = file;
    }
    $rootScope.openIframeUpload = function(){
        $rootScope.my_vault_iframe_upload_visible = true;
    }
    $rootScope.closeIframeUpload = function(){
        $rootScope.my_vault_iframe_upload_visible = false;
    }
    $rootScope.closeShare = function(){
        $rootScope.my_vault_share_visible = false;
        $rootScope.file = null;
    }
    $rootScope.openTaskRunner = function(){
        $rootScope.task_runner_visible = true;
    }
    $rootScope.closeTaskRunner = function(){
        $rootScope.task_runner_visible = false;
    }
    $rootScope.openCreateTask = function(){
        $rootScope.task_runner_task_add_visible = true;
        $rootScope.taskAddObj = {};
    }
    $rootScope.closeCreateTask = function(){
        $rootScope.task_runner_task_add_visible = false;
        $rootScope.taskAddObj = {};
    }
    $rootScope.openUpdateTask = function(task){
        $rootScope.task_runner_task_modify_visible = true;
        $rootScope.taskUpdateObj = task;
    }
    $rootScope.closeUpdateTask = function(){
        $rootScope.task_runner_task_modify_visible = false;
        $rootScope.taskUpdateObj = {};
    }
    $rootScope.sidebarOpen = true;
    $rootScope.toggleSidebar = function(){
        if($rootScope.sidebarOpen){
            $rootScope.sidebarOpen = false;
        } else {
            $rootScope.sidebarOpen = true;
        }
    }
    $rootScope.editor_hidden = false;
    $rootScope.toggleEditorVisibility = function(){
        if($rootScope.editor_hidden){
            $rootScope.editor_hidden = false;
        } else {
            $rootScope.editor_hidden = true;
        }
    }
    $rootScope.toggleNotificationDialog = function(arg){
        if($rootScope.notification_dialog_open){

        } else {

        }
    }
    $rootScope.closeAllApps = function(){
        $rootScope.close_edit_configuration();
        $rootScope.closeMediaVault();
        $rootScope.closeUserVault();
        $rootScope.closeMyVault();
        $rootScope.closeAddUser();
        $rootScope.closeUserVaultDetail();
        $rootScope.closePasswordReset();
        $rootScope.closeIframeUpload();
        $rootScope.closeShare();
        $rootScope.closeTaskRunner();
        $rootScope.closeCreateTask();
        $rootScope.closeUpdateTask();
    }

    ///////////////////////////////////////////////////// View Controls
    ///////////////////////////////////////////////////// View Controls
    ///////////////////////////////////////////////////// View Controls











    ///////////////////////////////////////////////////// Read Data From Lightweight Firebase Database
    ///////////////////////////////////////////////////// Read Data From Lightweight Firebase Database
    ///////////////////////////////////////////////////// Read Data From Lightweight Firebase Database

    lightweight_firebase.users.read()
    .then(function(result){
        if(result.length > 0){
            $rootScope.userslist = result;
            userslist = result;
            $rootScope.usersPageSize = 20;
            $rootScope.currentUserPage = 0;
            $rootScope.numberOfUserPages = Math.ceil($rootScope.userslist.length/$rootScope.usersPageSize);
        }
    });

    lightweight_firebase.users.roles.read()
    .then(function(result){
        if(result.length > 0){
            $rootScope.rolelist = result;     
        }
    });

    lightweight_firebase.media.image.read()
    .then(function(result){
        $rootScope.imagelist = result;
        imagelist = result;
        $rootScope.pageSize = 12;
        $scope.currentPage = 0;
        $rootScope.numberOfPages = Math.ceil($rootScope.imagelist.length/$rootScope.pageSize);
    });

    lightweight_firebase.get_tasks();


    ///////////////////////////////////////////////////// Read Data From Lightweight Firebase Database
    ///////////////////////////////////////////////////// Read Data From Lightweight Firebase Database
    ///////////////////////////////////////////////////// Read Data From Lightweight Firebase Database








    ///////////////////////////////////////////////////// Check if user is authorized to view tools
    ///////////////////////////////////////////////////// Check if user is authorized to view tools
    ///////////////////////////////////////////////////// Check if user is authorized to view tools

    $rootScope.isAuthorized = function(app, roles){
        var result;
        switch(app){
            case "AppLab":
                // if(roles === "Lightweight Internet Coordinator" || roles === "Lightweight Support"){
                //     result = true;
                // } else {
                //     result = false;
                // }
                roles === "Lightweight Internet Coordinator" ? result = true : roles === "Lightweight Support" ? result = true : result = false;
                break;
            case "MediaVault":
                if(roles === "Lightweight Internet Coordinator" || roles === "Lightweight Support" || roles === "Professional"){
                    result = true;
                } else {
                    result = false;
                }
                break;
            case "UserVault":
                if(roles === "Lightweight Internet Coordinator" || roles === "Lightweight Support" || roles === "Professional" || roles === "Executive"){
                    result = true;
                } else {
                    result = false;
                }
                break;
            case "TaskRunner":
                if(roles === "Lightweight Internet Coordinator" || roles === "Lightweight Support" || roles === "Professional" || roles === "Executive"){
                    result = true;
                } else {
                    result = false;
                }
                break;
            case "Settings":
                if(roles === "Lightweight Internet Coordinator" || roles === "Lightweight Support" || roles === "Executive"){
                    result = true;
                } else {
                    result = false;
                }
                break;
            default:
                return;
        }
        return result;
    }
    
    ///////////////////////////////////////////////////// Check if user is authorized to view tools
    ///////////////////////////////////////////////////// Check if user is authorized to view tools
    ///////////////////////////////////////////////////// Check if user is authorized to view tools











    ///////////////////////////////////////////////////// User Vault View Methods
    ///////////////////////////////////////////////////// User Vault View Methods
    ///////////////////////////////////////////////////// User Vault View Methods

    $rootScope.queryUser = function(query){
        $rootScope.currentUserPage = 0;
        $rootScope.userslist = filterFilter($rootScope.userslist,query);
        $rootScope.numberOfUserPages = Math.ceil($rootScope.userslist.length/$rootScope.pageSize);
    }
    $rootScope.clearQueryUser = function(){
        $rootScope.currentUserPage = 0;
        $rootScope.queryUserFilter = undefined;
        $rootScope.userslist = userslist;
        $rootScope.numberOfUserPages = Math.ceil($rootScope.userslist.length/$rootScope.pageSize);
    }
    var notification_permission_check = function(){

    }

    ///////////////////////////////////////////////////// User Vault View Methods
    ///////////////////////////////////////////////////// User Vault View Methods
    ///////////////////////////////////////////////////// User Vault View Methods
    









    ///////////////////////////////////////////////////// User Vault Database CRUD Operations
    ///////////////////////////////////////////////////// User Vault Database CRUD Operations
    ///////////////////////////////////////////////////// User Vault Database CRUD Operations

    $rootScope.sign_up = {};

    // Sign In

    $rootScope.progressAnimation = false;

    $rootScope.signIn = function(arg){
        $rootScope.progressAnimation = true;
        $rootScope.auth.$signInWithEmailAndPassword(arg.email, arg.password)
        .then(function(user) {
            $timeout(function(){
               $rootScope.progressAnimation = false;
            }, 2000);
            if ($location.path() == '/login'){
                $location.path("/");
            }
        })
        .catch(function(error) {
            $rootScope.progressAnimation = false;
            var errorCode = error.code;
            var errorMessage = error.message;
            $rootScope.$broadcast('server-event', {
                data:{
                    message: errorMessage + "."
                }
            });
        });
    };

    // Sign In

    ///////////////////////// Start Here
     ///////////////////////// Start Here
      ///////////////////////// Start Here

    $rootScope.signup = function(user){

    }

    $rootScope.reset = function(){

    }

    $rootScope.recover = function(arg){

    }

    $rootScope.passReset = function(new_pass){
        lightweight_firebase.users.reset.password(new_pass);
    }

    // Reset My Password

    $rootScope.newUserSignup = function(user){
        lightweight_firebase.users.signup(user);
    }

    // Create Internal User Op

    $rootScope.addInternalUser = function(user){
        lightweight_firebase.users.create(user);
    }

    // Create Internal User Op

    // Modify User Op

    $rootScope.updateUser = function(user){
        lightweight_firebase.users.update(user);
    }

    $rootScope.updateMe = function(myAccount){
        lightweight_firebase.users.self.update(myAccount);
    }

    // Modify User Op

    // Delete User Op

    $rootScope.deleteUser = function(user){
        lightweight_firebase.users.delete(user);
    }

    // Delete User Op

    ///////////////////////////////////////////////////// User Vault Database CRUD Operations
    ///////////////////////////////////////////////////// User Vault Database CRUD Operations
    ///////////////////////////////////////////////////// User Vault Database CRUD Operations








    

    ///////////////////////////////////////////////////// Media Vault View Controls
    ///////////////////////////////////////////////////// Media Vault View Controls
    ///////////////////////////////////////////////////// Media Vault View Controls

    $rootScope.queryMedia = function(query){
        $rootScope.imagelist = filterFilter(imagelist,query);
        $rootScope.currentPage = 0;
        $rootScope.numberOfPages = Math.ceil($rootScope.imagelist.length/$rootScope.pageSize);
    }
    $rootScope.clearQueryMedia = function(){
        $rootScope.currentPage = 0;
        $rootScope.queryFilter = undefined;
        $rootScope.imagelist = imagelist;
        $rootScope.numberOfPages = Math.ceil($rootScope.imagelist.length/$rootScope.pageSize);
    }
    $rootScope.switchViewGalleries = function() {
        if($rootScope.galleriesgridview == false){
            $rootScope.galleriesgridview = true;
        } else {
            $rootScope.galleriesgridview = false;
        }
    }
    $rootScope.addGalleryTemplate = function(){
        var galleryObj = {};
        galleryObj.featured = false;
        $rootScope.new_gallery = true;
        $rootScope.galleries.unshift(galleryObj);
        newGalleryIndex = $rootScope.galleries.indexOf(galleryObj);        
    }
    $rootScope.cancelGallery = function(){
        $rootScope.galleries.splice(0, 1);
        $rootScope.new_gallery = false;
    }

    ///////////////////////////////////////////////////// Media Vault View Controls
    ///////////////////////////////////////////////////// Media Vault View Controls
    ///////////////////////////////////////////////////// Media Vault View Controls











    ///////////////////////////////////////////////////// Media Vault Database CRUD Operations
    ///////////////////////////////////////////////////// Media Vault Database CRUD Operations
    ///////////////////////////////////////////////////// Media Vault Database CRUD Operations

    $rootScope.add_images = function(arg){
        lightweight_firebase.media.image.create(arg).then(function(result){$rootScope.imagelist = result;});
    }
    $rootScope.updateMedia = function(image){
        lightweight_firebase.media.image.update(image);
    }
    $rootScope.downloadMedia = function(image){
        lightweight_firebase.media.image.download(image);
    }
    $rootScope.deleteMedia = function(image){
        lightweight_firebase.media.image.delete(image);
    }

    $rootScope.tags = [];
    $rootScope.updateTags = function(tags){        
        lightweight_firebase.media.tags.update(tags);
        $rootScope.tags = [];
    }

    // Create Gallery Op
    $rootScope.addGallery = function(gallery){
        lightweight_firebase.media.gallery.create(gallery);
    }
    // Create Gallery Op

    // Modify Gallery Op
    $rootScope.updateGallery = function(gallery){
        lightweight_firebase.media.gallery.update(gallery);
    }
    // Modify Gallery Op

    // Modify Gallery Order Op
    $rootScope.updateGalleries = function(galleries){
        lightweight_firebase.media.gallery.reorder(galleries);
    }
    // Modify Gallery Order Op

    ///////////////////////////////////////////////////// Media Vault Database CRUD Operations
    ///////////////////////////////////////////////////// Media Vault Database CRUD Operations
    ///////////////////////////////////////////////////// Media Vault Database CRUD Operations












    

    

    ///////////////////////////////////////////////////// Lightweight Firebase Cloud Functions - Task Runner

    // Cloud Task Handler Types | app-endpoint
    // app-initial-load | lw000
    // lightweight-support-ticket | lw001
    // share-social | lw002
    // modify-account | lw003
    // modify-my-account | lw004
    // create-external-account | lw005
    // create-internal-account | lw006
    // view-item | lw007
    // pay-success | lw008
    // apply-code | lw009
    // calculate-shipping | lw010
    // send-lead | lw011
    // sign-up | lw012
    // sign-in | lw013
    // delete-account | lw014
    // forgot-password | lw015
    // reset-password | lw016
    // set-notification-permissions | lw017
    // rate-us | lw018
    // schedule-appointment | lw019
    // subscribe | lw020
    // share-internal-source | lw021
    // share-external-source | lw022
    // send-feedback | lw033
    // run-task | lw034

    // Cloud Task Handler Types | chron-endpoint
    // analytics-report | visits, payments, leads, signups, permissions-enabled, appointments-made, subscriptions, most-visited-pages, feedback-received, files-shared
    // reoccuring-task | custom

    ///////////////////////////////////////////////////// Lightweight Events

    // event = {}
    // event.clickpath = []
    // event.ip = user ip address
    // event.id = user.id
    // event.item = object.id
    // event.url
    // event.action [lightweight-support-ticket, share-social, modify-account, create-external-account, create-internal-account, view-item, pay, apply-code, calculate-shipping, send-lead, sign-up, sign-in, delete-account, forgot-password, reset-password, set-notification-permissions, rate-us, schedule-appointment, subscribe, share-internal-source, share-external-source, send-feedback]
    

    

    var notification_permission_check = function(){

    }

    ///////////////////////////////////////////////////// Lightweight Events
    ///////////////////////////////////////////////////// Lightweight Events
    ///////////////////////////////////////////////////// Lightweight Events

    // sets event object
    $rootScope.save_event_object = function(obj){
        lightweight_firebase.save_event(obj)
    }
    // sets event object

    // Variables for events
    var app_is_loaded = false;
    $rootScope.clickpath = [];
    $rootScope.ip_for_events;
    // Variables for events

    // On app load, retrieve user's ip address
    var getIP = new Promise(
        function (resolve, reject) {
            var result;
            $http({
                url: ("https://ipapi.co/json/"),
                method: 'GET'
            })
            .then(function success (response) {
                result = response;
                $rootScope.ip_for_events = result.data["ip"];
                resolve();
            }, function failure (response) {
                reject();
            });
        }
    );
    // On app load, retrieve user's ip address

    // creates initial click path entry
    $rootScope.clickpath.push($location.path());
    // creates initial click path entry

    // On page load and changes log event
    $rootScope.$on('$locationChangeSuccess', function() {

        if(app_is_loaded == true){

            $rootScope.clickpath.push($location.path());
            // getIP.then(function(){
            //     $rootScope.save_event_object({
            //         "clickpath": $rootScope.clickpath, 
            //         "user_id": $rootScope.me ? $rootScope.me.id : "blank",
            //         "user_ip": $rootScope.ip_for_events, 
            //         "payload": "blank",
            //         "timestamp": Date.now(), 
            //         "page": $location.path(), 
            //         "action": "route-change",
            //         "name": "Route Change",
            //         "task_id": "blank"
            //     });
            // });

        } 
        // else {
        //     getIP.then(function(){
        //         $rootScope.save_event_object({
        //             "clickpath": $rootScope.clickpath, 
        //             "user_id": $rootScope.me ? $rootScope.me.id : "blank",
        //             "user_ip": $rootScope.ip_for_events, 
        //             "payload": "blank",
        //             "timestamp": Date.now(), 
        //             "page": $location.path(), 
        //             "action": "app-initial-load",
        //             "name": "App Load",
        //             "task_id": "lw000"
        //         });
        //     });
        // }

        app_is_loaded = true; 

    });
    // On page load and changes log event

    // Handler for buttons where clicks create events
    $rootScope.click_event = function(e){
        // e.payload comes from button
        // e.action comes from button
        // e.task_id comes from button
        // e.name comes from button
        e.clickpath = $rootScope.clickpath;
        e.user_id = $rootScope.me ? $rootScope.me.id : "blank";
        e.user_ip = $rootScope.ip_for_events;
        e.timestamp = Date.now();
        e.page = $location.path();
        $rootScope.save_event_object(e);
    }
    // Handler for buttons where clicks create events

    ///////////////////////////////////////////////////// Lightweight Events
    ///////////////////////////////////////////////////// Lightweight Events
    ///////////////////////////////////////////////////// Lightweight Events
    



    

    // task.next_runtime
    // task.last_runtime

    // if delivery medium is dialog
    // task.media_source

    ///////////////////////////////////////////////////// Task Config
    // task.editable
    // task.locked
    // task.userID
    // task.handler | app-interaction, data-driven, chron-clock


    ///////////////////////////////////////////////////// Task Runner
    ///////////////////////////////////////////////////// Task Runner
    ///////////////////////////////////////////////////// Task Runner

    // task object
    $rootScope.task = {};
    // task object

    $rootScope.times = [
        "Closed", "6:30AM", "7:00AM", "7:30AM", "8:00AM", "8:30AM", "9:00AM", "9:30AM", "10:00AM", "10:30AM", "11:00AM", "11:30AM", "12:00PM", "12:30PM", "1:00PM", "1:30PM", "2:00PM", "2:30PM", "3:00PM", "3:30PM", "4:00PM", "4:30PM", "5:00PM", "5:30PM", "6:00PM", "6:30PM", "7:00PM", "7:30PM", "8:00PM"
    ];

    $rootScope.timesSans = [
        "6:30AM", "7:00AM", "7:30AM", "8:00AM", "8:30AM", "9:00AM", "9:30AM", "10:00AM", "10:30AM", "11:00AM", "11:30AM", "12:00PM", "12:30PM", "1:00PM", "1:30PM", "2:00PM", "2:30PM", "3:00PM", "3:30PM", "4:00PM", "4:30PM", "5:00PM", "5:30PM", "6:00PM", "6:30PM", "7:00PM", "7:30PM", "8:00PM"
    ];

    // Conditions

    $rootScope.app_trigger_types = [
        "action",
        "page-visit",
        "account"
        ];

    $rootScope.app_triggers = [
        "lightweight-support-ticket",
        "share-social",
        "create-external-account",
        "create-internal-account",
        "view-item",
        "pay-success",
        "pay-declined",
        "apply-code",
        "calculate-shipping",
        "send-lead",
        "sign-in",
        "rate-us",
        "schedule-appointment",
        "share-internal-source",
        "share-external-source",
        "send-feedback",
        "run-task",
        "app-initial-load"
    ];

    $rootScope.app_account_triggers = [
        "sign-up",
        "modify-account",
        "delete-account",
        "forgot-password",
        "reset-password",
        "set-notification-permissions",
        "subscribe",
        "unsubscribe",
        "pay-missed"
    ];

    $rootScope.app_inactive_triggers = [
        "30sec", 
        "1min", 
        "5min", 
        "30min"
    ];

    $rootScope.app_reporting_types = [
        "visits", 
        "payments",
        "late-payments",
        "leads", 
        "signups", 
        "permissions-enabled", 
        "appointments-made", 
        "subscriptions", 
        "most-visited-pages", 
        "feedback-received", 
        "files-shared"
    ];

    $rootScope.reoccuring_goods = [
        "14 days prior",
        "7 days prior",
        "1 day prior",
        "Due Date",
        "1 day late",
        "7 days late",
        "14 days late",
        "30 days late",
        "60 days late",
        "90 days late"
    ];

    // Conditions

    $scope.task_form_state = "null";

    $scope.alter_task_form_state = function(obj, state){

        if(state == "user generated"){

            obj.frequency = undefined;
            obj.run_week = undefined;
            obj.run_day = undefined;
            obj.specified_run_date = undefined;
            obj.run_clock_time = undefined;

        } else if (state == "onetime"){

            obj.frequency = undefined;
            obj.run_week = undefined;
            obj.run_day = undefined;
            obj.specified_run_date = undefined;
            obj.run_clock_time = undefined;
            obj.activity_trigger_types = undefined;
            obj.user_action_trigger = undefined;

        } else if (state == "manual"){

            obj.frequency = undefined;
            obj.run_week = undefined;
            obj.run_day = undefined;
            obj.specified_run_date = undefined;
            obj.run_clock_time = undefined;
            obj.activity_trigger_types = undefined;
            obj.user_action_trigger = undefined;

        } else if (state == "reoccuring"){

            obj.activity_trigger_types = undefined;
            obj.user_action_trigger = undefined;

        }

    }

    $rootScope.createTask = function(task){
        lightweight_firebase.put_task(task);
    };

    $rootScope.updateTask = function(task){
        lightweight_firebase.modify_task(task);
    };

    $rootScope.deleteTask = function(task){
        lightweight_firebase.delete_task(task);
    };

    // $rootScope.runTask = function(task, event){
    //     lightweight_firebase.run_task(task, null);
    // };


    ///////////////////////////////////////////////////// Task Runner
    ///////////////////////////////////////////////////// Task Runner
    ///////////////////////////////////////////////////// Task Runner
    
    





    $rootScope.clearForm = function(form){
        $rootScope.taskUpdateObj = {};
        $rootScope.taskAddObj = {};
        $rootScope.indexForm = {};
        $rootScope.spotlightForm = {};
        $rootScope.projectForm = {};
        $rootScope.blogForm = {};
        form.$setPristine();
        form.$setUntouched();
    }





    ///////////////////////////////////////////////////// Manage Staff
    ///////////////////////////////////////////////////// Manage Staff
    ///////////////////////////////////////////////////// Manage Staff

    $rootScope.switchViewStaff = function() {
        if($rootScope.staffgridview == false){
            $rootScope.staffgridview = true;
        } else {
            $rootScope.staffgridview = false;
        }
    }

    $rootScope.createStaff = function(){
        var staffObj = {};
        $rootScope.new_staff_member = true;
        $rootScope.settings.staff.members.unshift(staffObj);
        newStaffIndex = $rootScope.settings.staff.members.indexOf(staffObj);        
    }

    $rootScope.cancelStaff = function(){
        $rootScope.settings.staff.members.splice(0, 1);
        $rootScope.new_staff_member = false;
    }

    $rootScope.addStaffMember = function(new_staff){
        lightweight_firebase.put_staff(new_staff)
    }

    $rootScope.updateStaffMember = function(staff){
        lightweight_firebase.modify_staff(staff);
    }

    $rootScope.updateStaffOrder = function(staff){
        lightweight_firebase.modify_staff_order(staff);
    }

    $rootScope.updateStaff = function(staff_reorder){
        lightweight_firebase.put_staff(staff_reorder)
    }

    $rootScope.removeStaff = function(staff_member, staff){
        lightweight_firebase.delete_staff(staff_member, staff);
    }

    ///////////////////////////////////////////////////// Manage Staff
    ///////////////////////////////////////////////////// Manage Staff
    ///////////////////////////////////////////////////// Manage Staff









    ///////////////////////////////////////////////////// Add Pages
    ///////////////////////////////////////////////////// Add Pages
    ///////////////////////////////////////////////////// Add Pages

    $rootScope.addPage = function(type, data){
        lightweight_firebase.content.pages.create(type, data);
    }

    ///////////////////////////////////////////////////// Add Pages
    ///////////////////////////////////////////////////// Add Pages
    ///////////////////////////////////////////////////// Add Pages

    ///////////////////////////////////////////////////// Delete Pages
    ///////////////////////////////////////////////////// Delete Pages
    ///////////////////////////////////////////////////// Delete Pages

    $rootScope.deletePage = function(page_index){
        lightweight_firebase.content.pages.delete(page_index);
    }

    ///////////////////////////////////////////////////// Delete Pages
    ///////////////////////////////////////////////////// Delete Pages
    ///////////////////////////////////////////////////// Delete Pages
    
    ///////////////////////////////////////////////////// Crud Navigation
    ///////////////////////////////////////////////////// Crud Navigation
    ///////////////////////////////////////////////////// Crud Navigation

    $rootScope.parentNav = function(item){
        $rootScope.parentNavName = item.navigation.parent.name;
        $rootScope.child_nav_items = item.navigation.child.data;
    }

    $rootScope.addChildNavItem = function(){
        var childNavObj = {};
        childNavObj.enabled = true;
        $rootScope.child_nav_items.push(childNavObj);       
    }

    $rootScope.updateNavigation = function(){
        lightweight_firebase.content.navigation.update();
    }
    ///////////////////////////////////////////////////// Crud Navigation
    ///////////////////////////////////////////////////// Crud Navigation
    ///////////////////////////////////////////////////// Crud Navigation





    ///////////////////////////////////////////////////// Crud Settings
    $rootScope.updateSettings = function(){
        lightweight_firebase.content.settings.update();
    }
    ///////////////////////////////////////////////////// Crud Settings





    ///////////////////////////////////////////////////// Update App
    $rootScope.updateApp = function(element){
        lightweight_firebase.content.app.update(element);
    }
    ///////////////////////////////////////////////////// Update App








    ///////////////////////////////////////////////////// Send Lead
    $rootScope.sendLead = function(lead, source){
        var data = {
            recaptcha : lead.recaptcha,
            name : lead.name,
            email : lead.email,
            message : lead.message,
            source : source
        };
        $rootScope.progressAnimation = true;

        $http({
            url: ("https://us-central1-spsd-189118.cloudfunctions.net/lead"),
            method: 'POST',
            data: data
        })
        .then(function success (response) {
            $rootScope.messageStatus = true;
            $rootScope.progressAnimation = false;
            $timeout(function(){
               $rootScope.$broadcast('server-event', {
                    data:{
                        message: "Message Sent."
                    }
                });
            }, 500);
        }, function failure (response) {
            $rootScope.messageStatus = false;
            $rootScope.progressAnimation = false;
            $rootScope.$broadcast('server-event', {
                data:{
                message: 'Message Sending Failed.'
                }
            });
        });
    }
    ///////////////////////////////////////////////////// Send Lead



    ///////////////////////////////////////////////////// My Vault
    $rootScope.uploadIframeResource = function(user, iframe){
        lightweight_firebase.media.iframe.create(user, iframe);       
    }

    // Upload Files On Select
    $rootScope.uploadMyFiles = function(files, errFiles){
        lightweight_firebase.media.files.create(files, errFiles);
    }
    // Upload Files On Select



    $rootScope.deleteMyFile = function(me, file){
        lightweight_firebase.media.files.delete(me, file);
    };
    ///////////////////////////////////////////////////// My Vault


}]);




