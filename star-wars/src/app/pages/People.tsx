'use client';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPeopleData } from '../../redux/reducers/rootReducer'
import { TableLoader } from '../components/loader/TableLoader';
import PeopleTable from '../components/table/PeopleTable';
import {ErrorCard} from '../components/error/ErrorCard';

const PeopleDashboard: React.FC = () => {
  const dispatch = useDispatch();
  const { loading, errorStatus, errorMessage, data } = useSelector((state:any) => state.peopleReducer);
  console.log("data-->>", data)
  useEffect(() => {
    dispatch(fetchPeopleData() as unknown as any);
  }, [dispatch]);

  return (
    <div>
      {
        loading ?
          <TableLoader/>
        : 
        errorStatus ?
          <ErrorCard message={"errorMessage Star wars is a great movie. Here you can find all the information about star wars"} />
        : 
        (data && data.length > 1) && (
          <PeopleTable data={data} />
        )
      }
    </div>
  );
};

export default PeopleDashboard;
