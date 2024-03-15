export const macroValidator = (val: {macros: {fats: number, carbs: number, proteins: number}}) => {
  return val.macros.fats + val.macros.carbs + val.macros.proteins === 100;
}