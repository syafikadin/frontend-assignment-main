import React from 'react'
import {ComponentStory, ComponentMeta} from '@storybook/react'
import Table from './Index'
import {Button} from '@/components/Button/Index'
import {Icon} from '@iconify/react'
import {GetTablePage} from '@/service/example/example.service'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {GridValueGetterParams} from '@mui/x-data-grid'
import {GetListUsers} from '@/service/example/user.service'

export default {
    title: 'Components/Table',
    component: Table
} as ComponentMeta<typeof Table>

const queryClient = new QueryClient({
    defaultOptions: {queries: {staleTime: Infinity, refetchOnMount: true}}
})

const withQueryClient = (Story: any) => {
    queryClient.setQueryData(['table-data'], {
        //... set your mocked data here
    })
    return (
        <QueryClientProvider client={queryClient}>
            <Story/>
        </QueryClientProvider>
    )
}

const Template: ComponentStory<typeof Table> = args => <Table {...args} />
export const Default = Template.bind({})
Default.decorators = [withQueryClient]

Default.args = {
    columns: [
        {field: 'id', headerName: 'ID', width: 150, editable: false, flex: 1},
        {field: 'first_name', headerName: 'NAME', width: 150, editable: false, flex: 1},
        {
            field: 'actions',
            headerName: 'ACTIONS',
            width: 180,
            editable: false,
            flex: 1,
            renderCell: () => (
                <>
                    <Button variant='text' color='primary' size='small'>
                        <Icon icon='uil:pen'/>
                    </Button>
                    <Button variant='text' color='error' size='small'>
                        <Icon icon='uil:trash-alt'/>
                    </Button>
                </>
            )
        }
    ],
    dataFetchService: GetTablePage,
    title: 'Example List'
}

export const CustomRow = Template.bind({})
CustomRow.decorators = [withQueryClient]

CustomRow.args = {
    dataFetchService: GetListUsers,
    columns: [
        {
            field: 'email',
            headerName: 'EMAIL',
            flex: 1,
            sortable: false,
            disableColumnMenu: true
        },
        {
            field: 'actions',
            headerName: 'ACTIONS',
            renderCell: () => (
                <>
                    <Button variant='text' color='primary' size='small'>
                        <Icon icon='uil:pen'/>
                    </Button>
                    <Button variant='text' color='error' size='small'>
                        <Icon icon='uil:trash-alt'/>
                    </Button>
                </>
            ),
            flex: 1,
            sortable: false,
            disableColumnMenu: true
        }
    ],
    filters: []
}