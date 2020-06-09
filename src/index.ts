import convertAll from "./convertAll";
import watch from "./watch";
import clean from "./clean";
import cleanAll from "./cleanAll";

module.exports = {
  convert: convertAll(),
  watch: watch(),
  clean: clean(),
  cleanAll: cleanAll(),
};
