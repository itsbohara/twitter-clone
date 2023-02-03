import { BiError } from 'react-icons/bi';

type ErrorProps = {
  message?: string;
};

export function Error({ message }: ErrorProps): JSX.Element {
  return (
    <div
      className='flex flex-col items-center justify-center 
                 gap-2 py-5 px-3 text-slate-600 dark:text-slate-500'
    >
      <BiError className='h-10 w-10' />
      <p>{message ?? 'Something went wrong. Try Loading.'}</p>
    </div>
  );
}
