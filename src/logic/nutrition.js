export async function getStats(weight, name) {
    const request = await fetch('https://trackapi.nutritionix.com/v2/natural/nutrients', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
            'x-app-id': '3f133421',
            'x-app-key': '53717f3304400f77b3193613ad59e065',
            'x-remote-user-id': '3f133421'
        },
        body: JSON.stringify({
            "query": name,
        }
        ),
    })

    const data = await request.json()

    const nutritionData = data.foods[0]

    const gramsInServing = nutritionData.serving_weight_grams;

    return {
        protein: (nutritionData.nf_protein / gramsInServing) * weight,
        carbs: (nutritionData.nf_total_carbohydrate / gramsInServing) * weight,
        fat: (nutritionData.nf_total_fat / gramsInServing) * weight,
        calories: (nutritionData.nf_calories / gramsInServing) * weight,
        fiber: (nutritionData.nf_dietary_fiber / gramsInServing) * weight,
        potassium: ((nutritionData.nf_potassium / 1000) / gramsInServing) * weight,
        sodium: ((nutritionData.nf_sodium / 1000) / gramsInServing) * weight
    };

}