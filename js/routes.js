define(['app'], function (app) {
    'use strict';
    app.config(['$stateProvider', '$urlRouterProvider',
            function ($stateProvider, $urlRouterProvider) {
                $stateProvider.state('mmx', {
            		url:'/mmx',
            		abstract:true,
            		templateUrl:'templates/menu.html',
                        controller: 'menuCtrl'
            	})
                  .state('mmx.personal', {
                        url:'/personal',
                        views: {
                              'menuContent': {  
                                    templateUrl:'templates/personal/personal.html',
                                    controller:'personalCtrl'
                              }
                        }     
                  })
                  .state('mmx.personalDetail', {
                        url:'/personal/detail',
                        views: {
                              'menuContent': {
                                    templateUrl: 'templates/personal/personalDetail.html',
                                    controller: 'accountCtrl'
                              }
                        }
                  })
                  .state('mmx.nameChange', {
                        url: '/personal/detail/changeName',
                        views: {
                              'menuContent': {
                                    templateUrl: 'templates/personal/changeName.html',
                                    controller: 'changeNameCtrl'
                              }
                        }
                  })
                  .state('mmx.phoneChange', {
                        url: '/personal/detail/changePhone',
                        views: {
                              'menuContent': {
                                    templateUrl: 'templates/personal/changePhone.html',
                                    controller: 'changePhoneCtrl'
                              }
                        }
                  })
                  .state('mmx.address', {
                        url: '/personal/detail/addressList',
                        views: {
                              'menuContent': {
                                    templateUrl: 'templates/personal/addressList.html',
                                    controller: 'addressListCtrl'
                              }
                        }
                  })
                  // .state('mmx.addressDetail', {
                  //       url: '/personal/detail/addressList/:id',
                  //       views: {
                  //             'menuContent': {
                  //                   templateUrl:'templates/personal/addressDetail.html',
                  //                   controller: 'addressListCtrl'
                  //             }
                  //       }
                  // })
            	.state('mmx.shops', {
            		url:'/shops',
            		views: {
            			'menuContent': {	
            				templateUrl:'templates/shops/shops.html',
            				controller:'shopsCtrl'
            			}
            		}	
            	})
                  .state('mmx.search', {
                        url:'/shops/search',
                        views: {
                              'menuContent': {
                                    templateUrl:'templates/shops/search.html',
                                    controller:'shopsCtrl'
                              }
                        }
                  })
            	.state('mmx.recommend', {
            		url:'/recommend',
            		views: {
            			'menuContent': {
            				templateUrl:'templates/recommend/recommend.html',
            				controller:'recommendCtrl'	
            			}
            		}
            	})
            	.state('mmx.friends', {
            		url:'/friends',
            		views: {
            			'menuContent': {
            				templateUrl:'templates/friends/friends.html',
            				controller:'friendsCtrl'	
            			}
            		}
            	})
            	.state('mmx.mmlist', {
            		url:'/mmlist',
            		views: {
            			'menuContent': {
            				templateUrl:'templates/mmlist/mmlist.html',
            				controller:'mmlistCtrl'	
            			}
            		}
            	})
            	.state('mmx.scanqr', {
            		url:'/scanqr',
            		views: {
            			'menuContent': {
            				templateUrl:'templates/scanqr/scanqr.html',
            				controller:'scanqrCtrl'	
            			}
            		}
            	})
                  .state('mmx.settings', {
                        url:'/settings',
                        views: {
                              'menuContent': {  
                                    templateUrl:'templates/settings/settings.html',
                                    controller:'settingsCtrl'
                              }
                        }     
                  })
                  .state('mmx.setting', {
                        url:'/settings/:option',
                        views: {
                              'menuContent': {
                                    templateUrl: function(sp) {
                                          return 'templates/settings/' + sp.option + '.html';
                                    },
                                    controller:'settingsCtrl'
                              }
                        }
                  })
                  .state('mmx.cities', {
                        url:'/selectCity',
                        views: {
                              'menuContent': {  
                                    templateUrl:'templates/cities/cities.html',
                                    controller:'citiesCtrl'
                              }
                        }     
                  })
                  .state('mmx.feedback', {
                        url:'/feedback',
                        views: {
                              'menuContent': {  
                                    templateUrl:'templates/feedback/feedback.html',
                                    controller:'feedbackCtrl'
                              }
                        }     
                  });

            	$urlRouterProvider.otherwise('/mmx/shops');
            }
    ]);
	
});