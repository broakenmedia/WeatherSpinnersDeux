export default {
    getDurationForWindSpeed(windSpeed :number) :number {
        /* Mapping a real world wind speed range of 0-10 meters per second to an animation duration of 7000-15000 millis */
        var millisLowerBound = 5000;
        var millisUpperBound = 20000;
        var windSpeedLowerBound = 1;
        var windSpeedUpperBound = 10;
        return ((windSpeed - windSpeedLowerBound) / (windSpeedUpperBound - windSpeedLowerBound) * (millisLowerBound - millisUpperBound) + millisUpperBound);
    },

    getRotationForWindSpeed(windSpeed :number) :number {
        /* Mapping a real world wind speed range of 0-10 meters per second to an animation duration of 7000-15000 millis */
        var degreesLowerBound = 720;
        var degreesUpperBound = 1440;
        var windSpeedLowerBound = 1;
        var windSpeedUpperBound = 10;
        return ((windSpeed - windSpeedLowerBound) / (windSpeedUpperBound - windSpeedLowerBound) * (degreesUpperBound - degreesLowerBound) + degreesLowerBound);
    },

    isLightningWeather(weatherID :number){
        /* IDs determined by OpenWeatherMap, 200 - 232 are different stages of thunderstorm. Not currently concered with intensity */
        return (weatherID >= 200 && weatherID <= 232) ? true : false;
    },

    isRaining(weatherID :number){
        /* IDs determined by OpenWeatherMap, 500 - 531 are different stages of rain. Not currently concered with intensity */
        return (weatherID >= 500 && weatherID <= 531) ? true : false;
    }
}