import { IParams } from '@/types/master/filter'
import { type DataGridProps } from '@mui/x-data-grid'
import { type UseQueryResult } from '@tanstack/react-query'
import { type ReactNode } from 'react'

export interface FetchParameters extends IParams {
  search?: string
}

export type DropdownMultipleFilter = {
  type: 'dropdown-multiple'
  name: string
  labelKey: string
  field: string
  dataFetchService: () => UseQueryResult<{ data: any[] }>
}

type DateFilter = {
  type: 'date'
  name: string
  field: string

  // TODO: isTimestamp: boolean
}

type Filter = DropdownMultipleFilter | DateFilter

export type PropsTable = {
  limit?: number
  title?: string
  rightHeaderContent?: ReactNode
  isStripped?: boolean
  dataFetchService: (params?: FetchParameters) => UseQueryResult<{ data: any[]; meta: { filter_count: number } }>
  filters?: Filter[]
  columns: (DataGridProps['columns'][number] & {
    searchable?: boolean
  })[]
}

export type FilterType = Filter['type']
