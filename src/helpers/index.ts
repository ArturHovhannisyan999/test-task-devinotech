import { CELSIUS, FARENGATE } from "../constants"

export const calculateWeather = (type: string, temp: number) => {
    switch (type) {
        case CELSIUS:
            return Math.floor((temp - 273.15));
        case FARENGATE:
            return Math.floor(((temp - 273.15) * 9) / 5 + 32);
    }
} 