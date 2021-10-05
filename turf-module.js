module.exports = function(RED) {
  function TurfModuleNode(config) {
    const turf = require('@turf/turf');
    const _ = require("underscore");
    const fs = require("fs");
    const node = this;

    RED.nodes.createNode(this,config);
    
    
    this.on('input', (msg, send, done) => {
      const globalContext = node.context().global;
      const flowContext = node.context().flow;

      const turfFunction = config.meta.module;

      // Init Arguments and Options
      this.args = this.args || []; 
      this.options = this.options || [];

      // We only do this once - if we have multi inputs we cannot have duplicated args and options 
      if (this.args.length === 0) {
        _.each(config.meta.props, (value, key) => {
          const val = _.clone(value);
          if (key.includes("turf-argument")) {
            val.value = config[key];
            val.position = parseInt(key.replace("turf-argument-", ""));
            this.args.push(val);
          }
          if (key.includes("turf-option")) {
            val.value = config[key];
            val.position = parseInt(key.replace("turf-option-", ""));

            // We only push to options array if we have a value - empty Inputs are ignored so turf uses the default value
            if (!_.isEmpty(val.value)) {
              this.options.push(val);
            }
          }
        });
        this.args = _.sortBy(this.args, x => x.position);
        this.options = _.sortBy(this.options, x => x.position);
      }

      // Helper
      function prepareParameter(param, msg) {
        // Turf Node Value
        if (param.vt === "turf" && msg.turfNodeName === param.value) {
          param.data = msg.payload;
          return param
        }

        // Message Value
        if (param.vt === "msg" && !_.isUndefined(msg[param.value])) {
          param.data = msg[param.value];
          return param
        }

        // Global Value
        if (param.vt === "global") {
          if (!globalContext.get(param.value)) {
            const errorText = `Missing global variable: ${param.value}`;
            const error = new Error(errorText);            
            node.status({
              fill: "red",
              shape: "dot",
              text: "error"
            });
            node.error(error, errorText);
          }
          param.data = globalContext.get(param.value);
          return param
        }

        // Flow Value
        if (param.vt === "flow") {
          if (!flowContext.get(param.value)) {
            const errorText = `Missing flow variable: ${param.value}`;
            const error = new Error(errorText);            
            node.status({
              fill: "red",
              shape: "dot",
              text: "error"
            });
            node.error(error, errorText);
          }
          param.data = flowContext.get(param.value);
          return param
        }

        // JSON
        if (param.vt === "json") {
          try {
            param.data = JSON.parse(param.value);
            return param
          } catch (error) {
            param.data = {};
            return param
          }
        }

        // Number
        if (param.vt === "num") {
          param.data = parseInt(param.value);
          return param
        }

        // Boolean
        if (param.vt === "bool") {
          param.data = param.value === "true";
          return param
        }

        if (param.vt === "str") {
          param.data = param.value;
          return param
        }
      }
  
      // Perpare Arguments
      _.each(this.args, (arg) => {
        prepareParameter(arg, msg);
      });

      // Prepare Options
      _.each(this.options, (option) => {
        prepareParameter(option, msg);
      });

      if (!_.find(this.args, x => _.isUndefined(x.data)) && !_.find(this.options, x => _.isUndefined(x.data))) {
        let turfContext = [];
        
        // Set turfNodeName
        if (config.name && config.name.length > 0) {
          msg.turfNodeName = config.name; 
        }

        // Create turfContext for args
        _.each(this.args, (arg) => {
          turfContext.push(arg.data);
        });

        // Create turfContext for options
        let turfOptions = {};
        _.each(this.options, (option) => {
          turfOptions[option.n] = option.data;
        });
        turfContext.push(turfOptions);


        try {
          node.status({
            fill: "blue",
            shape: "ring",
            text: turfFunction
          });

          // Run turffunction or callback depending on the function
          if (turfFunction === "featureEach" || turfFunction === "geomEach" || turfFunction === "propEach") {
            turf[turfFunction].apply(null, turfContext);
            msg.payload = turfContext[0];
          }
          else if (turfFunction === "clusterEach") {
            let values = [];
            turf.clusterEach(turfContext[0], 'cluster', function (cluster, clusterValue) {
              values.push(cluster);
            });
            msg.payload = values;
          }
          else {
            msg.payload = turf[turfFunction].apply(null, turfContext);
          }

          // CleanUp
          this.args = [];
          this.options = [];
          this.turfContext = null;

          send(msg);
        } catch (error) {
          node.status({
            fill: "red",
            shape: "dot",
            text: "error"
          });
          node.error(error, msg);
        }
      }

    })
  }

  RED.nodes.registerType("turf-module", TurfModuleNode);
  RED.httpAdmin.get("/turf/js/*", (req, res) => {
    const options = {
        root: `${__dirname}/static/`,
        dotfiles: 'deny'
    };
    res.sendFile(req.params[0], options);
  });
};
