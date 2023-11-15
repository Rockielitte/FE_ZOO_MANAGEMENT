// @flow
import useQueryCustom from '@/hooks/useQueryCustom';
import Error from '@/pages/Error';
import { User, food } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import * as React from 'react';
import { useRouteLoaderData } from 'react-router-dom';
import FoodTable from './componemts/FoodTable';
import LoadingScreen from '@/components/Loading';
import GridFood from './componemts/GridFood';

export default function Foods() {
    const { data } = useRouteLoaderData('dashboard') as { data: User }

    const columnsFood: ColumnDef<food>[] = [
        {
            accessorKey: 'id',
            header: 'ID',
            cell: ({ row }) => <span>{parseInt(row.id) + 1}</span>
        },
        {
            accessorKey: 'name',
            header: 'Name',
            cell: ({ row }) => (
                <div className='flex items-center space-x-2 '>
                    <span>{row.getValue('name')}</span>
                </div>
            )
        },
        {
            accessorKey: 'type',
            header: 'Type',
            cell: ({ row }) => (
                <div className='flex items-center space-x-2 '>
                    <span>{row.getValue('type')}</span>
                </div>
            )
        },
        {
            accessorKey: 'unit',
            header: 'Unit',
            cell: ({ row }) => (
                <div className='flex items-center space-x-2 '>
                    <span>{row.getValue('unit')}</span>
                </div>
            )
        },
        {
            accessorKey: 'description',
            header: 'Description',
            cell: ({ row }) => <span>{row.getValue('description')}</span>
        },
        {
            accessorKey: 'image',
            header: 'Image',
            cell: ({ row }) => <span>{row.getValue('image')}</span>
        }
    ]
    // const food_data = useQueryCustom({
    //     query: '/foods/',
    //     queryKey: ['foods'],
    //     data: {} as food
    // })

    const food_data = [
        {
            id: 1,
            name: "Beef",
            type: "Meat",
            unit: "kg",
            description: "Delicious and tender meat from cattle.",
            image: "https://example.com/beef.jpg"
        },
        {
            id: 2,
            name: "Salmon",
            type: "Fish",
            unit: "kg",
            description: "A popular fatty fish with a rich flavor and high nutritional value.",
            image: "https://example.com/salmon.jpg"
        },
        {
            id: 3,
            name: "Broccoli",
            type: "Vegetable",
            unit: "bunch",
            description: "Nutritious green vegetable with a distinct flavor and high fiber content.",
            image: "https://example.com/broccoli.jpg"
        },
        {
            id: 4,
            name: "Pasta",
            type: "Grain",
            unit: "g",
            description: "Versatile staple food made from durum wheat flour.",
            image: "https://example.com/pasta.jpg"
        },
        {
            id: 5,
            name: "Apple",
            type: "Fruit",
            unit: "piece",
            description: "Crisp and juicy fruit with a sweet-tart flavor.",
            image: "https://example.com/apple.jpg"
        },
        {
            id: 6,
            name: "Yogurt",
            type: "Dairy",
            unit: "g",
            description: "A creamy and nutritious dairy product made from fermented milk.",
            image: "https://example.com/yogurt.jpg"
        },
        {
            id: 7,
            name: "Spinach",
            type: "Leafy Green",
            unit: "bunch",
            description: "Dark green leafy vegetable packed with vitamins and minerals.",
            image: "https://example.com/spinach.jpg"
        },
        {
            id: 8,
            name: "Chicken",
            type: "Poultry",
            unit: "kg",
            description: "Lean meat from domesticated birds, commonly consumed worldwide.",
            image: "https://example.com/chicken.jpg"
        },
        {
            id: 9,
            name: "Brown Rice",
            type: "Grain",
            unit: "g",
            description: "Whole grain rice with a nutty flavor and high fiber content.",
            image: "https://example.com/rice.jpg"
        }

    ]
    return (
        <div className='w-full p-2  py-2 h-full shadow-2xl border rounded-md '>
            {/* {food_data.isError ? (
                <Error />
            ) : !food_data.isLoading ? (
                <FoodTable
                    columns={columnsFood}
                    data={!food_data.data ? [] : (food_data.data as food[])}
                    GridBox={GridFood}
                    user={data}
                />
            ) : (
                <LoadingScreen></LoadingScreen>
            )} */}
            <div className='w-full h-full'>{<GridFood data={food_data} user={data} />}</div>
        </div>
    );
};