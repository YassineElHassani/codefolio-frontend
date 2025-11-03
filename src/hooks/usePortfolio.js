import { useQuery } from '@apollo/client'
import { GET_PORTFOLIO } from '../graphql/queries'

export const usePortfolio = () => {
  const { data, loading, error, refetch } = useQuery(GET_PORTFOLIO, {
    fetchPolicy: 'cache-and-network',
  })

  return {
    data: data?.getPortfolio ?? null,
    loading,
    error,
    refetch,
  }
}
