import {useQuery} from '@tanstack/react-query'
import {type PropsTable} from '@/components/Table/Table.type'
import {PREFIX_KEY} from '@/constant/common'
import client from '@/client/index'

type Sto = {
    name: string
    date_created: string
}

type User = {
    id: string
    email: string
    sto?: Sto
}

type GetListUsersResponse = {
    data: User[]
}

export const GetListUsers: PropsTable['dataFetchService'] = params => {
    const queryParams = {
        ...params,
        fields: ['id', 'email', 'sto.name', 'sto.date_created']
    }

    return useQuery({
        queryKey: [PREFIX_KEY.GET, 'USERS', queryParams],
        async queryFn() {
            const response = await client.api.get<GetListUsersResponse>('/users', {
                params: queryParams
            })

            return response.data
        }
    })
}
