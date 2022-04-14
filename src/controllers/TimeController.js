class TimeController {
  static greet = () => {
    const hour = new Date().getHours();
    let greeting = "";
    if (hour >= 0 && hour < 12) {
      greeting = "Good Morning";
    } else if (hour >= 12 && hour < 18) {
      greeting = "Good Afternoon";
    } else {
      greeting = "Good Evening";
    }
    return greeting;
  };
}

export default TimeController;
