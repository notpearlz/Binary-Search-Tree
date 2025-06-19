export class Node {
  constructor() {
    this._val = null;
    this._left = null;
    this._right = null;
  }

  //Getters
  get val() {
    return this._val;
  }

  get left() {
    return this._left;
  }

  get right() {
    return this._right;
  }

  //Setters
  set val(newVal) {
    this._val = newVal;
  }

  set left(newLeft) {
    return (this._left = newLeft);
  }

  set right(newRight) {
    return (this._right = newRight);
  }
}
