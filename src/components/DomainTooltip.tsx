import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const DomainDisplay = ({ domain }: { domain: string }) => {
  const truncateDomain = (domain: string) => {
    if (domain.length > 25) {
      return `${domain.substring(0, 22)}...`;
    }
    return domain;
  };

  return (
    <div className='flex items-center gap-2'>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className='max-w-xs cursor-default rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-800'>
              {truncateDomain(domain)}
            </div>
          </TooltipTrigger>
          {domain.length > 25 && (
            <TooltipContent className='z-10 bg-white p-2'>
              {domain}
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default DomainDisplay;
