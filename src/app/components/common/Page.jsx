import React  from 'react';
import PropTypes from 'prop-types';

function Page({ children, additionalClass }) {
    return (
        <div className={ `page ${additionalClass}` }>
            <img src="/img/solved_bg.png" />
            <div className="content">
                { children }
            </div>
        </div>
    );
}

Page.propTypes = { children: PropTypes.array };

export default Page;