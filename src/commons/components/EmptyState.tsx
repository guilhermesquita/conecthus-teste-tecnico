import React from 'react';
import ManagerImages from '../images/ManagerImages';

interface EmptyStateProps {
    title: string;
    description: string | React.ReactNode;
    showImage?: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
    title,
    description,
    showImage = true
}) => {
    return (
        <div className="info-card flex flex-col items-center justify-center py-20 w-full h-full animate-in fade-in zoom-in duration-500">
            {showImage && (
                <div className="relative mb-8">
                    <img src={ManagerImages.notFoundImage}
                        height={'225.47px'}
                        width={'226.67px'}
                        alt="Empty State" />
                </div>
            )}

            <h3 className="text-[28px] font-bold text-[#0F2621] mb-[5px]">
                {title}
            </h3>
            <p className="text-[18px] text-[#0F2621]/70 text-center max-w-[500px] leading-relaxed">
                {description}
            </p>
        </div>
    );
};
