function tsp_hk(distance_matrix) {
    if (distance_matrix.length <= 1) {
        return 0;
    }

    
    let cache = {};

    let cities = new Set([...Array(distance_matrix.length).keys()]);  

    let min = Infinity;

    
    for (let i = 0; i < distance_matrix.length; i++) {
        let temp = heldKarp(distance_matrix, cities, i, cache);
        if (temp < min) {
            min = temp;
        }
    }

    return min;
}

function heldKarp(dist, cities, start, cache) {
    
    let key = JSON.stringify(Array.from(cities).sort()) + "-" + start;

    if (cache[key] !== undefined) {
        return cache[key];  
    }

  
    if (cities.size === 2) {
        const [city1, city2] = cities;
        const result = dist[city1][city2];
        cache[key] = result;
        return result;
    }


    let min = Infinity;

    
    for (let city of cities) {
        if (city !== start) {
            let newCities = new Set(cities);
            newCities.delete(start);  
            let temp = heldKarp(dist, newCities, city, cache) + dist[start][city]; 
            if (temp < min) {
                min = temp;
            }
        }
    }

    
    cache[key] = min;
    return min;
}
