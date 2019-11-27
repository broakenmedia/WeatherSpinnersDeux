export default {
    getDurationForWindSpeed(windSpeed :number) :number {
        /* Mapping a real world wind speed range of 0-10 meters per second to an animation duration of 7000-15000 millis */
        var millisLowerBound = 5000;
        var millisUpperBound = 20000;
        var windSpeedLowerBound = 1;
        var windSpeedUpperBound = 10;
        return ((windSpeed - windSpeedLowerBound) / (windSpeedUpperBound - windSpeedLowerBound) * (millisLowerBound - millisUpperBound) + millisUpperBound);
    }
}