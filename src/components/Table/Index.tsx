import Typography from '@mui/material/Typography'
import { Fragment, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Skeleton from '@mui/material/Skeleton'
import { type PropsTable } from './Table.type'
import { useDebounce } from '@/hooks/useDebounce'
import { DataGrid, GridSortModel } from '@mui/x-data-grid'
import Icon from '@/components/Icon/index'
import { Input } from '@/components/Input/Index'
import { useAtom } from 'jotai'
import { Button } from '@/components/Button/Index'
import { Pagination } from '@/components/Pagination/Index'
import { DropdownMultiple } from './DropdownMultiple'
import { Date } from './Date'
import { dateFilterObj, dropdownMultipleFilterObj, searchFilterObj } from './Table.utils'
import { filterValuesAtom } from './atoms'

const Table = ({ dataFetchService, limit = 10, filters = [], ...props }: PropsTable) => {
  const [page, setPage] = useState(1)

  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 1000)

  const [filterValues, setFilterValues] = useAtom(filterValuesAtom)

  const [sortModel, setSortModel] = useState<GridSortModel>([])

  const {
    data: dataRaw,
    error,
    isLoading,
    isSuccess
  } = dataFetchService({
    page,
    limit,
    meta: ['filter_count'],
    filter:
      filterValues.length || debouncedSearch
        ? {
            _and: filterValues.length
              ? filterValues.map(filterValue => {
                  if (filterValue.type === 'dropdown-multiple') {
                    return dropdownMultipleFilterObj({
                      field: filterValue.field,
                      value: filterValue.values.map(value => value.value)
                    })
                  }

                  return dateFilterObj({
                    field: filterValue.field,
                    date: filterValue.values[0].value
                  })
                })
              : undefined,
            _or: debouncedSearch
              ? searchFilterObj({
                  fields: props.columns.filter(column => column.searchable).map(column => column.field),
                  value: debouncedSearch
                })
              : undefined
          }
        : undefined,
    sort: sortModel.length
      ? [`${sortModel[0].sort === 'desc' ? '-' : ''}${sortModel[0].field}`, 'id'].toString()
      : undefined
  })

  const content = () => {
    if (isLoading) {
      return (
        <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <Skeleton variant='rectangular' width='100%' height={60} />
          {Array(limit)
            .fill(null)
            .map((_, i) => (
              <Skeleton
                key={`table-skeleton-${i}`}
                animation='wave'
                sx={{ mt: 1 }}
                variant='rectangular'
                width='100%'
                height={30}
              />
            ))}
        </Box>
      )
    }

    if (error) {
      return (
        <Typography variant='body1' fontWeight={700} noWrap>
          Something went wrong. Please try again later.
        </Typography>
      )
    }

    if (isSuccess) {
      return (
        <DataGrid
          sx={{
            '&.MuiDataGrid-root .MuiDataGrid-columnHeaders': {
              borderRadius: 0,
              backgroundColor: '#F5F8FF'
            },
            '&.MuiDataGrid-root .MuiDataGrid-columnHeaderTitle': {
              color: '#2F3033'
            },
            '&.MuiDataGrid-root .MuiDataGrid-row.Mui-hovered': {
              backgroundColor: 'transparent'
            },
            '&.MuiDataGrid-root .MuiDataGrid-row:hover': {
              backgroundColor: 'transparent'
            },
            ...(props.isStripped
              ? {
                  '&.MuiDataGrid-root .MuiDataGrid-row:nth-of-type(even)': {
                    backgroundColor: '#F5F8FF'
                  },
                  '&.MuiDataGrid-root .MuiDataGrid-row .MuiDataGrid-cell': {
                    border: 0
                  }
                }
              : {})
          }}
          rows={(dataRaw?.data as any[]) ?? []}
          columns={props.columns ?? []}
          loading={false}
          hideFooter
          rowSelection={false}
          autoHeight
          sortingMode='server'
          sortModel={sortModel}
          onSortModelChange={(model: GridSortModel) => setSortModel(model)}
        />
      )
    }

    return (
      <Typography variant='body1' fontWeight={700} noWrap>
        empty data
      </Typography>
    )
  }

  useEffect(() => {
    setPage(1)
  }, [filterValues.length, debouncedSearch])

  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: '#FEFEFE',
        borderRadius: '6px',
        boxShadow: '0px 2px 6px 0px rgba(0, 0, 0, 0.25)',
        marginTop: '24.5px',
        padding: props.title ? '24px 24px 28px' : undefined
      }}
    >
      {props.title || props.rightHeaderContent ? (
        <Box display='flex' alignItems='center' justifyContent='space-between' height='35px'>
          {props.title ? (
            <Typography variant='body1' color='text.secondary'>
              {props.title}
            </Typography>
          ) : null}

          {props.rightHeaderContent}
        </Box>
      ) : null}
      <Box sx={{ padding: '10px 20px', marginTop: props.title || props.rightHeaderContent ? '20px' : undefined }}>
        <Input
          placeholder='Search'
          variant='filled'
          fullWidth
          sx={{
            '& fieldset': { border: 'none' },
            '& .MuiOutlinedInput-root.Mui-focused': {
              boxShadow: 'none'
            }
          }}
          InputProps={{
            style: {
              paddingLeft: '0px'
            },
            startAdornment: <Icon fontSize='24px' icon='mdi:magnify' color='#6C7086' style={{ marginRight: '10px' }} />
          }}
          onChange={e => setSearch(e.target.value)}
        />
      </Box>
      {filters.length ? (
        <>
          <Divider sx={{ borderColor: theme => theme.palette.grey[200] }} />
          <Box sx={{ padding: '10px 20px', display: 'flex', alignItems: 'center', columnGap: '20px' }}>
            {filters.map(filter => (
              <Fragment key={filter.name}>
                {filter.type === 'dropdown-multiple' ? (
                  <DropdownMultiple
                    name={filter.name}
                    field={filter.field}
                    labelKey={filter.labelKey}
                    dataFetchService={filter.dataFetchService}
                  />
                ) : null}
                {filter.type === 'date' ? <Date name={filter.name} field={filter.field} /> : null}
              </Fragment>
            ))}
          </Box>
        </>
      ) : null}
      <Divider sx={{ borderColor: theme => theme.palette.grey[200] }} />
      <Box sx={{ display: 'flex', columnGap: '10px', height: '63px', alignItems: 'center', padding: '0px 20px' }}>
        {filterValues.length ? (
          filterValues.map((filterValue, index) => (
            <Fragment key={filterValue.name}>
              {filterValue.values.map(value => (
                <Box
                  key={`${filterValue.name}-${value.value}`}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    border: theme => `1px solid ${theme.palette.grey[200]}`,
                    padding: '5px 10px',
                    borderRadius: '9999px',
                    columnGap: '10px'
                  }}
                >
                  <Box sx={{ display: 'flex', columnGap: '6px' }}>
                    <Typography variant='body1' color='text.secondary'>
                      {filterValue.name} :
                    </Typography>
                    <Typography variant='body1' color='text.primary'>
                      {value.text}
                    </Typography>
                  </Box>
                  <Button
                    type='button'
                    style={{ minWidth: 'unset', padding: 0 }}
                    onClick={() => {
                      const filterValuesCopy = [...filterValues]
                      const newValues = filterValue.values.filter(v => v.value !== value.value)
                      if (!newValues.length) {
                        filterValuesCopy.splice(index, 1)
                        setFilterValues(filterValuesCopy)

                        return
                      }
                      setFilterValues(
                        filterValues.map(fv => {
                          return {
                            ...fv,
                            values: newValues
                          }
                        })
                      )
                    }}
                  >
                    <Icon icon='material-symbols:cancel-outline' color='#909094' fontSize='18px' />
                  </Button>
                </Box>
              ))}
              {filterValues.length > 1 && index !== filterValues.length - 1 ? <Typography>AND</Typography> : null}
            </Fragment>
          ))
        ) : (
          <Typography variant='body1' color='text.primary'>
            No Filter
          </Typography>
        )}
      </Box>
      <Box sx={{ padding: '10px 20px' }}>
        {content()}
      </Box>
      <Box
        display='flex'
        alignItems='center'
        justifyContent='space-between'
        {...(props.title ? { marginTop: '20px' } : { padding: '20px' })}
      >
        <Typography fontSize='14px' letterSpacing='0.25px' color='text.secondary'>
          Showing {dataRaw?.data.length ? (page - 1) * limit + 1 : 0} to{' '}
          {(page - 1) * limit + (dataRaw?.data.length ?? 0)} of {dataRaw?.meta.filter_count ?? 0} entries
        </Typography>
        <Pagination
          count={Math.ceil((dataRaw?.meta.filter_count ?? 0) / limit)}
          page={page}
          onChange={(_, value) => setPage(value)}
          shape='rounded'
        />
      </Box>
    </Box>
  )
}

export default Table;