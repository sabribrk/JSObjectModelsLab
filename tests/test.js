(function () {
    'use strict';

    /* global test,equal,module,start,stop,window,$,ok,expect */


    /*---------------------------------*/
    /*     PART ONE: SIMPLE MODULE     */
    /*---------------------------------*/
    module('SpeedCheck Module', {
        beforeEach: function() {

        }
    });

    // TODO: Vérifier que la création d'objets SpeedCheck est Possible

    test('Création d\'objets SpeedCheck', function() {
        expect(3);
        ok(typeof window.createSpeedCheck() != 'null', 'Création d\'objets SpeedCheck');
        ok(typeof window.createSpeedCheckFR() != 'null', 'Création d\'objets SpeedCheck');
        ok(typeof window.createSpeedCheckBE() != 'null', 'Création d\'objets SpeedCheck');
    });



    // TODO: Vérifier que les objets créés directement avec creatSpeedCheck ne sont pas utilisables :
    // speed0 = creatSpeedCheck();
    // speed0.speed = 42; // SHOULD throw a SpeedCheckError.
    // speed0.licencePlate = '3-DFE-456'; // SOULD throw a SpeedCheckError.
    test('objets crées avec SpeedCheck sont non utilisables', function() {

        expect(2);
        var speed0 = createSpeedCheck();
        throws(function() {speed0.speed = 42}, 'SHOULD throw a SpeedCheckError');
        throws(function() {speed0.licencePlate = '3-DFE-456'}, 'SHOULD throw a SpeedCheckError');
    });



    // TODO: Vérifier que TOUTES les fonctionnalités de createSpeedCheckFR sont correctes (effects de bords, valeurs négatives, etc.) pour tous les attributs (speed et licencePlate)
    test('vérifier les fonctionnalités de createSpeedCheckFR', function() {

        expect(8);
        var speed0 = createSpeedCheckFR();
        equal(speed0.speed, 0, 'vitesse initiale');
        speed0.speed = 50;
        equal(speed0.speed, 50, 'vitesse modifier');
        throws(function() {speed0.speed = -30}, 'valeur négative');
        speed0.speed = 130;
        equal(speed0.infraction, false, 'pas d\'infraction');
        speed0.speed = 131;
        equal(speed0.infraction, true, 'infraction');
        equal(speed0.licencePlate,'???', 'plaque');
        throws(function() {speed0.licencePlate = '3-BMS-777'}, 'fausse plaque');
        speed0.licencePlate = 'BR172MS';
        equal(speed0.licencePlate, 'BR172MS', 'plaque valide');

    });




    // TODO: Vérifier que TOUTES les fonctionnalités de createSpeedCheckBE sont correctes (effects de bords, valeurs négatives, etc.) pour tous les attributs (speed et licencePlate)

    test('vérifier les fonctionnalités de createSpeedCheckBE', function() {

        expect(8);
        var speed0 = createSpeedCheckBE();
        equal(speed0.speed, 0, 'vitesse initiale');
        speed0.speed = 50;
        equal(speed0.speed, 50, 'vitesse modifier');
        throws(function() {speed0.speed = -30}, 'valeur négative');
        speed0.speed = 120;
        equal(speed0.infraction, false, 'pas d\'infraction');
        speed0.speed = 121;
        equal(speed0.infraction, true, 'infraction');
        equal(speed0.licencePlate,'???', 'plaque');
        throws(function() {speed0.licencePlate = '3B7M477'}, 'fausse plaque');
        speed0.licencePlate = '1-BRK-172';
        equal(speed0.licencePlate, '1-BRK-172', 'plaque valide');

     });

    // TODO: Vérifier que la fonction toString() fonctionne bien.
    //  - chaine de caractère attentue pour une infracion (e.g. licencePlate === 'WD366MD' et  speed === 135):
    //      "Véhicule WD366MD roule à 135 km/h. Infraction!"
    //  - chaine de caractère attendue pour sans infraction (e.g. licencePlate === 'WD366MD' et  speed === 105):
    //      "Véhicule WD366MD roule à 105 km/h. Ça va, circulez..."
    test('Vérifier que la fonction toString() fonctionne', function() {
        expect(4);
        var speed0 = createSpeedCheckFR();
        speed0.speed = 135;
        speed0.licencePlate = 'WD366MD';
        equal(speed0.toString(), 'VéhiculeWD366MDroule à135km/h. Infraction!', 'to String ok pour infraction FR');
        speed0.speed = 105;
        equal(speed0.toString(), 'VéhiculeWD366MDroule à105km/h. Ça va, circulez...', ' to String ok pour pas d\'infraction FR');
        var speed0 = createSpeedCheckBE();
        speed0.speed = 125;
        speed0.licencePlate = '1-BRK-172';
        equal(speed0.toString(), 'Véhicule1-BRK-172roule à125km/h. Infraction!', 'to String ok pour infraction BE');
        speed0.speed = 95;
        equal(speed0.toString(), 'Véhicule1-BRK-172roule à95km/h. Ça va, circulez...','to string ok pour pas d\'Infraction BE');
      });



    /*---------------------------------*/
    /*  PART TWO: The "Shapes" module  */
    /*---------------------------------*/
        var roadAttr, amenityAttr, buildingAttr, naturalAttr;
    module('Unit Testing The "Shapes" Module', {
      beforeEach: function(){
        roadAttr = JSON.parse('{ \
          "building": false, \
          "highway": "Residential", \
          "_id": "-629863", \
          "nodes": [{ \
              "y": 369.0, \
              "x": 708.0 \
          }, { \
              "y": 396.0, \
              "x": 743.0 \
          }], \
          "name": "Rue de Colmar" \
          } \
        ');

        amenityAttr = JSON.parse('{\
        "_id":"-629724",\
        "nodes":[{"y":32.0,\
        "x":629.0},\
        {"y":42.0,\
        "x":597.0},\
        {"y":43.0,\
        "x":595.0},\
        {"y":32.0,\
        "x":629.0}],\
        "amenity":"parking"}');

        buildingAttr = JSON.parse('{"building":true,\
        "_id":"-629719",\
        "nodes":[{"y":0.0,\
        "x":0.0},\
        {"y":0.0,\
        "x":100.0},\
        {"y":100.0,\
        "x":100.0},\
        {"y":100.0,\
        "x":0.0},\
        {"y":0.0,\
        "x":0.0}]}');

        naturalAttr = JSON.parse('{"building":false,\
        "_id":"-630043",\
        "nodes":[{"y":309.0,\
        "x":222.0},\
        {"y":324.0,\
        "x":262.0},\
        {"y":335.0,\
        "x":231.0},\
        {"y":309.0,\
        "x":222.0}],\
        "name":"Bassin Paul Vatine",\
        "natural":"water"}');

      }
    });


    test('Test Shapes\' VERSION Property', function() {
        expect(1);
        equal(window.Shapes.VERSION, '0.0.1', 'The Shapes module should have a VERSION property');
    });

    test('Test Creation of a Default Object', function() {
      expect(2);
      ok(typeof window.Shapes.createShape !== 'undefined', 'The Shapes module sould expose a "createShape" function');
      var shape0 = window.Shapes.createShape(roadAttr);
      ok(typeof shape0 === 'object', 'The "createShape" function sould return objects.');
    });

    test('Test proper hidding of properties', function() {
      expect(5);
      var shape0 = window.Shapes.createShape(roadAttr);
      var prop;
      var props = [];
      for(prop in shape0){
        if(shape0.hasOwnProperty(prop)){
          props.push(prop);
        }
      }
      // Only 4 properties SHOULD be  visible
      //{ id: [Function], toString: [Function], toSVGPath: [Function], getName: [Function] }
      equal(props.length, 4, 'Only 4 properties SHOULD be  visible in objects created by "createShape"');
      props.forEach(function(prop){
        ok(prop === 'id' || prop === 'toString' || prop === 'toSvgPath' || 'getName', 'One of "id" "toString", "toSvgPath" or "getName"');
      });

    });


    test('Test the toSVGString method', function() {
      expect(1);
      var shape0 = window.Shapes.createShape(roadAttr);
      equal(shape0.toSvgPath(), 'M 708 369 L 743 396', 'Should create a valid SVG PATH (google SVG PATH for details)');
    });

    test('Test the name accessor', function() {
      expect(1);
      var shape0 = window.Shapes.createShape(roadAttr);
      equal(shape0.getName(), 'Rue de Colmar', 'Should return the value corresponding to the "name" property in the attributes');
    });


    test('Test the createRoad function', function() {
      expect(1);
      ok(typeof window.Shapes.createRoad !== 'undefined', 'The Shapes module sould expose a "createRoad" function');
    });

    test('Test objects created with the createRoad function', function() {
      expect(2);
      var road = window.Shapes.createRoad(roadAttr);
      ok(typeof road.getCategory === 'function', 'Object Created with "createRoad" Should have a getCategory function');
      equal(road.getCategory(),'Residential', 'Should return the value corresponding to the "highway" property in the attributes');
    });

    test('Test the createAmenity function', function() {
      expect(1);
      ok(typeof window.Shapes.createAmenity !== 'undefined', 'The Shapes module sould expose a "createAmenity" function');
    });
    test('Test objects created with the  createAmenity function', function() {
      expect(2);
      var amenity = window.Shapes.createAmenity(amenityAttr);
      ok(typeof amenity.getType === 'function', 'Object Created with "createAmenity" Should have a getType function');
      equal(amenity.getType(),'parking', 'Should return the value corresponding to the "amenity" property in the attributes');
    });

    test('Test the createBuilding function', function() {
      expect(1);
      ok(typeof window.Shapes.createBuilding !== 'undefined', 'The Shapes module sould expose a "createBuilding" function');
    });

    test('Test objects created with the  createBuilding function', function() {
      expect(2);
      var building = window.Shapes.createBuilding(buildingAttr);
      ok(typeof building.getArea === 'function', 'Object Created with "createBuilding" Should have a getArea function');
      equal(building.getArea(),10000, 'Should return the area of the building computed from the set of points in the nodes attributes');
    });


    test('Test the createAmenity function', function() {
      expect(1);
      ok(typeof window.Shapes.createNatural !== 'undefined', 'The Shapes module sould expose a "createNatural" function');
    });
    test('Test objects created with the  createNatural function', function() {
      expect(2);
      var natural = window.Shapes.createNatural(naturalAttr);
      ok(typeof natural.getType === 'function', 'Object Created with "createNatural" Should have a getType function');
      equal(natural.getType(),'water', 'Should return the value corresponding to the "natural" property in the attributes');
    });





    /*-----------------------------------*/
    /* PART THREE: Test with a JSON file */
    /*-----------------------------------*/

    // TODO Write the whole test module for testing with the app/data/eure.json file.
    var obj;
    var objets;
    var autres;
    var objetShapes = {building:[], road:[], amenity:[], natural:[]};
    module('Asynchronous Unit Test Module', {
        setup: function() {
            stop();


            // You can load a resource before loaching the test...
            $.get("test.json").success(function(data){
                obj = data;
            });
            // ... Or any asynchroneous task
            // window.setTimeout(function() {
            //     obj = {a:'OK', b:'KO'};
            //     start();
            // }, 1000);
           $.get('data/eure.json').success(function(data){
                objets = data;
                autres = 0;
                objetShapes = {building:[], road:[], amenity:[], natural:[]};
                for (var i = 0; i < objets.length; i++){
                  if (objets[i].hasOwnProperty("building") && objets[i].building == true){
                    objetShapes.building.push(window.Shapes.createBuilding(objets[i]));
                    }
                    else if (objets[i].hasOwnProperty("highway")){
                      objetShapes.road.push(window.Shapes.createRoad(objets[i]));
                    }
                    else if (objets[i].hasOwnProperty("amenity")){
                      objetShapes.amenity.push(window.Shapes.createAmenity(objets[i]));
                    }
                    else if (objets[i].hasOwnProperty("natural")){
                      objetShapes.natural.push(window.Shapes.createNatural(objets[i]));
                    }
                    else
                    autres++;

                  }
                  start();
                });
         }
      });

    test('nombres d\'objets crées', function(){
      expect(2);
      notEqual(objets.length, 0, 'longueur non nulle');
      var result = objetShapes.building.length + objetShapes.road.length + objetShapes.amenity.length + objetShapes.natural.length + autres;
      equal(objets.length, result, 'nombres d\'objets');
    });

    test('surfaces', function(){
      expect(1);
      var res = objetShapes.building[0].getArea();
      for (var i = 1; i < objetShapes.building.length; i++){
       res += objetShapes.building[i].getArea();
      }
      notEqual(res, 0, 'surfaces non nulles');
     });

    test('test 1', function() {
        equal(obj.a, 'OK', 'Message');
        equal(obj.a+'KO', 'OKKO', 'Message');
    });

    test('test 2', function() {
        equal(obj.a+obj.b, 'OKKO', 'FAil');
    });

}());
