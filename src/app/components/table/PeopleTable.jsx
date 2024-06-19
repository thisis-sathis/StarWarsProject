"use client"
import { useState, useRef } from 'react';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import "./PeopleTable.scss";
import { useSelector, useDispatch } from 'react-redux';
import { fetchFilmsData } from '../../../redux/reducers/filmSlice';
import { fetchPeopleData } from '../../../redux/reducers/peopleSlice';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnFiltersState,
  getFilteredRowModel,
  SortingState,
} from "@tanstack/react-table"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import AttributesViewer from '../viewer/AttributesViewer';
import DataTable from './DataTable';
import PaginationControls from '../pagination/PaginationControls';
import CardListLoader from '../loader/CardLoader';



export function PeopleTable({ data }) {
  const [sorting, setSorting] = useState([])
  const [columnFilters, setColumnFilters] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const sheetTriggerRef = useRef(null); 
  const dispatch = useDispatch();

  const { loading, errorStatus, errorMessage, films } = useSelector((state) => state.filmReducer);
  const { pagination, searchQuery, totalCount } = useSelector(
    (state) => state.peopleReducer
  );
  const columns = [
    { accessorKey: 'name', header: 'Name' ,  enableSorting: false},
    { accessorKey: 'height', header: 'Height' },
    { accessorKey: 'mass', header: 'Mass' },
    { accessorKey: 'gender', header: 'Gender' },
    { accessorKey: 'hair_color', header: 'Hair Color' },
    {
      accessorKey: 'view_more_details',
      header: 'More details',
      cell: ({ row }) => {
        return (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="secondary" style={{color: "#0074de", textDecoration: "underline"}}>View more</Button>
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px]">
              <SheetHeader>
                <SheetTitle>Character Details</SheetTitle>
                <SheetDescription>
                  Make changes to your profile here. Cl,ick save when you're done. This action cannot
                  be undone.
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4 min-w-[30rem]">
                <AttributesViewer inputAttributes={Object.entries(row.original).map(([key, value]) => ({
                  key,
                  value: value
                }))} />
              </div>
            </SheetContent>
          </Sheet>
        )
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters
    }
  });


  const onTableDataClick = (event,  rowData) => {
    if (rowData && rowData.films) {
      setSelectedRow(rowData);
      if (!((event?.target)?.innerHTML?.includes("View more"))) {
        dispatch(fetchFilmsData(rowData["films"]));
        if (sheetTriggerRef.current) {
          sheetTriggerRef.current.click();
        }
      }
      else{
        if (event) {
          event.preventDefault();
          event.stopPropagation();
        }
      }
    } else {
      console.error("Films property not found in rowData");
    }
  }

  const fetchOnpageChange = (url) => {
    dispatch(fetchPeopleData(url));
  }
  
  return (
    <div className="flex flex-col gap-4 people-data-table">
      <Input
        placeholder="Search character names..."
        value={(table.getColumn("name")?.getFilterValue()) ?? ""}
        onChange={(event) =>
          table.getColumn("name")?.setFilterValue(event.target.value)
        }
        className="max-w-sm outline-none"
      />
      <DataTable columns={columns} table={table} onTableDataClick={onTableDataClick} />
      <PaginationControls totalCount={totalCount} pagination={pagination} pageChange={fetchOnpageChange} table={table} />  
      <Sheet>
        <SheetTrigger asChild ref={sheetTriggerRef}>
          <Button variant="secondary" className='hidden'></Button>
        </SheetTrigger>
        <SheetContent className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>Film Details</SheetTitle>
            <SheetDescription>
              Here you can see the details of the film. The list of films will be displayed here.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-2 min-w-[30rem]">
            {
              loading ? (
                <CardListLoader />
              ) : errorStatus ? (
                <p>{errorMessage}</p>
              ) : (films && Object.keys(films).length != 0) && (
                <div className="character-films">
                  {
                    selectedRow.name && <h2 className="text-xl text-foreground py-4">{selectedRow.name}'s Films</h2>
                  }
                  <AttributesViewer 
                  inputAttributes={Object.entries(films).map(([key, value]) => ({
                    key,
                    value: value
                  }))}
                />
                </div>
              )
            }
          </div>
        </SheetContent>
      </Sheet>       
    </div>
   
  )
}
