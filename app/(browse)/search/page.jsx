import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Results, ResultsSkeleton } from "./_components/result";

// import { Results, ResultsSkeleton } from './_components/results';

;

const SearchPage = async({
    searchParams,
}) => {
    const search= await searchParams
    console.log(search.term)
    if (!searchParams.term) {
        redirect("/");
    }

    return (
        <div className="h-full p-8 max-w-screen-2xl mx-auto">
            <Suspense fallback={<ResultsSkeleton />}>
                <Results term={searchParams.term} />
            </Suspense>
        </div>
    )
}

export default SearchPage;