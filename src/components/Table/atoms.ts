import { atom } from 'jotai'
import { type FilterType } from './Table.type'

type FilterValue = {
  name: string
  type: FilterType
  field: string
  values: {
    text: string
    value: any
  }[]
}

export const filterValuesAtom = atom<FilterValue[]>([])
