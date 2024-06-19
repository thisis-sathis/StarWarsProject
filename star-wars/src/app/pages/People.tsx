'use client';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPeopleData } from '../../redux/reducers/peopleSlice';
import { TableLoader } from '../components/loader/TableLoader';
import { PeopleTable } from '../components/table/PeopleTable';
import { ErrorCard } from '../components/error/ErrorCard';
import './People.scss';


type RootState = {
  peopleReducer: {
    loading: boolean;
    errorStatus: boolean;
    errorMessage: string;
    data: any[];
  };
};

const PeopleDashboard: React.FC = () => {
  const dispatch = useDispatch();
  const { loading, errorStatus, errorMessage, data } = useSelector(
    (state: RootState) => state.peopleReducer
  );

  useEffect(() => {
    dispatch(fetchPeopleData() as unknown as any);
  }, [dispatch]);

  

  return (
    <div>
      {loading ? (
        <TableLoader />
      ) : errorStatus ? (
        <ErrorCard message={errorMessage} />
      ) : (data && data.length > 1) ? (
        <PeopleTable data={data} />
      ) : null}
    </div>
  );
};

export default PeopleDashboard;
