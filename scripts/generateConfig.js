const rp = require("request-promise-native");
const fs = require("fs");
const _ = require("underscore");

// Helper
const turfType = {
  value: "turf",
  label: "Turf Node",
  icon: "turf/js/Turf.svg"
}

const standardTypes = ["msg", "flow", "global"];

function getTurfPropertyValue(param) {
  // Variables
  const configType = param.Type;
  const configDefaultValue = param.Default;
  let types = _.clone(standardTypes)

  // Strings
  if (configType === "string" || configType === "(string|number)" || configType === "(string)" || configType === "((string|number))" || configType === "(String)") {
    types.unshift("str");
    return {
      turfType: "string",
      types,
      value: configDefaultValue ? configDefaultValue.replaceAll('"', '').replaceAll("'", "") : null
    }
  }

  // Numbers
  if (configType === "number" || configType === "(number)") {
    // Fallback to string if number is not parseable
    if (configDefaultValue && !parseFloat(configDefaultValue)) {
      types.unshift("str");
      return {
        turfType: "string",
        types,
        value: null
      }
    }
    types.unshift("num");
    return {
      turfType: "number",
      types,
      value: configDefaultValue ? parseFloat(configDefaultValue) : null
    }
  }

  // Boolean
  if (configType === "boolean") {
    types.unshift("bool");
    return {
      turfType: "boolean",
      types,
      value: configDefaultValue === "true" ? true : false
    }
  } 

  // Function
  if (configType === "Function") {
    return {
      turfType: "function",
      types: standardTypes,
      value: null
    }
  } 

  // Default Json
  types.unshift(turfType);
  types.unshift("json");
  return {
    turfType: "json",
    types,
    value: null
  }  
}

(async () => {

  // --------- Pretty Hacky Way to get the module Information Data from turfjs.org ---------
  const turfJsUrl = "https://turfjs.org/js/layouts/default.fe0ccdaac409db4e1bb9.js";
  let rawSource = await rp(turfJsUrl);
  const startString = `{t.exports={modules:`;
  const endString = `}},"2g0B"`;
  rawSource = `module.exports.config = ${rawSource.substring(rawSource.lastIndexOf(startString), rawSource.lastIndexOf(endString)).replace(startString, "")}`;
  const rawSourcePath = "./sourceFile.js";
  fs.writeFileSync(rawSourcePath, rawSource);
  const { config } = require(rawSourcePath);

  // --------- Generate structure for Select 2 ---------
  let index = 1;
  _.each(config, (moduleGroup) => {
    // Rename moduleGroup key to children - select2 needs this
    delete Object.assign(moduleGroup, {["children"]: moduleGroup["modules"] })["modules"];
  
    // Add text for optgroup
    moduleGroup.text = moduleGroup.group;
    _.each(moduleGroup.children, (module) => {
  
      // Add id and text for module
      module.id = index;
      module.text = module.name;
  
      // Increment Index
      index += 1;
    });
  });

  // --------- Update Params for types ---------
  _.each(config, (group) => {
    _.each(group.children, (module) => {
      _.each(module.params, (param, idx) => {
        // Parameters
        if (param.Argument !== "options") {
          param.meta = getTurfPropertyValue(param);
          param.meta.id = `turf_${module.name}_${param.Argument}`;
        }
      })
      _.each(module.options, (param, idx) => {
        // Options
        param.meta = getTurfPropertyValue(param);
        param.meta.id = `turf_${module.name}_option_${param.Prop}`;
      })
    }) 
  });

  fs.writeFileSync("../static/config.json", JSON.stringify(config));
  fs.writeFileSync("../static/config_beauty.json", JSON.stringify(config,null,2));

})();