var inputfile = './dependencies/buttplug-device-config/buttplug-device-config.yml',
    outputfile = './dependencies/buttplug-device-config/buttplug-device-config.json',
    yaml = require('js-yaml'),
    fs = require('fs'),
    obj = yaml.load(fs.readFileSync(inputfile, {encoding: 'utf-8'}));
fs.writeFileSync(outputfile, JSON.stringify(obj, null, 2));
