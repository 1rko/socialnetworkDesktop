import React from "react";
import styles from './Paginator.module.css'

const Paginator = (props) => {

    let pagesCount = Math.ceil(props.totalCount / props.usersCount)
    let pages = []

    if ((props.currentPage > 2) && (props.currentPage <= (pagesCount - 2))) {
        pages = [1, props.currentPage - 1, props.currentPage, props.currentPage + 1, pagesCount]
    } else {
        pages = [1, 2, 3, pagesCount - 2, pagesCount - 1, pagesCount]
    }

    pages = pages.map(page => {
        return <span
            className={((props.currentPage === page) && styles.selectedUsersPage) + ' ' + styles.pageItem}
            onClick={() => {
                props.onPageChanged(page)
            }}>{page + "_"}</span>
    })

    return (
        <div>
            {pages}
        </div>
    )
};

export default Paginator