import React, { lazy, Suspense } from 'react';
import { Skeleton } from 'antd';

const loadable = (importFunc, { fallback = <Skeleton /> } = {}) => {
    try {
        const LazyComponent = lazy(importFunc);

        return props => (
            <Suspense fallback={fallback}>
                <LazyComponent {...props} />
            </Suspense>
        );

    } catch (err) {
        return <div>notfound</div>
    }
};

export default loadable;