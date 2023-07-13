import SearchResultDomain from 'src/domains/searchResult';
const SearchResult = ({ data }: any) => {
    return (
        <SearchResultDomain />
    )
}

export async function getServerSideProps(context: any) {
    const slug = (context.query.slug as string[]) || [];
    const resturantId: string | undefined = slug?.[0]?.toString();
    // const res = await fetch(`${process.env.NEXT_PUBLIC_GET_LOCAL_URL}resturant/resturants/${resturantId}`);

    // const data = await res.json()
    return { props: { data: null } }
}
export default SearchResult;