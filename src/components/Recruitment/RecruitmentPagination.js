import React from "react";
import { useHistory } from "react-router";
import { usePagination } from "@material-ui/lab";
import classNames from "classnames";
import qs from "query-string";

export default function RecruitmentPagination({ pagination, filters }) {
  const history = useHistory();
  const totalPage = Math.round(pagination / 3);

  const { items } = usePagination({
    count: totalPage || 0,
    page: filters.page || 1,
  });

  const goToPrev = () => {
    if (filters.page !== 1) {
      const _filters = { ...filters, page: filters.page - 1 };
      console.log(_filters);
      history.push(`/Recruitment?${qs.stringify(_filters)}`);
    }
  };
  const goToNext = () => {
    if (filters.page !== totalPage) {
      const _filters = { ...filters, page: filters.page + 1 };
      console.log(_filters);
      history.push(`/Recruitment?${qs.stringify(_filters)}`);
    }
  };
  const goToPage = (page) => {
    const _filters = { ...filters, page };
    history.push(`/Recruitment?${qs.stringify(_filters)}`);
  };
  return (
    <div className="recruitment-pagination">
      {items.map(({ page, type, selected }, index) => {
        let children = null;
        if (type === "start-ellipsis" || type === "end-ellipsis") {
          children = (
            <button disabled key={index}>
              {" "}
              ...{" "}
            </button>
          );
        } else if (type === "previous") {
          children = (
            <button
              key={index}
              onClick={goToPrev}
              disabled={filters.page === 1}
              className="recruitment-icon"
            >
              <svg
                enableBackground="new 0 0 11 11"
                viewBox="0 0 11 11"
                x={0}
                y={0}
                className="shopee-svg-icon icon-arrow-left"
              >
                <g>
                  <path d="m8.5 11c-.1 0-.2 0-.3-.1l-6-5c-.1-.1-.2-.3-.2-.4s.1-.3.2-.4l6-5c .2-.2.5-.1.7.1s.1.5-.1.7l-5.5 4.6 5.5 4.6c.2.2.2.5.1.7-.1.1-.3.2-.4.2z" />
                </g>
              </svg>
            </button>
          );
        } else if (type === "next") {
          children = (
            <button
              key={index}
              onClick={goToNext}
              className="recruitment-icon"
              disabled={filters.page === totalPage}
            >
              <svg
                enableBackground="new 0 0 11 11"
                viewBox="0 0 11 11"
                x={0}
                y={0}
                className="shopee-svg-icon icon-arrow-right"
              >
                <path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z" />
              </svg>
            </button>
          );
        } else if (type === "page") {
          children = (
            <button
              key={index}
              className={classNames({ active: selected })}
              onClick={() => goToPage(page)}
            >
              {page}
            </button>
          );
        }
        return children;
      })}
    </div>
  );
}
