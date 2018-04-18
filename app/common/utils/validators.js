import isEmpty from 'lodash/isEmpty'

export const required = value =>
  !value || isEmpty(value) ? 'Это поле необходимо заполнить' : undefined
