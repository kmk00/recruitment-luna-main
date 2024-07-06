const calculateTemperatureColor = (
  currentTemperature: number | undefined,
  targetTemperature: number | undefined
) => {
  if (currentTemperature === undefined || targetTemperature === undefined) {
    return "neutral";
  }

  return targetTemperature - currentTemperature > 0.5 ||
    currentTemperature - targetTemperature > 0.5
    ? "negative"
    : "positive";
};

export default calculateTemperatureColor;
