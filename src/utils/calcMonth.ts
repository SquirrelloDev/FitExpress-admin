const calcLowerDate = (dateNumber: number): string => {
  if(dateNumber < 10){
      return `0${dateNumber}`
  }
  return dateNumber.toString()
}
export default calcLowerDate