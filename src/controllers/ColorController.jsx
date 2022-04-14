class ColorController {
  static getColor = (status) => {
    let firstChar = status.charAt(0).toLowerCase();
    if (firstChar === "c") {
      return "#FDCC29";
    } else if (firstChar === "r") {
      return "#EF0621";
    } else if (firstChar === "s") {
      return "#707070";
    } else {
      return "#FDCC29";
    }
  };
}

export default ColorController;
