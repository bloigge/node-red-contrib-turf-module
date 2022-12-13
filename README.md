# node-red-contrib-turf-module

A node which exposes all the awesome features of the [Turf](https://turfjs.org/) Library for spatial analysis.

#### About:
This node exposes all the awesome features of the [Turf](https://turfjs.org/) Library for spatial analysis. This is a complete rework of the [`node-red-contrib-turf`](https://flows.nodered.org/node/node-red-contrib-turf) node. `node-red-contrib-turf-module` offers a complete UI for every turf module and allows to wire differnt turf modules without the need of extra function nodes.

#### About Turf:

Turf includes traditional spatial operations, helper functions for creating GeoJSON data and data classification and statistics tools.  

Turf uses GeoJSON for all geographic data. Turf expects the data to be standard WGS84 longitude, latitude coordinates. Check out [geojson.io](geojson.io) for a tool to easily create this data.  
Most Turf modules work with GeoJSON features. These are pieces of data that represent a collection of properties (ie: population, elevation, zipcode, etc.) along with a geometry. GeoJSON has several geometry types such as:

*   Point
*   LineString
*   Polygon

#### How to use the node:

Select the turf module you want to use from the select input box. Based on your selection the arguments and options are displayed. You can always lookup the official documentation of the current selected module, its parameters and options by clicking the `info button`.  

#### Setting arguments and options:

An argument or option can have different inputs (`string`, `number`, `boolean`, `msg`, `json`, `flow`, `global`, `turf`). One special type is the `turf` type which allowes to use the input(s) from incomming turf nodes. Its value needs to be the name of the incomming turf node. As a lookup criteria the property `msg.turfNodeName` is used. So it also possible to use a custom function node with a `msg.turfNodeName` as input. The value is set by the `msg.payload`.  
For turf modules with callback functions (e.g.: coord-reduce) only `msg`, `flow`, `global` types are allowed. The value of the msg or flow/global variable has to be the callback function.  
For the inital creation of geojson data the `json` type can be used. Be aware of using the right GeoJSON Feature-Type though.  

#### Helpful Links

*   [https://geojson.io/ ](https://geojson.io/)(Create GeoJSON)
*   [https://geojsonlint.com/ ](https://geojsonlint.com/)(Validate GeoJSON)
*   [https://geojson.org/ ](https://geojson.org/)(GeoJSON Specification)
*   [https://turfjs.org/ ](https://turfjs.org/)(TurfJS Specification)

#### Sample flow:
```json
[
    {
        "id": "f679ac51893aafbf",
        "type": "tab",
        "label": "Flow 1",
        "disabled": false,
        "info": ""
    },
    {
        "id": "d1e29832fedc1077",
        "type": "join",
        "z": "f679ac51893aafbf",
        "name": "",
        "mode": "custom",
        "build": "array",
        "property": "payload",
        "propertyType": "msg",
        "key": "topic",
        "joiner": "\\n",
        "joinerType": "str",
        "accumulate": false,
        "timeout": "",
        "count": "3",
        "reduceRight": false,
        "reduceExp": "",
        "reduceInit": "",
        "reduceInitType": "",
        "reduceFixup": "",
        "x": 390,
        "y": 160,
        "wires": [
            [
                "a7f208338c9a2b0b"
            ]
        ]
    },
    {
        "id": "8b2bbe724ceddede",
        "type": "debug",
        "z": "f679ac51893aafbf",
        "name": "",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 850,
        "y": 160,
        "wires": []
    },
    {
        "id": "ea64154dafeacf70",
        "type": "inject",
        "z": "f679ac51893aafbf",
        "name": "",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "",
        "payloadType": "date",
        "x": 100,
        "y": 160,
        "wires": [
            [
                "f747e9efd16496f6",
                "9c5424c4edddaea4",
                "5523a40ead0371d4"
            ]
        ]
    },
    {
        "id": "1c906a1da0b13c6d",
        "type": "debug",
        "z": "f679ac51893aafbf",
        "name": "",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 610,
        "y": 340,
        "wires": []
    },
    {
        "id": "25d13adac8fc6440",
        "type": "function",
        "z": "f679ac51893aafbf",
        "name": "callback",
        "func": "msg.turfNodeName = \"callback\"\nmsg.callback = function (previousValue, currentCoord, coordIndex) {\n    node.log(previousValue);\n    node.log(currentCoord)\n    return previousValue + currentCoord[1]\n}\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 260,
        "y": 340,
        "wires": [
            [
                "171531030a534bc8"
            ]
        ]
    },
    {
        "id": "896c83bce864301a",
        "type": "inject",
        "z": "f679ac51893aafbf",
        "name": "",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "",
        "payloadType": "date",
        "x": 100,
        "y": 340,
        "wires": [
            [
                "25d13adac8fc6440"
            ]
        ]
    },
    {
        "id": "03ead72697d94b0b",
        "type": "inject",
        "z": "f679ac51893aafbf",
        "name": "",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "",
        "payloadType": "date",
        "x": 100,
        "y": 500,
        "wires": [
            [
                "413ef37a9313cb91"
            ]
        ]
    },
    {
        "id": "27fcc502c15c6faa",
        "type": "debug",
        "z": "f679ac51893aafbf",
        "name": "",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 950,
        "y": 500,
        "wires": []
    },
    {
        "id": "413ef37a9313cb91",
        "type": "function",
        "z": "f679ac51893aafbf",
        "name": "flow radius",
        "func": "flow.set(\"radius\", 30)\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 270,
        "y": 500,
        "wires": [
            [
                "1d408790fe0e08c6"
            ]
        ]
    },
    {
        "id": "1d408790fe0e08c6",
        "type": "change",
        "z": "f679ac51893aafbf",
        "name": "global radius",
        "rules": [
            {
                "t": "set",
                "p": "radius",
                "pt": "global",
                "to": "40",
                "tot": "num"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 450,
        "y": 500,
        "wires": [
            [
                "ccf717927a54b3f6",
                "2315642af65397f1"
            ]
        ]
    },
    {
        "id": "34749c221095278b",
        "type": "comment",
        "z": "f679ac51893aafbf",
        "name": "Sampel for wiring multiple Turf Nodes",
        "info": "",
        "x": 180,
        "y": 60,
        "wires": []
    },
    {
        "id": "af8434b8731942f5",
        "type": "comment",
        "z": "f679ac51893aafbf",
        "name": "Sampel for using callback functions",
        "info": "",
        "x": 160,
        "y": 280,
        "wires": []
    },
    {
        "id": "2f7f8adce2e989d2",
        "type": "comment",
        "z": "f679ac51893aafbf",
        "name": "Sampel for using flow/global variables",
        "info": "",
        "x": 170,
        "y": 420,
        "wires": []
    },
    {
        "id": "5523a40ead0371d4",
        "type": "turf-module",
        "z": "f679ac51893aafbf",
        "name": "Point",
        "turf-module": "74",
        "meta": {
            "props": {
                "turf-argument-0": {
                    "p": "turf-argument-0",
                    "vt": "json",
                    "n": "coordinates"
                },
                "turf-argument-1": {
                    "p": "turf-argument-1",
                    "vt": "json",
                    "n": "properties"
                },
                "turf-option-0": {
                    "p": "turf-option-0",
                    "vt": "json",
                    "n": "bbox"
                },
                "turf-option-1": {
                    "p": "turf-option-1",
                    "vt": "str",
                    "n": "id"
                }
            },
            "module": "point"
        },
        "turf-argument-0": "[-15,48]",
        "turf-argument-1": "{\"foo\":\"bar\"}",
        "turf-argument-2": null,
        "turf-argument-3": null,
        "turf-argument-4": null,
        "turf-argument-5": null,
        "turf-option-0": "",
        "turf-option-1": "",
        "turf-option-2": null,
        "turf-option-3": null,
        "turf-option-4": null,
        "turf-option-5": null,
        "x": 250,
        "y": 100,
        "wires": [
            [
                "d1e29832fedc1077"
            ]
        ]
    },
    {
        "id": "9c5424c4edddaea4",
        "type": "turf-module",
        "z": "f679ac51893aafbf",
        "name": "Point2",
        "turf-module": "74",
        "meta": {
            "props": {
                "turf-argument-0": {
                    "p": "turf-argument-0",
                    "vt": "json",
                    "n": "coordinates"
                },
                "turf-argument-1": {
                    "p": "turf-argument-1",
                    "vt": "json",
                    "n": "properties"
                },
                "turf-option-0": {
                    "p": "turf-option-0",
                    "vt": "json",
                    "n": "bbox"
                },
                "turf-option-1": {
                    "p": "turf-option-1",
                    "vt": "str",
                    "n": "id"
                }
            },
            "module": "point"
        },
        "turf-argument-0": "[10,50]",
        "turf-argument-1": "{\"foo\":\"baz\"}",
        "turf-argument-2": null,
        "turf-argument-3": null,
        "turf-argument-4": null,
        "turf-argument-5": null,
        "turf-option-0": "",
        "turf-option-1": "",
        "turf-option-2": null,
        "turf-option-3": null,
        "turf-option-4": null,
        "turf-option-5": null,
        "x": 250,
        "y": 160,
        "wires": [
            [
                "d1e29832fedc1077"
            ]
        ]
    },
    {
        "id": "f747e9efd16496f6",
        "type": "turf-module",
        "z": "f679ac51893aafbf",
        "name": "Point3",
        "turf-module": "74",
        "meta": {
            "props": {
                "turf-argument-0": {
                    "p": "turf-argument-0",
                    "vt": "json",
                    "n": "coordinates"
                },
                "turf-argument-1": {
                    "p": "turf-argument-1",
                    "vt": "json",
                    "n": "properties"
                },
                "turf-option-0": {
                    "p": "turf-option-0",
                    "vt": "json",
                    "n": "bbox"
                },
                "turf-option-1": {
                    "p": "turf-option-1",
                    "vt": "str",
                    "n": "id"
                }
            },
            "module": "point"
        },
        "turf-argument-0": "[0,0]",
        "turf-argument-1": "{\"bit\":\"coin\"}",
        "turf-argument-2": null,
        "turf-argument-3": null,
        "turf-argument-4": null,
        "turf-argument-5": null,
        "turf-option-0": "",
        "turf-option-1": "",
        "turf-option-2": null,
        "turf-option-3": null,
        "turf-option-4": null,
        "turf-option-5": null,
        "x": 250,
        "y": 220,
        "wires": [
            [
                "d1e29832fedc1077"
            ]
        ]
    },
    {
        "id": "a7f208338c9a2b0b",
        "type": "turf-module",
        "z": "f679ac51893aafbf",
        "name": "Coll",
        "turf-module": "67",
        "meta": {
            "props": {
                "turf-argument-0": {
                    "p": "turf-argument-0",
                    "vt": "msg",
                    "n": "features"
                },
                "turf-option-0": {
                    "p": "turf-option-0",
                    "vt": "json",
                    "n": "bbox"
                },
                "turf-option-1": {
                    "p": "turf-option-1",
                    "vt": "str",
                    "n": "id"
                }
            },
            "module": "featureCollection"
        },
        "turf-argument-0": "payload",
        "turf-argument-1": null,
        "turf-argument-2": null,
        "turf-argument-3": null,
        "turf-argument-4": null,
        "turf-argument-5": null,
        "turf-option-0": "",
        "turf-option-1": "",
        "turf-option-2": null,
        "turf-option-3": null,
        "turf-option-4": null,
        "turf-option-5": null,
        "x": 530,
        "y": 160,
        "wires": [
            [
                "3a24b6f5bab2ac04"
            ]
        ]
    },
    {
        "id": "3a24b6f5bab2ac04",
        "type": "turf-module",
        "z": "f679ac51893aafbf",
        "name": "Convex",
        "turf-module": "33",
        "meta": {
            "props": {
                "turf-argument-0": {
                    "p": "turf-argument-0",
                    "vt": "turf",
                    "n": "geojson"
                },
                "turf-option-0": {
                    "p": "turf-option-0",
                    "vt": "num",
                    "n": "concavity"
                },
                "turf-option-1": {
                    "p": "turf-option-1",
                    "vt": "json",
                    "n": "properties"
                }
            },
            "module": "convex"
        },
        "turf-argument-0": "Coll",
        "turf-argument-1": null,
        "turf-argument-2": null,
        "turf-argument-3": null,
        "turf-argument-4": null,
        "turf-argument-5": null,
        "turf-option-0": "",
        "turf-option-1": "",
        "turf-option-2": null,
        "turf-option-3": null,
        "turf-option-4": null,
        "turf-option-5": null,
        "x": 680,
        "y": 160,
        "wires": [
            [
                "8b2bbe724ceddede"
            ]
        ]
    },
    {
        "id": "171531030a534bc8",
        "type": "turf-module",
        "z": "f679ac51893aafbf",
        "name": "",
        "turf-module": "98",
        "meta": {
            "props": {
                "turf-argument-0": {
                    "p": "turf-argument-0",
                    "vt": "json",
                    "n": "geojson"
                },
                "turf-argument-1": {
                    "p": "turf-argument-1",
                    "vt": "msg",
                    "n": "callback"
                },
                "turf-argument-2": {
                    "p": "turf-argument-2",
                    "vt": "json",
                    "n": "initialValue"
                },
                "turf-argument-3": {
                    "p": "turf-argument-3",
                    "vt": "bool",
                    "n": "excludeWrapCoord"
                }
            },
            "module": "coordReduce"
        },
        "turf-argument-0": "{   \"type\": \"FeatureCollection\",   \"features\": [     {       \"type\": \"Feature\",       \"properties\": {},       \"geometry\": {         \"type\": \"Point\",         \"coordinates\": [           107.57812499999999,           1         ]       }     },     {       \"type\": \"Feature\",       \"properties\": {},       \"geometry\": {         \"type\": \"Point\",         \"coordinates\": [           142.03125,           2         ]       }     },     {       \"type\": \"Feature\",       \"properties\": {},       \"geometry\": {         \"type\": \"Point\",         \"coordinates\": [           104.765625,           6         ]       }     }   ] }",
        "turf-argument-1": "callback",
        "turf-argument-2": "1",
        "turf-argument-3": "false",
        "turf-argument-4": null,
        "turf-argument-5": null,
        "turf-option-0": null,
        "turf-option-1": null,
        "turf-option-2": null,
        "turf-option-3": null,
        "turf-option-4": null,
        "turf-option-5": null,
        "x": 430,
        "y": 340,
        "wires": [
            [
                "1c906a1da0b13c6d"
            ]
        ]
    },
    {
        "id": "ccf717927a54b3f6",
        "type": "turf-module",
        "z": "f679ac51893aafbf",
        "name": "Buff1",
        "turf-module": "29",
        "meta": {
            "props": {
                "turf-argument-0": {
                    "p": "turf-argument-0",
                    "vt": "json",
                    "n": "geojson"
                },
                "turf-argument-1": {
                    "p": "turf-argument-1",
                    "vt": "flow",
                    "n": "radius"
                },
                "turf-option-0": {
                    "p": "turf-option-0",
                    "vt": "str",
                    "n": "units"
                },
                "turf-option-1": {
                    "p": "turf-option-1",
                    "vt": "num",
                    "n": "steps"
                }
            },
            "module": "buffer"
        },
        "turf-argument-0": "{\"type\":\"Feature\",\"properties\":{},\"geometry\":{\"type\":\"Point\",\"coordinates\":[10.997314453125,50.56230444080573]}}",
        "turf-argument-1": "radius",
        "turf-argument-2": null,
        "turf-argument-3": null,
        "turf-argument-4": null,
        "turf-argument-5": null,
        "turf-option-0": "kilometers",
        "turf-option-1": 8,
        "turf-option-2": null,
        "turf-option-3": null,
        "turf-option-4": null,
        "turf-option-5": null,
        "x": 610,
        "y": 460,
        "wires": [
            [
                "679eb6b3220af32b",
                "2c92b9ecf9459b6f"
            ]
        ]
    },
    {
        "id": "2315642af65397f1",
        "type": "turf-module",
        "z": "f679ac51893aafbf",
        "name": "Buff2",
        "turf-module": "29",
        "meta": {
            "props": {
                "turf-argument-0": {
                    "p": "turf-argument-0",
                    "vt": "json",
                    "n": "geojson"
                },
                "turf-argument-1": {
                    "p": "turf-argument-1",
                    "vt": "global",
                    "n": "radius"
                },
                "turf-option-0": {
                    "p": "turf-option-0",
                    "vt": "str",
                    "n": "units"
                },
                "turf-option-1": {
                    "p": "turf-option-1",
                    "vt": "num",
                    "n": "steps"
                }
            },
            "module": "buffer"
        },
        "turf-argument-0": "{       \"type\": \"Feature\",       \"properties\": {},       \"geometry\": {         \"type\": \"Point\",         \"coordinates\": [           11.6015625,           50.57626025689928         ]       }     }",
        "turf-argument-1": "radius",
        "turf-argument-2": null,
        "turf-argument-3": null,
        "turf-argument-4": null,
        "turf-argument-5": null,
        "turf-option-0": "kilometers",
        "turf-option-1": 8,
        "turf-option-2": null,
        "turf-option-3": null,
        "turf-option-4": null,
        "turf-option-5": null,
        "x": 610,
        "y": 540,
        "wires": [
            [
                "679eb6b3220af32b",
                "2c92b9ecf9459b6f"
            ]
        ]
    },
    {
        "id": "679eb6b3220af32b",
        "type": "turf-module",
        "z": "f679ac51893aafbf",
        "name": "",
        "turf-module": "34",
        "meta": {
            "props": {
                "turf-argument-0": {
                    "p": "turf-argument-0",
                    "vt": "turf",
                    "n": "polygon1"
                },
                "turf-argument-1": {
                    "p": "turf-argument-1",
                    "vt": "turf",
                    "n": "polygon2"
                }
            },
            "module": "difference"
        },
        "turf-argument-0": "Buff1",
        "turf-argument-1": "Buff2",
        "turf-argument-2": null,
        "turf-argument-3": null,
        "turf-argument-4": null,
        "turf-argument-5": null,
        "turf-option-0": null,
        "turf-option-1": null,
        "turf-option-2": null,
        "turf-option-3": null,
        "turf-option-4": null,
        "turf-option-5": null,
        "x": 770,
        "y": 460,
        "wires": [
            [
                "27fcc502c15c6faa"
            ]
        ]
    },
    {
        "id": "2c92b9ecf9459b6f",
        "type": "turf-module",
        "z": "f679ac51893aafbf",
        "name": "",
        "turf-module": "36",
        "meta": {
            "props": {
                "turf-argument-0": {
                    "p": "turf-argument-0",
                    "vt": "turf",
                    "n": "poly1"
                },
                "turf-argument-1": {
                    "p": "turf-argument-1",
                    "vt": "turf",
                    "n": "poly2"
                },
                "turf-option-0": {
                    "p": "turf-option-0",
                    "vt": "json",
                    "n": "properties"
                }
            },
            "module": "intersect"
        },
        "turf-argument-0": "Buff1",
        "turf-argument-1": "Buff2",
        "turf-argument-2": null,
        "turf-argument-3": null,
        "turf-argument-4": null,
        "turf-argument-5": null,
        "turf-option-0": "",
        "turf-option-1": null,
        "turf-option-2": null,
        "turf-option-3": null,
        "turf-option-4": null,
        "turf-option-5": null,
        "x": 770,
        "y": 540,
        "wires": [
            [
                "27fcc502c15c6faa"
            ]
        ]
    }
]
```
