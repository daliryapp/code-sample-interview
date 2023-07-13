import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSelector } from "react-redux";

export function AuthGuard({ children }: { children: JSX.Element }) {
  const isAuthorized = useSelector((state: any) => !!state.auth.user);
  const accessToken = useSelector((state: any) => !!state.auth.accessToken);
  const refreshToken = useSelector((state: any) => !!state.auth.refreshToken);
  const router = useRouter()
  useEffect(() => {

    if (!isAuthorized || (!accessToken && !refreshToken)) {
      router.push('/auth/login/')
    }
    // eslint-disable-next-line
  }, [router, isAuthorized])

  if (isAuthorized) {
    return <>{children}</>
  }

  return null
}
