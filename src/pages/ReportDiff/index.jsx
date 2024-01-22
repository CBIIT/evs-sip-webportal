import React, { useEffect }from 'react';
import styles from './index.module.css';
import ContentDiff from './ContentDiff';

// const PageTitle = styled.h1`
//   font-family: 'Raleway-Medium', sans-serif;
//   font-size: 2.25rem;
//   color: var(--main-title);
//   padding: 3rem 0 1.5rem 0;
// `;

const ReportDiff = () => {
  useEffect(()=> {
    window.scrollTo(0, 0);
  });

  return <div className={styles['page']}>
    <div className={styles['page-container']}>
        <ContentDiff/>
    </div>
  </div>
}

export default ReportDiff;
