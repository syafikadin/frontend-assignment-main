import {ReactNode} from 'react'

export interface TypeTableColumn {
    field: string
    headerName: string
    width?: number
    editable?: boolean
    renderCell?: (params: any) => ReactNode
}

interface FetchParameters {
    search: string
    page: number
    limit: number
    meta: string[]
}

export interface PropsTable {
    data?: any[]
    columns?: TypeTableColumn[]
    height?: string
    limit?: number
    title?: string
    dataFetchService: (params: FetchParameters) => Promise<any>
}
