import { useAppSelector } from "../../store/hooks";
import { calculateWeather } from "../../helpers";
import { CELSIUS } from "../../constants";
import "./index.css";
import { useEffect, useState } from "react";

interface ByTimeData {
    name: string;
    value: number;
}

export const WeatherItems = ({ cityName } : {cityName: string}) => {
    const [currentWeather, setCurrentWeather] = useState({} as any);
    const [byTimePeriod, setByTimePeriod] = useState({} as any);
    const [byTimeData, setByTimeData] = useState<ByTimeData[] | null>(null);
    const { weathers } = useAppSelector(state => state.weather);
    const filteredDataByDays = weathers.list?.reduce((acc: any, elm: any) => {
        const currentDate = elm.dt_txt;
        const currentDay = currentDate.substring(5, 10);
        const currentTime = currentDate.substring(11);
        if (!acc[currentDay]) {
            acc[currentDay] = {};
        }
        acc[currentDay][currentTime] = elm.main.temp;
        acc[currentDay].id = elm.dt;
        return acc;
    }, {})
    useEffect(() => {
        const helperData = [];
        if (byTimePeriod.id) {
            for (const key in byTimePeriod) {
                if (key !== 'id') {
                    const calculatedValue = calculateWeather(CELSIUS, byTimePeriod[key]);
                    if (calculatedValue !== undefined) {
                        helperData.push({ name: key, value: calculatedValue });
                    }
                }
            }
        }
        setByTimeData(helperData);
    }, [byTimePeriod])
    const filteredData = [];

    for (const key in filteredDataByDays) {
        const infoWeather = {} as any;
        for (const item in filteredDataByDays[key]) {
            infoWeather.name = key;
            infoWeather.value = calculateWeather(CELSIUS, filteredDataByDays[key][item])
            infoWeather.id = filteredDataByDays[key].id;
        }
        filteredData.push(infoWeather)
    }

    const handleSearchById = (id: number, name: string) => {
        for (let i = 0; i < weathers.list.length; i++) {
            const current = weathers.list[i];
            if (current.dt === id) {
                setCurrentWeather(current);
                break;
            }
        }
        setByTimePeriod(filteredDataByDays[name]);
    }

    return (
        <>
            <div className="current-weather">
                {currentWeather
                    ? <div className="current-weather-wrapper">
                        <div className="current-weather-left">
                            <p>{cityName}</p>
                            {calculateWeather(CELSIUS, currentWeather?.main?.temp)
                                ?   
                                    <>
                                        <h2>{calculateWeather(CELSIUS, currentWeather?.main?.temp)} C</h2>
                                        <p className="bold-text">{currentWeather?.weather[0].main}</p>
                                    </>
                                : 
                                    <h2>Please choose below for current information of day</h2>
                            }
                        </div>
                        <div className="current-weather-right">
                            {byTimeData
                            ?
                                byTimeData.map(elm =>
                                    <div className="by-time" key={Math.random()}>
                                        <div>{elm.name}</div>
                                        <div className="celsius">{elm.value} C</div>
                                    </div>
                                )
                            :   
                                <p></p>
                            }
                        </div>
                    </div>
                    : <h3>Please choose below for current information of day</h3>
                }
            </div>
            <div className="weathers">
                {filteredData.map(data =>
                    <div key={Math.random()} onClick={() => handleSearchById(data.id, data.name)} className="weather">
                        <p>{data.name}</p>
                        <h2>{data.value} C</h2>
                    </div>
                )}
            </div>
        </>
    )
}