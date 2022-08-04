import { useEffect, useState } from 'react';
import { PaginatedList } from 'components';
import { useSearchParams } from 'react-router-dom';

const rowsPerPage = 5;

export default function PaginatedListController({
    concat = false,
    count,
    Component,
    getData,
    noData,
}) {
    const [searchParams] = useSearchParams();

    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [load, setLoad] = useState(concat);

    const handleChangePage = (_, newPage) => {
        setPage(newPage);
        if (load && newPage > ((count ?? data.length) - 100) / rowsPerPage)
            loadData();
    };

    const loadData = async (clear) => {
        const newData = await getData(clear ? {} : data[data.length - 1] ?? {});

        if (newData?.length)
            if (clear) setData(newData);
            else setData(data.concat(newData));
        else setLoad(false);
    };

    useEffect(() => {
        loadData(true);
    }, [searchParams, getData]);

    useEffect(() => {
        const interval = setInterval(() => {
            loadData();
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    return (
        <PaginatedList
            {...{
                count: Math.ceil((count ?? data.length) / rowsPerPage),
                data: data
                    .filter((d) => d)
                    .slice((page - 1) * rowsPerPage, page * rowsPerPage),
                Component,
                handleChangePage,
                noData,
                page,
                rowsPerPage,
            }}
        />
    );
}
