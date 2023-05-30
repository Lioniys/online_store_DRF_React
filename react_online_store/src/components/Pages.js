import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Pagination} from "react-bootstrap";
import {PAGE_SIZE} from "../consts";


const Pages = observer(() => {
    const {shop} = useContext(Context);
    const pageCount = Math.ceil(shop.totalCount / PAGE_SIZE);
    const pages = [];

    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1);
    }

    const next = () => {
        if (shop.page + 1 <= pageCount) {
            shop.setPage(shop.page + 1);
        }
    }
    const prev = () => {
        if (shop.page - 1 >= 1) {
            shop.setPage(shop.page - 1);
        }
    }

    return (
        <Pagination className="mt-5 d-flex justify-content-center">
            <Pagination.First onClick={() => shop.setPage(1)}/>
            <Pagination.Prev onClick={prev}/>
            {pages.map(page =>
                    <Pagination.Item
                        key={page}
                        active={shop.page === page}
                        onClick={() => shop.setPage(page)}
                    >{page}</Pagination.Item>
            )}
            <Pagination.Next onClick={next}/>
            <Pagination.Last onClick={() => shop.setPage(pageCount)}/>
        </Pagination>
    );
});

export default Pages;