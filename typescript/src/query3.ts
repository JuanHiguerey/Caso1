import {MSSQL} from './jdbc';
import {Timer} from './timer';

var mssql: MSSQL = new MSSQL(10, true); // pool y cache

let db = mssql.GetDatabase();

var asyncjs = require('async');

var totalTime = 0;

// En jdbc.ts se configuran el pool y cache

db.reserve(function(err, connObj) {
    if (connObj) {
        var conn = connObj.conn;
        
        // Configuracion de la conexion
        asyncjs.series([
          function(callback) {
            conn.setAutoCommit(false, function(err) {
              if (err) {
                callback(err);
              } else {
                callback(null);
              }
            });
          }, function(callback) {
            conn.setAutoCommit(false, function(err) {
              if (err) {
                callback(err);
              } else {
                callback(null);
              }
            });
          },
          function(callback) {
            conn.setSchema("Caso1", function(err) {
              if (err) {
                callback(err);
              } else {
                callback(null);
              }
            });
          }
        ], function(err, results) {
        });

        // Ejecucion del Query 3 con los cantones que tienen menos entregables
        asyncjs.series([
            function(callback) {
              conn.createStatement(function(err, statement) {
                if (err) {
                  callback(err);
                } else {
                  var timer = new Timer;
                  statement.executeQuery("exec query3_min",
                                        function(err, resultset) {
                    if (err) {
                      callback(err);
                    } else {
                      totalTime += timer.GetTime();
                        resultset.toObjArray(function(err, results) {
                            if (results.length > 0) {
                                for(let i = 0; i < results.length; i++) {
                                    console.log("Party ID: " + results[i].party_id +
                                    " | Plan ID: " + results[i].plan_id+ 
                                    " | Canton ID: " + results[i].canton_id + 
                                    " | Min Count: " + results[i].count);
                                }
                            }
                            callback(null, resultset);
                        });
                    }
                  });
                }
              });
            }, function(callback) {
              conn.createStatement(function(err, statement) {
                if (err) {
                  callback(err);
                } else {
                  var timer = new Timer;
                  statement.executeQuery("exec query3_min",
                                        function(err, resultset) {
                    if (err) {
                      callback(err);
                    } else {
                      totalTime += timer.GetTime();
                        resultset.toObjArray(function(err, results) {
                            if (results.length > 0) {
                                for(let i = 0; i < results.length; i++) {
                                    console.log("Party ID: " + results[i].party_id +
                                    " | Plan ID: " + results[i].plan_id+ 
                                    " | Canton ID: " + results[i].canton_id + 
                                    " | Min Count: " + results[i].count);
                                }
                            }
                            callback(null, resultset);
                        });
                    }
                  });
                }
              });
            }, function(callback) {
                conn.createStatement(function(err, statement) {
                  if (err) {
                    callback(err);
                  } else {
                    var timer = new Timer;
                    statement.executeQuery("exec query3_min",
                                        function(err, resultset) {
                    if (err) {
                      callback(err);
                    } else {
                      totalTime += timer.GetTime();
                        resultset.toObjArray(function(err, results) {
                            if (results.length > 0) {
                                for(let i = 0; i < results.length; i++) {
                                    console.log("Party ID: " + results[i].party_id +
                                    " | Plan ID: " + results[i].plan_id+ 
                                    " | Canton ID: " + results[i].canton_id + 
                                    " | Min Count: " + results[i].count);
                                }
                              }
                              callback(null, resultset);
                          });
                      }
                    });
                  }
                });
              }, function(callback) {
                conn.createStatement(function(err, statement) {
                  if (err) {
                    callback(err);
                  } else {
                    var timer = new Timer;
                    statement.executeQuery("exec query3_min",
                                        function(err, resultset) {
                    if (err) {
                      callback(err);
                    } else {
                      totalTime += timer.GetTime();
                        resultset.toObjArray(function(err, results) {
                            if (results.length > 0) {
                                for(let i = 0; i < results.length; i++) {
                                    console.log("Party ID: " + results[i].party_id +
                                    " | Plan ID: " + results[i].plan_id+ 
                                    " | Canton ID: " + results[i].canton_id + 
                                    " | Min Count: " + results[i].count);
                                }
                              }
                              callback(null, resultset);
                          });
                      }
                    });
                  }
                });
              }, function(callback) {
                conn.createStatement(function(err, statement) {
                  if (err) {
                    callback(err);
                  } else {
                    var timer = new Timer;
                    statement.executeQuery("exec query3_min",
                                        function(err, resultset) {
                    if (err) {
                      callback(err);
                    } else {
                      totalTime += timer.GetTime();
                        resultset.toObjArray(function(err, results) {
                            if (results.length > 0) {
                                for(let i = 0; i < results.length; i++) {
                                    console.log("Party ID: " + results[i].party_id +
                                    " | Plan ID: " + results[i].plan_id+ 
                                    " | Canton ID: " + results[i].canton_id + 
                                    " | Min Count: " + results[i].count);
                                }
                              }
                              callback(null, resultset);
                          });
                      }
                    });
                  }
                });
              }, function(callback) {
                conn.createStatement(function(err, statement) {
                  if (err) {
                    callback(err);
                  } else {
                    var timer = new Timer;
                    statement.executeQuery("exec query3_min",
                                        function(err, resultset) {
                    if (err) {
                      callback(err);
                    } else {
                      totalTime += timer.GetTime();
                        resultset.toObjArray(function(err, results) {
                            if (results.length > 0) {
                                for(let i = 0; i < results.length; i++) {
                                    console.log("Party ID: " + results[i].party_id +
                                    " | Plan ID: " + results[i].plan_id+ 
                                    " | Canton ID: " + results[i].canton_id + 
                                    " | Min Count: " + results[i].count);
                                }
                              }
                              callback(null, resultset);
                          });
                      }
                    });
                  }
                });
              }, function(callback) {
                conn.createStatement(function(err, statement) {
                  if (err) {
                    callback(err);
                  } else {
                    var timer = new Timer;
                    statement.executeQuery("exec query3_min",
                                        function(err, resultset) {
                    if (err) {
                      callback(err);
                    } else {
                      totalTime += timer.GetTime();
                        resultset.toObjArray(function(err, results) {
                            if (results.length > 0) {
                                for(let i = 0; i < results.length; i++) {
                                    console.log("Party ID: " + results[i].party_id +
                                    " | Plan ID: " + results[i].plan_id+ 
                                    " | Canton ID: " + results[i].canton_id + 
                                    " | Min Count: " + results[i].count);
                                }
                              }
                              callback(null, resultset);
                          });
                      }
                    });
                  }
                });
              }, function(callback) {
                conn.createStatement(function(err, statement) {
                  if (err) {
                    callback(err);
                  } else {
                    var timer = new Timer;
                    statement.executeQuery("exec query3_min",
                                        function(err, resultset) {
                    if (err) {
                      callback(err);
                    } else {
                      totalTime += timer.GetTime();
                        resultset.toObjArray(function(err, results) {
                            if (results.length > 0) {
                                for(let i = 0; i < results.length; i++) {
                                    console.log("Party ID: " + results[i].party_id +
                                    " | Plan ID: " + results[i].plan_id+ 
                                    " | Canton ID: " + results[i].canton_id + 
                                    " | Min Count: " + results[i].count);
                                }
                              }
                              callback(null, resultset);
                          });
                      }
                    });
                  }
                });
              }, function(callback) {
                conn.createStatement(function(err, statement) {
                  if (err) {
                    callback(err);
                  } else {
                    var timer = new Timer;
                   statement.executeQuery("exec query3_min",
                                        function(err, resultset) {
                    if (err) {
                      callback(err);
                    } else {
                      totalTime += timer.GetTime();
                        resultset.toObjArray(function(err, results) {
                            if (results.length > 0) {
                                for(let i = 0; i < results.length; i++) {
                                    console.log("Party ID: " + results[i].party_id +
                                    " | Plan ID: " + results[i].plan_id+ 
                                    " | Canton ID: " + results[i].canton_id + 
                                    " | Min Count: " + results[i].count);
                                }
                              }
                              callback(null, resultset);
                          });
                      }
                    });
                  }
                });
              }, function(callback) {
                conn.createStatement(function(err, statement) {
                  if (err) {
                    callback(err);
                  } else {
                    var timer = new Timer;
                    statement.executeQuery("exec query3_min",
                                        function(err, resultset) {
                    if (err) {
                      callback(err);
                    } else {
                      totalTime += timer.GetTime();
                        resultset.toObjArray(function(err, results) {
                            if (results.length > 0) {
                                for(let i = 0; i < results.length; i++) {
                                    console.log("Party ID: " + results[i].party_id +
                                    " | Plan ID: " + results[i].plan_id+ 
                                    " | Canton ID: " + results[i].canton_id + 
                                    " | Min Count: " + results[i].count);
                                }
                              }
                              callback(null, resultset);
                          });
                      }
                    });
                  }
                });
              }
        ], function(err, results) {
            db.release(connObj, function(err) {
              if (err) {
                console.log(err.message);
              }
            });
          });
    }
});

var asyncjs2 = require('async');
db.reserve(function(err, connObj) {
  if (connObj) {
      var conn = connObj.conn;
      
      // Configuracion de la conexion
      asyncjs2.series([
        function(callback) {
          conn.setAutoCommit(false, function(err) {
            if (err) {
              callback(err);
            } else {
              callback(null);
            }
          });
        }, function(callback) {
          conn.setAutoCommit(false, function(err) {
            if (err) {
              callback(err);
            } else {
              callback(null);
            }
          });
        },
        function(callback) {
          conn.setSchema("Caso1", function(err) {
            if (err) {
              callback(err);
            } else {
              callback(null);
            }
          });
        }
      ], function(err, results) {
      });

      // Ejecucion del Query 3 con los cantones que tienen mas entregables
      asyncjs2.series([
          function(callback) {
            conn.createStatement(function(err, statement) {
              if (err) {
                callback(err);
              } else {
                var timer = new Timer;
                statement.executeQuery("exec query3_max",
                                      function(err, resultset) {
                  if (err) {
                    callback(err);
                  } else {
                    totalTime += timer.GetTime();
                      resultset.toObjArray(function(err, results) {
                          if (results.length > 0) {
                              for(let i = 0; i < results.length; i++) {
                                  console.log("Party ID: " + results[i].party_id +
                                  " | Plan ID: " + results[i].plan_id+ 
                                  " | Canton ID: " + results[i].canton_id + 
                                  " | Max Count: " + results[i].count);
                              }
                          }
                          callback(null, resultset);
                      });
                  }
                });
              }
            });
          }, function(callback) {
            conn.createStatement(function(err, statement) {
              if (err) {
                callback(err);
              } else {
                var timer = new Timer;
                statement.executeQuery("exec query3_max",
                                      function(err, resultset) {
                  if (err) {
                    callback(err);
                  } else {
                    totalTime += timer.GetTime();
                      resultset.toObjArray(function(err, results) {
                          if (results.length > 0) {
                              for(let i = 0; i < results.length; i++) {
                                  console.log("Party ID: " + results[i].party_id +
                                  " | Plan ID: " + results[i].plan_id+ 
                                  " | Canton ID: " + results[i].canton_id + 
                                  " | Max Count: " + results[i].count);
                              }
                          }
                          callback(null, resultset);
                      });
                  }
                });
              }
            });
          }, function(callback) {
              conn.createStatement(function(err, statement) {
                if (err) {
                  callback(err);
                } else {
                  var timer = new Timer;
                  statement.executeQuery("exec query3_max",
                                      function(err, resultset) {
                  if (err) {
                    callback(err);
                  } else {
                    totalTime += timer.GetTime();
                      resultset.toObjArray(function(err, results) {
                          if (results.length > 0) {
                              for(let i = 0; i < results.length; i++) {
                                  console.log("Party ID: " + results[i].party_id +
                                  " | Plan ID: " + results[i].plan_id+ 
                                  " | Canton ID: " + results[i].canton_id + 
                                  " | Max Count: " + results[i].count);
                              }
                            }
                            callback(null, resultset);
                        });
                    }
                  });
                }
              });
            }, function(callback) {
              conn.createStatement(function(err, statement) {
                if (err) {
                  callback(err);
                } else {
                  var timer = new Timer;
                  statement.executeQuery("exec query3_max",
                                      function(err, resultset) {
                  if (err) {
                    callback(err);
                  } else {
                    totalTime += timer.GetTime();
                      resultset.toObjArray(function(err, results) {
                          if (results.length > 0) {
                              for(let i = 0; i < results.length; i++) {
                                  console.log("Party ID: " + results[i].party_id +
                                  " | Plan ID: " + results[i].plan_id+ 
                                  " | Canton ID: " + results[i].canton_id + 
                                  " | Max Count: " + results[i].count);
                              }
                            }
                            callback(null, resultset);
                        });
                    }
                  });
                }
              });
            }, function(callback) {
              conn.createStatement(function(err, statement) {
                if (err) {
                  callback(err);
                } else {
                  var timer = new Timer;
                  statement.executeQuery("exec query3_max",
                                      function(err, resultset) {
                  if (err) {
                    callback(err);
                  } else {
                    totalTime += timer.GetTime();
                      resultset.toObjArray(function(err, results) {
                          if (results.length > 0) {
                              for(let i = 0; i < results.length; i++) {
                                  console.log("Party ID: " + results[i].party_id +
                                  " | Plan ID: " + results[i].plan_id+ 
                                  " | Canton ID: " + results[i].canton_id + 
                                  " | Max Count: " + results[i].count);
                              }
                            }
                            callback(null, resultset);
                        });
                    }
                  });
                }
              });
            }, function(callback) {
              conn.createStatement(function(err, statement) {
                if (err) {
                  callback(err);
                } else {
                  var timer = new Timer;
                  statement.executeQuery("exec query3_max",
                                      function(err, resultset) {
                  if (err) {
                    callback(err);
                  } else {
                    totalTime += timer.GetTime();
                      resultset.toObjArray(function(err, results) {
                          if (results.length > 0) {
                              for(let i = 0; i < results.length; i++) {
                                  console.log("Party ID: " + results[i].party_id +
                                  " | Plan ID: " + results[i].plan_id+ 
                                  " | Canton ID: " + results[i].canton_id + 
                                  " | Max Count: " + results[i].count);
                              }
                            }
                            callback(null, resultset);
                        });
                    }
                  });
                }
              });
            }, function(callback) {
              conn.createStatement(function(err, statement) {
                if (err) {
                  callback(err);
                } else {
                  var timer = new Timer;
                  statement.executeQuery("exec query3_max",
                                      function(err, resultset) {
                  if (err) {
                    callback(err);
                  } else {
                    totalTime += timer.GetTime();
                      resultset.toObjArray(function(err, results) {
                          if (results.length > 0) {
                              for(let i = 0; i < results.length; i++) {
                                  console.log("Party ID: " + results[i].party_id +
                                  " | Plan ID: " + results[i].plan_id+ 
                                  " | Canton ID: " + results[i].canton_id + 
                                  " | Max Count: " + results[i].count);
                              }
                            }
                            callback(null, resultset);
                        });
                    }
                  });
                }
              });
            }, function(callback) {
              conn.createStatement(function(err, statement) {
                if (err) {
                  callback(err);
                } else {
                  var timer = new Timer;
                  statement.executeQuery("exec query3_max",
                                      function(err, resultset) {
                  if (err) {
                    callback(err);
                  } else {
                    totalTime += timer.GetTime();
                      resultset.toObjArray(function(err, results) {
                          if (results.length > 0) {
                              for(let i = 0; i < results.length; i++) {
                                  console.log("Party ID: " + results[i].party_id +
                                  " | Plan ID: " + results[i].plan_id+ 
                                  " | Canton ID: " + results[i].canton_id + 
                                  " | Max Count: " + results[i].count);
                              }
                            }
                            callback(null, resultset);
                        });
                    }
                  });
                }
              });
            }, function(callback) {
              conn.createStatement(function(err, statement) {
                if (err) {
                  callback(err);
                } else {
                  var timer = new Timer;
                 statement.executeQuery("exec query3_max",
                                      function(err, resultset) {
                  if (err) {
                    callback(err);
                  } else {
                    totalTime += timer.GetTime();
                      resultset.toObjArray(function(err, results) {
                          if (results.length > 0) {
                              for(let i = 0; i < results.length; i++) {
                                  console.log("Party ID: " + results[i].party_id +
                                  " | Plan ID: " + results[i].plan_id+ 
                                  " | Canton ID: " + results[i].canton_id + 
                                  " | Max Count: " + results[i].count);
                              }
                            }
                            callback(null, resultset);
                        });
                    }
                  });
                }
              });
            }, function(callback) {
              conn.createStatement(function(err, statement) {
                if (err) {
                  callback(err);
                } else {
                  var timer = new Timer;
                  statement.executeQuery("exec query3_max",
                                      function(err, resultset) {
                  if (err) {
                    callback(err);
                  } else {
                    totalTime += timer.GetTime();
                      resultset.toObjArray(function(err, results) {
                          if (results.length > 0) {
                              for(let i = 0; i < results.length; i++) {
                                  console.log("Party ID: " + results[i].party_id +
                                  " | Plan ID: " + results[i].plan_id+ 
                                  " | Canton ID: " + results[i].canton_id + 
                                  " | Max Count: " + results[i].count);
                              }
                            }
                            callback(null, resultset);
                        });
                    }
                  });
                }
              });
            }
      ], function(err, results) {
          db.release(connObj, function(err) {
            if (err) {
              console.log(err.message);
            }
          });
        });
  }
});

setTimeout(function() {
    console.log("Query 3 Time: " + totalTime + " ms");
  }, 1000);