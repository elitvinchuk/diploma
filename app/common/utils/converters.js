export const arrayToObject = value =>
  value.reduce((valuesMap, tutor) => {
    valuesMap[tutor.value] = tutor.label

    return valuesMap
  }, {})

export const objectToArray = valueMap =>
  valueMap
    ? Object.keys(valueMap).map(value => ({
        label: valueMap[value],
        value
      }))
    : []

export const flattenArray = values => values.map(course => course.value)

export const objectToValue = object => object.value
