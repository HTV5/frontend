export function getStats(weight, name) {
    fetch('https://trackapi.nutritionix.com/v2/natural/nutrients', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
            'x-app-id': '3f133421',
            'x-app-key': '3717f3304400f77b3193613ad59e06',
            'x-remote-user-id': '3f133421'
        },
        body: JSON.stringify(name),
    })
        .then(response => response.json())
        .then(data => {
            let nutritionData = data;
            let gramsInServing = nutritionData.serving_weight_grams;

            let dict = {
                protein: (nutritionData.nf_protein / gramsInServing) * weight,
                carbs: (nutritionData.total_carbohydrate / gramsInServing) * weight,
                fat: (nutritionData.nf_total_fat / gramsInServing) * weight,

                calories: (nutritionData.nf_calories / gramsInServing) * weight,

                fiber: (nutritionData.nf_dietary_fiber / gramsInServing) * weight,
                potassium: ((nutritionData.nf_potassium / 1000) / gramsInServing) * weight,
                sodium: ((nutritionData.sodium / 1000) / gramsInServing) * weight
            };

            return dict;
        })
        .catch((error) => {
            console.error('Error:', error);
        });




}

