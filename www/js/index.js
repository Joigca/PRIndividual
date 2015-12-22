 /*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var confDB = {    
    existe_db:"",
    db:"",
    initialize:function(){
        this.existe_db = window.localStorage.getItem("existe_db");

        //Creacion de la base de datos
        this.db = window.openDatabase("CRMDB", "1.0", "Base de datos de MiniCRM", 2*1024*1024);
        //Comprobacion de si existe_db 
        if(this.existe_db == null){
            console.log("No existe base de datos");
            this.createDB();
        }
    },

    createDB:function(){
        //CREAR BASE DE DATOS
        console.log("Creando Base de Datos");
        //transaccion
        this.db.transaction(this.createCRMDB, this.createDBError, this.createDBSucc);
    },

    createCRMDB:function(tx){
        console.log("Creando tabla...");

        var sql = "CREATE TABLE IF NOT EXISTS CRMDB(id INTEGER PRIMARY KEY AUTOINCREMENT, nombreCompleto VARCHAR(45), rol VARCHAR(45),ciudad VARCHAR(45), edad INTEGER, twitter BOOLEAN, facebook BOOLEAN, google BOOLEAN, correoGmail VARCHAR(45), correoHotmail VARCHAR(45),telefono VARCHAR(9), ultimos INTEGER)";

        tx.executeSql(sql);

        //INSERCION DE DATOS

        sql = "INSERT INTO CRMDB(id, nombreCompleto, rol, ciudad, edad, twitter, facebook, google, correoGmail, correoHotmail, telefono) VALUES (1, 'Jose Igualada', 'Estudiante', 'Torrent', 21, 1, 1, 1, 'joseigualada@gmail.com', 'joseigualada@hotmail.com', '676170946', 1)";
        tx.executeSql(sql);


        sql = "INSERT INTO CRMDB(id, nombreCompleto, rol, ciudad, edad, twitter, facebook, google, correoGmail, correoHotmail, telefono) VALUES (2, 'Joaquin Bahamode', 'Estudiante', 'Catarroja', 21, 1, 1, 1, 'joaquinbahamonde@gmail.com', 'joaquinbahamonde@hotmail.com', '123456789', 1)";
        tx.executeSql(sql);

        sql = "INSERT INTO CRMDB(id, nombreCompleto, rol, ciudad, edad, twitter, facebook, google, correoGmail, correoHotmail, telefono) VALUES (3, 'Ivan Estruch', 'Estudiante', 'Silla', 20, 1, 1, 1, 'ivanestruch@gmail.com', 'ivanestruch@hotmail.com', '987654321', 1)";
        tx.executeSql(sql);

        sql = "INSERT INTO CRMDB(id, nombreCompleto, rol, ciudad, edad, twitter, facebook, google, correoGmail, correoHotmail, telefono) VALUES (4, 'Adrian Rodriguez', 'Estudiante', 'Alfafar', 19, 1, 1, 1, 'adrianrodriguez@gmail.com', 'adrianrodriguez@hotmail.com', '963258741', 0)";
        tx.executeSql(sql);

        sql = "INSERT INTO CRMDB(id, nombreCompleto, rol, ciudad, edad, twitter, facebook, google, correoGmail, correoHotmail, telefono) VALUES (5, 'Silvia Reolid', 'Estudiante', 'Valencia', 26, 1, 1, 1, 'silviareolid@gmail.com', 'silviareolid@hotmail.com', '147852369', 0)";
        tx.executeSql(sql);

    },

    createDBError:function(err){
        console.log("No se puede crear la Base de Datos: " + err.message);
    },

    createDBSucc:function(){
        console.log("La Base de Datos ha sido creada con exito");
        window.localStorage.setitem("existe_db", 1);
    },
};

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        
        /*
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
        */

        //console.log('Received Event: ' + id);        
        confDB.initialize();
    }
};
app.initialize();