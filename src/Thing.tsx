import React, { Component } from "react";

type Props = {};

type geoTransformArg = {
  point();
};

function geoTransform(arg: geoTransformArg) {
  return () => {
    arg.point.call({
      stream: {
        point(x: number, y: number) {
          console.log("point called");
        },
      },
    });
  };
}

export class Thing extends Component<Props> {
  simplify: any;

  constructor(props) {
    super(props);

    this.simplify = geoTransform({
      point() {
        // ERROR IS HERE. At runtime, the `this` value from `this.stream.point`, below, is transformed to `_this`,
        // with a value bound to the class component's `this` value, which has no stream object.

        // Note in the dev tools that `this` does indeed have a stream object on it, with a point method therein, which can be called.
        // But regardless, at a more basic level, the point method is NOT an arrow, and so references to `this` inside of it should NOT be transformed
        debugger;
        this.stream.point();
      },
    });
  }

  render() {
    return (
      <div>
        <button style={{ width: "300px", fontSize: "50px", backgroundColor: "green", color: "white" }} onClick={this.simplify}>
          Click me
        </button>
      </div>
    );
  }
}
