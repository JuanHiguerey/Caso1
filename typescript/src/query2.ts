import {MSSQL} from './jdbc';
import {Timer} from './timer';

var mssql: MSSQL = new MSSQL(10, false); // pool de 10, no cache

let db = mssql.GetDatabase();

var asyncjs = require('async');

var totalTime = 0;

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

        // Ejecucion del Query 2 en 10 hilos cada uno usando una conexion del pool
        asyncjs.series([
            function(callback) {
              conn.createStatement(function(err, statement) {
                if (err) {
                  callback(err);
                } else {
                  var timer = new Timer;
                  timer.Start;
                  statement.executeQuery("SELECT DISTINCT Q.canton_id, \
                                        COUNT(*) OVER(PARTITION BY Q.canton_id) deliverable_count \
                                        FROM \
                                        ( \
                                        SELECT canton_id, party_count FROM \
                                        ( \
                                        SELECT DISTINCT canton_id, \
                                        COUNT(*) OVER(PARTITION BY canton_id) party_count \
                                        FROM \
                                        ( \
                                        SELECT DISTINCT canton_id, party_id FROM Deliverables \
                                        JOIN Plans ON Plans.id = Deliverables.plan_id \
                                        ) Q \
                                        ) Q \
                                        GROUP BY canton_id, party_count \
                                        HAVING party_count <= (SELECT COUNT(id) / 4 FROM Parties) \
                                        ) Q \
                                        JOIN Deliverables ON Q.canton_id = Deliverables.canton_id",
                                        function(err, resultset) {
                    if (err) {
                      callback(err);
                    } else {
                      totalTime += timer.GetTime();
                        resultset.toObjArray(function(err, results) {
                            if (results.length > 0) {
                                for(let i = 0; i < results.length; i++) {
                                    console.log("Canton ID: " + results[i].canton_id + 
                                    " | Count: " + results[i].deliverable_count);
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
                  timer.Start;
                  statement.executeQuery("SELECT DISTINCT Q.canton_id, \
                                        COUNT(*) OVER(PARTITION BY Q.canton_id) deliverable_count \
                                        FROM \
                                        ( \
                                        SELECT canton_id, party_count FROM \
                                        ( \
                                        SELECT DISTINCT canton_id, \
                                        COUNT(*) OVER(PARTITION BY canton_id) party_count \
                                        FROM \
                                        ( \
                                        SELECT DISTINCT canton_id, party_id FROM Deliverables \
                                        JOIN Plans ON Plans.id = Deliverables.plan_id \
                                        ) Q \
                                        ) Q \
                                        GROUP BY canton_id, party_count \
                                        HAVING party_count <= (SELECT COUNT(id) / 4 FROM Parties) \
                                        ) Q \
                                        JOIN Deliverables ON Q.canton_id = Deliverables.canton_id",
                                        function(err, resultset) {
                    if (err) {
                      callback(err);
                    } else {
                      totalTime += timer.GetTime();
                        resultset.toObjArray(function(err, results) {
                            if (results.length > 0) {
                                for(let i = 0; i < results.length; i++) {
                                    console.log("Canton ID: " + results[i].canton_id + 
                                    " | Count: " + results[i].deliverable_count);
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
                  timer.Start;
                  statement.executeQuery("SELECT DISTINCT Q.canton_id, \
                                        COUNT(*) OVER(PARTITION BY Q.canton_id) deliverable_count \
                                        FROM \
                                        ( \
                                        SELECT canton_id, party_count FROM \
                                        ( \
                                        SELECT DISTINCT canton_id, \
                                        COUNT(*) OVER(PARTITION BY canton_id) party_count \
                                        FROM \
                                        ( \
                                        SELECT DISTINCT canton_id, party_id FROM Deliverables \
                                        JOIN Plans ON Plans.id = Deliverables.plan_id \
                                        ) Q \
                                        ) Q \
                                        GROUP BY canton_id, party_count \
                                        HAVING party_count <= (SELECT COUNT(id) / 4 FROM Parties) \
                                        ) Q \
                                        JOIN Deliverables ON Q.canton_id = Deliverables.canton_id",
                                        function(err, resultset) {
                    if (err) {
                      callback(err);
                    } else {
                      totalTime += timer.GetTime();
                        resultset.toObjArray(function(err, results) {
                            if (results.length > 0) {
                                for(let i = 0; i < results.length; i++) {
                                    console.log("Canton ID: " + results[i].canton_id + 
                                    " | Count: " + results[i].deliverable_count);
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
                  timer.Start;
                  statement.executeQuery("SELECT DISTINCT Q.canton_id, \
                                        COUNT(*) OVER(PARTITION BY Q.canton_id) deliverable_count \
                                        FROM \
                                        ( \
                                        SELECT canton_id, party_count FROM \
                                        ( \
                                        SELECT DISTINCT canton_id, \
                                        COUNT(*) OVER(PARTITION BY canton_id) party_count \
                                        FROM \
                                        ( \
                                        SELECT DISTINCT canton_id, party_id FROM Deliverables \
                                        JOIN Plans ON Plans.id = Deliverables.plan_id \
                                        ) Q \
                                        ) Q \
                                        GROUP BY canton_id, party_count \
                                        HAVING party_count <= (SELECT COUNT(id) / 4 FROM Parties) \
                                        ) Q \
                                        JOIN Deliverables ON Q.canton_id = Deliverables.canton_id",
                                        function(err, resultset) {
                    if (err) {
                      callback(err);
                    } else {
                      totalTime += timer.GetTime();
                        resultset.toObjArray(function(err, results) {
                            if (results.length > 0) {
                                for(let i = 0; i < results.length; i++) {
                                    console.log("Canton ID: " + results[i].canton_id + 
                                    " | Count: " + results[i].deliverable_count);
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
                  timer.Start;
                  statement.executeQuery("SELECT DISTINCT Q.canton_id, \
                                        COUNT(*) OVER(PARTITION BY Q.canton_id) deliverable_count \
                                        FROM \
                                        ( \
                                        SELECT canton_id, party_count FROM \
                                        ( \
                                        SELECT DISTINCT canton_id, \
                                        COUNT(*) OVER(PARTITION BY canton_id) party_count \
                                        FROM \
                                        ( \
                                        SELECT DISTINCT canton_id, party_id FROM Deliverables \
                                        JOIN Plans ON Plans.id = Deliverables.plan_id \
                                        ) Q \
                                        ) Q \
                                        GROUP BY canton_id, party_count \
                                        HAVING party_count <= (SELECT COUNT(id) / 4 FROM Parties) \
                                        ) Q \
                                        JOIN Deliverables ON Q.canton_id = Deliverables.canton_id",
                                        function(err, resultset) {
                    if (err) {
                      callback(err);
                    } else {
                      totalTime += timer.GetTime();
                        resultset.toObjArray(function(err, results) {
                            if (results.length > 0) {
                                for(let i = 0; i < results.length; i++) {
                                    console.log("Canton ID: " + results[i].canton_id + 
                                    " | Count: " + results[i].deliverable_count);
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
                  timer.Start;
                  statement.executeQuery("SELECT DISTINCT Q.canton_id, \
                                        COUNT(*) OVER(PARTITION BY Q.canton_id) deliverable_count \
                                        FROM \
                                        ( \
                                        SELECT canton_id, party_count FROM \
                                        ( \
                                        SELECT DISTINCT canton_id, \
                                        COUNT(*) OVER(PARTITION BY canton_id) party_count \
                                        FROM \
                                        ( \
                                        SELECT DISTINCT canton_id, party_id FROM Deliverables \
                                        JOIN Plans ON Plans.id = Deliverables.plan_id \
                                        ) Q \
                                        ) Q \
                                        GROUP BY canton_id, party_count \
                                        HAVING party_count <= (SELECT COUNT(id) / 4 FROM Parties) \
                                        ) Q \
                                        JOIN Deliverables ON Q.canton_id = Deliverables.canton_id",
                                        function(err, resultset) {
                    if (err) {
                      callback(err);
                    } else {
                        totalTime += timer.GetTime();
                        resultset.toObjArray(function(err, results) {
                            if (results.length > 0) {
                                for(let i = 0; i < results.length; i++) {
                                    console.log("Canton ID: " + results[i].canton_id + 
                                    " | Count: " + results[i].deliverable_count);
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
                  timer.Start;
                  statement.executeQuery("SELECT DISTINCT Q.canton_id, \
                                        COUNT(*) OVER(PARTITION BY Q.canton_id) deliverable_count \
                                        FROM \
                                        ( \
                                        SELECT canton_id, party_count FROM \
                                        ( \
                                        SELECT DISTINCT canton_id, \
                                        COUNT(*) OVER(PARTITION BY canton_id) party_count \
                                        FROM \
                                        ( \
                                        SELECT DISTINCT canton_id, party_id FROM Deliverables \
                                        JOIN Plans ON Plans.id = Deliverables.plan_id \
                                        ) Q \
                                        ) Q \
                                        GROUP BY canton_id, party_count \
                                        HAVING party_count <= (SELECT COUNT(id) / 4 FROM Parties) \
                                        ) Q \
                                        JOIN Deliverables ON Q.canton_id = Deliverables.canton_id",
                                        function(err, resultset) {
                    if (err) {
                      callback(err);
                    } else {
                      totalTime += timer.GetTime();
                        resultset.toObjArray(function(err, results) {
                            if (results.length > 0) {
                                for(let i = 0; i < results.length; i++) {
                                    console.log("Canton ID: " + results[i].canton_id + 
                                    " | Count: " + results[i].deliverable_count);
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
                  timer.Start;
                  statement.executeQuery("SELECT DISTINCT Q.canton_id, \
                                        COUNT(*) OVER(PARTITION BY Q.canton_id) deliverable_count \
                                        FROM \
                                        ( \
                                        SELECT canton_id, party_count FROM \
                                        ( \
                                        SELECT DISTINCT canton_id, \
                                        COUNT(*) OVER(PARTITION BY canton_id) party_count \
                                        FROM \
                                        ( \
                                        SELECT DISTINCT canton_id, party_id FROM Deliverables \
                                        JOIN Plans ON Plans.id = Deliverables.plan_id \
                                        ) Q \
                                        ) Q \
                                        GROUP BY canton_id, party_count \
                                        HAVING party_count <= (SELECT COUNT(id) / 4 FROM Parties) \
                                        ) Q \
                                        JOIN Deliverables ON Q.canton_id = Deliverables.canton_id",
                                        function(err, resultset) {
                    if (err) {
                      callback(err);
                    } else {
                      totalTime += timer.GetTime();
                        resultset.toObjArray(function(err, results) {
                            if (results.length > 0) {
                                for(let i = 0; i < results.length; i++) {
                                    console.log("Canton ID: " + results[i].canton_id + 
                                    " | Count: " + results[i].deliverable_count);
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
                  timer.Start;
                  statement.executeQuery("SELECT DISTINCT Q.canton_id, \
                                        COUNT(*) OVER(PARTITION BY Q.canton_id) deliverable_count \
                                        FROM \
                                        ( \
                                        SELECT canton_id, party_count FROM \
                                        ( \
                                        SELECT DISTINCT canton_id, \
                                        COUNT(*) OVER(PARTITION BY canton_id) party_count \
                                        FROM \
                                        ( \
                                        SELECT DISTINCT canton_id, party_id FROM Deliverables \
                                        JOIN Plans ON Plans.id = Deliverables.plan_id \
                                        ) Q \
                                        ) Q \
                                        GROUP BY canton_id, party_count \
                                        HAVING party_count <= (SELECT COUNT(id) / 4 FROM Parties) \
                                        ) Q \
                                        JOIN Deliverables ON Q.canton_id = Deliverables.canton_id",
                                        function(err, resultset) {
                    if (err) {
                      callback(err);
                    } else {
                      totalTime += timer.GetTime();
                        resultset.toObjArray(function(err, results) {
                            if (results.length > 0) {
                                for(let i = 0; i < results.length; i++) {
                                    console.log("Canton ID: " + results[i].canton_id + 
                                    " | Count: " + results[i].deliverable_count);
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
                  timer.Start;
                  statement.executeQuery("SELECT DISTINCT Q.canton_id, \
                                        COUNT(*) OVER(PARTITION BY Q.canton_id) deliverable_count \
                                        FROM \
                                        ( \
                                        SELECT canton_id, party_count FROM \
                                        ( \
                                        SELECT DISTINCT canton_id, \
                                        COUNT(*) OVER(PARTITION BY canton_id) party_count \
                                        FROM \
                                        ( \
                                        SELECT DISTINCT canton_id, party_id FROM Deliverables \
                                        JOIN Plans ON Plans.id = Deliverables.plan_id \
                                        ) Q \
                                        ) Q \
                                        GROUP BY canton_id, party_count \
                                        HAVING party_count <= (SELECT COUNT(id) / 4 FROM Parties) \
                                        ) Q \
                                        JOIN Deliverables ON Q.canton_id = Deliverables.canton_id",
                                        function(err, resultset) {
                    if (err) {
                      callback(err);
                    } else {
                      totalTime += timer.GetTime();
                        resultset.toObjArray(function(err, results) {
                            if (results.length > 0) {
                                for(let i = 0; i < results.length; i++) {
                                    console.log("Canton ID: " + results[i].canton_id + 
                                    " | Count: " + results[i].deliverable_count);
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
  console.log("Query 2 Time: " + totalTime + " ms");
}, 1000);