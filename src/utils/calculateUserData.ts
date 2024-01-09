export function calculateAge(birthDate: Date) {
    const today = new Date();
    const dob = new Date(birthDate);

    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
    }

    return age;
}

export function calculateDemands(gender: string, palActive: number, palPassive: number, weight: number, height: number, age: number, prefs: string) {
    let ppm = 0;
    let caloricDemand = 0;
    let waterDemand = 0;
    switch (gender) {
        case 'M':
            ppm = 66.5 + (13.75 * weight) + (5.003 * height) - (6.775 * age);
            break;
        case 'F':
            ppm = 655.1 + (9.563 * weight) + (1.85 * height) - (4.676 * age);
            break;
    }
    const averagePal = (palActive + palPassive) / 2;
    const cpm = averagePal * ppm;
    switch (prefs) {
        case 'burn':
            caloricDemand = Math.round(cpm - 300)
            break;
        case 'balance':
            caloricDemand = Math.round(cpm)
            break;
        case 'surplus':
            caloricDemand = Math.round(cpm + 300)
            break;
    }
    waterDemand = caloricDemand;
    return {caloricDemand, waterDemand}
}

export function calculateBMI(height: number, weight: number, plannedWeight: number) {
    const heightMeters = height / 100;
    const currentBMI = parseFloat((weight / (heightMeters * heightMeters)).toFixed(1));
    const plannedBMI = parseFloat((plannedWeight / (heightMeters * heightMeters)).toFixed(1));
    return {currentBMI, plannedBMI}
}