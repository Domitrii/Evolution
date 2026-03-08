import { Helmet } from "react-helmet-async"


function PageTitle
({children}:{children: string}) {
  return (
    <Helmet>
      <title>{children}</title>
    </Helmet>
  )
}

export default PageTitle
