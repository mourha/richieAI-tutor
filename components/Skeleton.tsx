
import React from 'react';

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '' }) => {
  return (
    <div className={`animate-pulse bg-indigo-50/50 rounded-lg ${className}`} />
  );
};

export const CardSkeleton: React.FC = () => (
  <div className="bg-white border-2 border-indigo-50 rounded-[32px] lg:rounded-[40px] p-6 lg:p-8 shadow-sm">
    <Skeleton className="w-14 h-14 rounded-2xl mb-6" />
    <Skeleton className="w-20 h-4 mb-2" />
    <Skeleton className="w-3/4 h-8 mb-3" />
    <Skeleton className="w-full h-4 mb-6" />
    <div className="pt-4 border-t border-indigo-50 flex justify-between items-center">
      <Skeleton className="w-24 h-4" />
      <Skeleton className="w-10 h-10 rounded-2xl" />
    </div>
  </div>
);

export const TableRowSkeleton: React.FC = () => (
  <div className="flex items-center p-4 space-x-4">
    <Skeleton className="w-12 h-12 lg:w-16 lg:h-16 rounded-xl lg:rounded-2xl" />
    <div className="flex-1 space-y-2">
      <Skeleton className="w-1/3 h-4" />
      <Skeleton className="w-1/4 h-3" />
    </div>
    <div className="space-y-2">
      <Skeleton className="w-16 h-3" />
      <Skeleton className="w-12 h-3" />
    </div>
  </div>
);
