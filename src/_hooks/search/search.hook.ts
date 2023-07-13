import {useQuery, useQueryClient, useMutation} from 'react-query'
import ApiCall from 'src/@core/client/apiCall'

export const useGetLocations = (params: any, isEnabled = true) => {
    return useQuery(
        ['locations', params],
        () =>
            ApiCall('GET', `airports/search/${params.search}`, null, null, (res: any) => res.data),
        {
            enabled: isEnabled
        }
    )
}
export const usePostChartFlights = (old = false) => {
    let url = '';
    if (old) {
        url = 'flights/chart'
    } else {
        url = 'flights/statistics'
    }
    return useMutation(params => ApiCall('post', url, params, null, (res: any) => res.data))
}
export const useGetCharts = (params: any, enabled: boolean = true) => {
    return useQuery(
        ['charts', params],
        () =>
            ApiCall('POST', `flights/statistics`, params, null, (res: any) => res.data),
        {
            enabled: enabled
        }
    )
}
export const useGetFlights = (params: any) => {
    return useQuery(
        ['search', params],
        () =>
            ApiCall('POST', `flights`, params, null, (res: any) => res.data),
        {
            enabled: false
        }
    )
}

export const useGetSearch2 = (params: any = {}, isEnabled = false) => {
    return useQuery(
        ['search2', params],
        () =>
            ApiCall('POST', `flights/${params.transaction}/search2`, params.filters, null, (res: any) => res.data),
        {
            refetchInterval: (data) => {
                return data?.next || data === undefined ? 5000 : false
            },
            enabled: isEnabled
        }
    )
}
export const useGetFetchQuery = (name: string) => {
    const queryClient = useQueryClient()

    return queryClient.getQueriesData(name)
    // return queryClient.getQueryData('search2');
};
export const useGetAds = (params?: any) => {
    return useQuery(
        ['banners', params],
        () =>
            ApiCall('POST', `banners/get`, params, null, (res: any) => res.data),
        {
            enabled: true
        }
    )
}