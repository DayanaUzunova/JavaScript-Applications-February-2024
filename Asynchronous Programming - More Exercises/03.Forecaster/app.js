function attachEvents() {
    document.getElementById("submit").addEventListener("click", getWeather);
    const forecastSectionRef = document.getElementById("forecast");
    const locationInputRef = document.getElementById("location");
    const currentRef = document.getElementById("current");
    const upcomingRef = document.getElementById("upcoming");

    const baseLocationURL = "http://localhost:3030/jsonstore/forecaster/locations";
    const todayURL = "http://localhost:3030/jsonstore/forecaster/today/";
    const upcomingURL = "http://localhost:3030/jsonstore/forecaster/upcoming/";

    async function getWeather(ev){
        try{
            const userInput = locationInputRef.value;
            forecastSectionRef.style.display = "block";
            const locationResponse = await fetch(baseLocationURL);
            const locationData = await locationResponse.json();
            const currentLocationData = locationData.find(x => x.name === userInput);
            await fillTodayData(currentLocationData.code);
            await fillUpcomingData(currentLocationData.code);
        }
        catch(error){
            forecastSectionRef.textContent = "Error";
        }
    }

    async function fillTodayData(code){
        const response = await fetch(todayURL + code);
        const data = await response.json();
        const todayInfo = createForecastTodaySection(data);
        currentRef.appendChild(todayInfo);
    }

    async function fillUpcomingData(code){
        const response = await fetch(upcomingURL + code);
        const data = await response.json();
        const upcomingInfo = createForecastUpcomingSection(data);
        upcomingRef.appendChild(upcomingInfo);
    }

    function createForecastUpcomingSection(data){
        const container = document.createElement("div");
        container.classList.add("forecast-info");

        const upcoming1 = generateSpan("upcoming", "symbol", data.name, data.forecast[0]);
        const upcoming2 = generateSpan("upcoming", "symbol", data.name, data.forecast[1]);
        const upcoming3 = generateSpan("upcoming", "symbol", data.name, data.forecast[2]);
        container.appendChild(upcoming1);
        container.appendChild(upcoming2);
        container.appendChild(upcoming3);
        return container;
    }

    function generateSpan(classContainer, classSpan, name, data){
        const spanContainer = document.createElement("span");
        spanContainer.classList.add(classContainer);

        const spanName = document.createElement("span");
        spanName.classList.add(classSpan);
        classSpan === "symbol" ? spanName.innerHTML = findSymbol(data.condition) : spanName.textContent = name;
        
        const degree = document.createElement("span");
        degree.classList.add("forecast-data");
        degree.innerHTML = `${data.low + findSymbol("Degrees")}/${data.high + findSymbol("Degrees")}`;

        const condition = document.createElement("span");
        condition.classList.add("forecast-data");
        condition.textContent = data.condition;
        spanContainer.appendChild(spanName);
        spanContainer.appendChild(degree);
        spanContainer.appendChild(condition);

        return spanContainer;
    }

    function createForecastTodaySection(data){
        const container = document.createElement("div");
        container.classList.add("forecasts");
        const conditionSpan = document.createElement("span");
        conditionSpan.classList.add("condition");
        conditionSpan.classList.add("symbol");
        conditionSpan.innerHTML = findSymbol(data.forecast.condition);

        container.appendChild(conditionSpan);
        const spanContainer = generateSpan("condition", "forecast-data", data.name, data.forecast);

        container.appendChild(spanContainer);
        return container;
    }

    function findSymbol(condition){
        switch(condition){
            case "Sunny" : return "&#x2600";
            case "Partly sunny" : return "&#x26C5";
            case "Overcast" : return "&#x2601";
            case "Rain" : return "&#x2614";
            case "Degrees" : return "&#176";
        }
    }

}

attachEvents();