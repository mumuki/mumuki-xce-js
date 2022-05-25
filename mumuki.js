const fs = require('fs');

class Mumuki {
  /**
   * @param {string} token
   * @param {string} locale
   */
  constructor(token, locale) {
    this._token = token;
    this._locale = locale;
  }

  /**
   * @param {string} organization
   * @param {string|number} exerciseId
   */
  visit(organization, exerciseId) {
    const caller = this._getCaller();
    this._file = caller.file;
    this._startLine = caller.line;

    this._organization = organization;
    this._exerciseId = Number(exerciseId);
  }

  test() {
    if (this._file) {
      const endLine = this._getCaller().line;
      const content = fs.readFileSync(this._file, {encoding:'utf8', flag:'r'});
      console.log(content.split("\n").slice(this._startLine, endLine - 1).join("\n"));
    } else {
      console.log("notice: Not sending your solution. Check instructions")
    }
  }

  _getCaller() {
    try { throw new Error() }
    catch (e) {
      const line = e.stack.split("\n")[3];
      let match;
      if (match = line.match(/at .* \((.+):(\d+):\d+\)$/)) {
        return {file: match[1], line: match[2]};
      } else if (match = line.match(/at \[eval\]:(\d+):\d+$/)) {
        return {line: match[1]}
      } else {
        throw new Error("Please check execution instructions");
      }
    }
  }
}

module.exports = Mumuki;
