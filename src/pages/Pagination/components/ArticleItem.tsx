interface ArticleItemProps {
  title: string;
  createdAt: string;
}

const ArticleItem = ({ title, createdAt }: ArticleItemProps) => {
  return (
    <div className='border-b border-gray-100 px-8 py-4'>
      <div className='flex items-center justify-between font-medium'>
        <div className='flex flex-col gap-2'>
          <span className='overflow-hidden truncate text-ellipsis whitespace-nowrap'>
            {title}
          </span>
          <span className='text-xs text-gray-400'>{createdAt}</span>
        </div>
      </div>
    </div>
  );
};

export default ArticleItem;
