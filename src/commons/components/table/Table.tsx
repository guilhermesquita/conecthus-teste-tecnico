import React from 'react';
import { motion } from 'framer-motion';

interface Column<T> {
    header: string;
    className?: string;
    render: (item: T) => React.ReactNode;
    align?: 'left' | 'center' | 'right';
}

interface TableProps<T> {
    columns: Column<T>[];
    data: T[];
    keyExtractor: (item: T) => string | number;
    rowGap?: number;
}

export function Table<T>({ columns, data, keyExtractor, rowGap = 16 }: TableProps<T>) {
    return (
        <div className="flex flex-col">
            <div className="bg-sidebar rounded-lg px-6 py-4 flex items-center shadow-lg">
                {columns.map((column, index) => (
                    <div
                        key={index}
                        className={`text-white text-[16px] font-medium ${column.className || 'flex-1'} ${column.align === 'right'
                            ? 'flex justify-end pr-[108px]'
                            : column.align === 'center'
                                ? 'text-center'
                                : 'text-left'
                            }`}
                    >
                        {column.header}
                    </div>
                ))}
            </div>

            <div className="flex flex-col" style={{ gap: rowGap, marginTop: rowGap }}>
                {data.map((item) => (
                    <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={keyExtractor(item)}
                        className="bg-white border border-gray-100 rounded-lg px-6 py-[17px] flex items-center shadow-sm hover:shadow-md transition-all cursor-default"
                    >
                        {columns.map((column, index) => (
                            <div
                                key={index}
                                className={`text-sidebar text-[16px] font-medium ${column.className || 'flex-1'} ${column.align === 'right'
                                    ? 'flex justify-end pr-[32px]'
                                    : column.align === 'center'
                                        ? 'text-center'
                                        : 'text-left'
                                    }`}
                            >
                                {column.render(item)}
                            </div>
                        ))}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}