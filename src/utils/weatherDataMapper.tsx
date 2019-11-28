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
    },

    getTemperatureCelcius(tempKelvin :number){
        /* Formula required to convert from Kelvin to Celcius */
        return Math.floor(tempKelvin - 273.15);
    },

    getHSLForTemp(tempKelvin :number){
        /* Generate HSL color based on temperature, courtesy of Univers */
        var temp = Math.pow(this.getTemperatureCelcius(tempKelvin), 1.5) || 0;
        var mina = 210 - temp;
        if(mina > 225) mina = 225;
        var variance = 80;
        var maxa = mina - variance;
        if(maxa < 0) maxa = 0;
        var h = mina + (Math.random() * (maxa - mina));
        var s = 80 + Math.floor(Math.random() * 5);
        var l = 58 + Math.floor(Math.random() * 5);
        return 'hsl(' + h + "," + s + "%," + l + "%)";
    },

    getLinearGradientForTemp(tempKelvin:number){
        var s = 'linear-gradient(to top';
        for (let i = 0; i < 2; i++) {
            s+= ',' + this.getHSLForTemp(tempKelvin);
        }
        s+= ')';
        return s;
    }
}