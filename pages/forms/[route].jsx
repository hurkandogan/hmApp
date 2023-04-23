import { useRouter } from 'next/router';
import { useState } from 'react';

import InsertExpense from '../../components/forms/InsertExpense';
import InsertInsurance from '../../components/forms/InsertInsurance';

const Forms = () => {
  const Router = useRouter();
  const route = Router.query.route;
  const [forms] = useState({
    insert_expense: <InsertExpense />,
    insert_insurance: <InsertInsurance />,
  });

  return (
    <>
      {forms[route] ? (
        forms[route]
      ) : (
        <div>
          You&apos;ve entered a malformed URL. Please go to another page from
          sidebar.
        </div>
      )}
    </>
  );
};

export default Forms;
