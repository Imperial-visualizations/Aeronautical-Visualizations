/**
 * Copyright (c) 2013 Petka Antonov
 * (modified by chongyou for AE2-213 notes)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:</p>
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

function Deque (maxlen) {
    this._capacity = maxlen;
    this._length = 0;
    this._front = 0;
}

Deque.prototype.toArray = function Deque$toArray () {
  var len = this._length;
  var ret = new Array(len);
  var front = this._front;
  var capacity = this._capacity;
  for (var j = 0; j < len; ++j) {
      ret[j] = this[(front + j) % capacity];
  }
  return ret;
};

// endslice
Deque.prototype.toArraySlice = function Deque$toArraySlice(slice) {
  var len = this._length;
  if (len < slice) {
    ret = this.toArray();
    return ret;
  } else {
    var ret = new Array(slice);
    var front = this._front;
    var capacity = this._capacity;
    for (var j = 0; j < slice; j++) {
      ret[j] = this[(front + len - slice + j + capacity) % capacity];
    }
    return ret;
  };
};

Deque.prototype.push = function Deque$push(item) {

    var argsLength = arguments.length;
    var length = this._length;

    // only accept one item at a time
    if (argsLength === 0 || argsLength > 1) return length;

    var front = this._front;
    var capacity = this._capacity;

    if (length >= capacity) {
        this[front] = item;
        this._length = capacity;
        this._front = (front + 1) % capacity;
    } else {
        var i = (front + length) % capacity;
        this[i] = item;
        this._length = length + 1;
    };
    return this._length;
};

Deque.prototype.get = function Deque$get(index) {
    var i = index;
    if ((i !== (i | 0))) {
        return void 0;
    }
    var len = this._length;
    if (i < 0) {
        i = i + len;
    }
    if (i < 0 || i >= len) {
        return void 0;
    }
    return this[(this._front + i) % this._capacity];
};
































// end
