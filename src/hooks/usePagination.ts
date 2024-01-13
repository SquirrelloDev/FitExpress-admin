import {useSearchParams} from "react-router-dom";
import {useCallback, useMemo} from "react";
import {OnChangeFn, PaginationState} from "@tanstack/react-table";

function usePagination(defaultParams = {pageIndex: 1, pageSize: 10}) {
    //hook pozwalający pobierać i modyfikować paramertry zapytań
 //    inicjalizujemy query parametry z propów
 const [searchParams, setSearchParams] = useSearchParams({
     pageIndex: String(defaultParams.pageIndex),
     pageSize: String(defaultParams.pageSize)
 })
    // aktualne parametry paginacji pobieranie z adresu url
    const paginationParams = useMemo(() => {
        return {
            pageIndex: Number(searchParams.get('pageIndex')) - 1,
            pageSize: Number(searchParams.get('pageSize'))
        }
    }, [searchParams])
    // funkcja odpowiadająca za zmianę parametrów paginacji
    // jest opakowana w useCallbck, by za każdym przejściem do nowej podstrony nie inicjalizować jej adresu w pamięci od nowa
    // fn to jest po prostu parametr funkcji opisany poniżej przy klauzuli if
    const setPaginationParams: OnChangeFn<PaginationState> = useCallback((fn) => {
        // z dostępnej funkcji modyfikujemy parametry adresu url. prev symbolizuje poprzednią wartość przed zmianą (działa to podobnie jak w hooku useState)
        setSearchParams((prev) => {
            const params = {
                pageSize: Number(prev.get('pageSize')),
                pageIndex: Number(prev.get('pageIndex')) - 1
            }
            // jeśli podany parametr jest funkcją zwracającą parametry, to zwróć te parametry do zmiennej
            if(typeof fn === 'function'){
                const updatedParams = fn(params)
                // i zwróć zaktualizowane wartości
                return {
                    pageIndex: String(updatedParams.pageIndex + 1),
                    pageSize: String(updatedParams.pageSize)
                }
            }
            // jeśli parametr funkcji nie jest funkcją tylko obiektem z parametrami paginacji, to po prostu je przypisz odpowienio
            return {
                pageIndex: String(fn.pageIndex + 1),
                pageSize: String(fn.pageSize)
            }
        })
    }, [setSearchParams])
    return [paginationParams, setPaginationParams] as const
}
export default usePagination