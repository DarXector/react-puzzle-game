import React, { PropTypes } from 'react';

function Page({ children, additionalClass }) {
    return (
        <div className={ `page ${additionalClass}` }>
            <img src="/static/img/solved_bg.png" />
            <div className="content">
                { children }
            </div>
        </div>
    );
}

Page.propTypes = { children: PropTypes.array };

export default Page;