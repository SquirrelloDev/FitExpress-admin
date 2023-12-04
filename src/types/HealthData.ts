
export type HealthData = {
    userHeight: number,
    userWeightCurrent: number,
    userWeightPlanned: number,
    age: number,
    palActive: number,
    palPassive: number,
    userGoal: "burn" | "balance" | "surplus",
    bmi: number,
    bmiPlanned: number,
    caloriesDemand: number,
    waterDemand: number
}