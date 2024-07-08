const calculateTemperatureColor = (
  currentTemperature: number | undefined,
  targetTemperature: number
) => {
  if (currentTemperature === undefined || targetTemperature === undefined) {
    return;
  }

  return targetTemperature - currentTemperature > 0.5 ||
    currentTemperature - targetTemperature > 0.5
    ? false
    : true;
};

export default calculateTemperatureColor;
