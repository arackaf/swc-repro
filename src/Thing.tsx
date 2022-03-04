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
        // original code, before transpilation is
        // `this.stream.point();`
        // note in the dev tools that `this` does indeed have a stream object on it, with a point method therein, which can be called.
        // but regardless, at a more basic level, this point method is NOT an arrow, and so references to `this` therein should NOT be transformed to anything
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
