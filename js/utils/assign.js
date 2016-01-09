// Polyfill maybe needed for browser
import objectAssign from 'object.assign';
const assign = Object.assign || objectAssign;

function assignToEmpty(oldObject, newObject) {
  return assign({}, oldObject, newObject);
}

export default assignToEmpty;
