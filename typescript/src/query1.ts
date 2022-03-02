import {MSSQL} from './jdbc';
import {Timer} from './timer';

var mssql: MSSQL = new MSSQL(0, false); // sin pool ni cache

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

        // Ejecucion del Query 1 en 10 hilos, cada hilo con un canton diferente
        asyncjs.series([
            function(callback) {
              conn.createStatement(function(err, statement) {
                if (err) {
                  callback(err);
                } else {
                  var timer = new Timer;
                  statement.executeQuery("exec query1 'Fteliá'",
                                        function(err, resultset) {
                    if (err) {
                      callback(err);
                    } else {
                      totalTime += timer.GetTime();
                        resultset.toObjArray(function(err, results) {
                            if (results.length > 0) {
                                for(let i = 0; i < results.length; i++) {
                                    console.log("Plan ID: " + results[i].id +
                                    " | Action ID: " + results[i].action_id+ 
                                    " | Party: " + results[i].name + 
                                    " | KPI_Type: " + results[i].kpi_type +
                                    " | KPI_Value: " + results[i].kpi_value);
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
                  statement.executeQuery("exec query1 'Abovyan'",
                                        function(err, resultset) {
                    if (err) {
                      callback(err);
                    } else {
                      totalTime += timer.GetTime();
                        resultset.toObjArray(function(err, results) {
                            if (results.length > 0) {
                                for(let i = 0; i < results.length; i++) {
                                    console.log("Plan ID: " + results[i].id +
                                    " | Action ID: " + results[i].action_id+ 
                                    " | Party: " + results[i].name + 
                                    " | KPI_Type: " + results[i].kpi_type +
                                    " | KPI_Value: " + results[i].kpi_value);
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
                    statement.executeQuery("exec query1 'Sardoal'",
                                          function(err, resultset) {
                      if (err) {
                        callback(err);
                      } else {
                        totalTime += timer.GetTime();
                          resultset.toObjArray(function(err, results) {
                              if (results.length > 0) {
                                for(let i = 0; i < results.length; i++) {
                                    console.log("Plan ID: " + results[i].id +
                                    " | Action ID: " + results[i].action_id+ 
                                    " | Party: " + results[i].name + 
                                    " | KPI_Type: " + results[i].kpi_type +
                                    " | KPI_Value: " + results[i].kpi_value);
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
                    statement.executeQuery("exec query1 'Jungkat Selatan'",
                                          function(err, resultset) {
                      if (err) {
                        callback(err);
                      } else {
                        totalTime += timer.GetTime();
                          resultset.toObjArray(function(err, results) {
                              if (results.length > 0) {
                                for(let i = 0; i < results.length; i++) {
                                    console.log("Plan ID: " + results[i].id +
                                    " | Action ID: " + results[i].action_id+ 
                                    " | Party: " + results[i].name + 
                                    " | KPI_Type: " + results[i].kpi_type +
                                    " | KPI_Value: " + results[i].kpi_value);
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
                    statement.executeQuery("exec query1 'Margara'",
                                          function(err, resultset) {
                      if (err) {
                        callback(err);
                      } else {
                        totalTime += timer.GetTime();
                          resultset.toObjArray(function(err, results) {
                              if (results.length > 0) {
                                for(let i = 0; i < results.length; i++) {
                                    console.log("Plan ID: " + results[i].id +
                                    " | Action ID: " + results[i].action_id+ 
                                    " | Party: " + results[i].name + 
                                    " | KPI_Type: " + results[i].kpi_type +
                                    " | KPI_Value: " + results[i].kpi_value);
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
                    statement.executeQuery("exec query1 'Matsue-shi'",
                                          function(err, resultset) {
                      if (err) {
                        callback(err);
                      } else {
                        totalTime += timer.GetTime();
                          resultset.toObjArray(function(err, results) {
                              if (results.length > 0) {
                                for(let i = 0; i < results.length; i++) {
                                    console.log("Plan ID: " + results[i].id +
                                    " | Action ID: " + results[i].action_id+ 
                                    " | Party: " + results[i].name + 
                                    " | KPI_Type: " + results[i].kpi_type +
                                    " | KPI_Value: " + results[i].kpi_value);
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
                    statement.executeQuery("exec query1 'Pisan'",
                                          function(err, resultset) {
                      if (err) {
                        callback(err);
                      } else {
                        totalTime += timer.GetTime();
                          resultset.toObjArray(function(err, results) {
                              if (results.length > 0) {
                                for(let i = 0; i < results.length; i++) {
                                    console.log("Plan ID: " + results[i].id +
                                    " | Action ID: " + results[i].action_id+ 
                                    " | Party: " + results[i].name + 
                                    " | KPI_Type: " + results[i].kpi_type +
                                    " | KPI_Value: " + results[i].kpi_value);
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
                    statement.executeQuery("exec query1 'Amargosa'",
                                          function(err, resultset) {
                      if (err) {
                        callback(err);
                      } else {
                        totalTime += timer.GetTime();
                          resultset.toObjArray(function(err, results) {
                              if (results.length > 0) {
                                for(let i = 0; i < results.length; i++) {
                                    console.log("Plan ID: " + results[i].id +
                                    " | Action ID: " + results[i].action_id+ 
                                    " | Party: " + results[i].name + 
                                    " | KPI_Type: " + results[i].kpi_type +
                                    " | KPI_Value: " + results[i].kpi_value);
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
                    statement.executeQuery("exec query1 'Furukawa'",
                                          function(err, resultset) {
                      if (err) {
                        callback(err);
                      } else {
                        totalTime += timer.GetTime();
                          resultset.toObjArray(function(err, results) {
                              if (results.length > 0) {
                                for(let i = 0; i < results.length; i++) {
                                    console.log("Plan ID: " + results[i].id +
                                    " | Action ID: " + results[i].action_id+ 
                                    " | Party: " + results[i].name + 
                                    " | KPI_Type: " + results[i].kpi_type +
                                    " | KPI_Value: " + results[i].kpi_value);
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
                    statement.executeQuery("exec query1 'Elmira'",
                                          function(err, resultset) {
                      if (err) {
                        callback(err);
                      } else {
                        totalTime += timer.GetTime();
                          resultset.toObjArray(function(err, results) {
                              if (results.length > 0) {
                                for(let i = 0; i < results.length; i++) {
                                    console.log("Plan ID: " + results[i].id +
                                    " | Action ID: " + results[i].action_id+ 
                                    " | Party: " + results[i].name + 
                                    " | KPI_Type: " + results[i].kpi_type +
                                    " | KPI_Value: " + results[i].kpi_value);
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
    console.log("Query 1 Time: " + totalTime + " ms");
  }, 1000);