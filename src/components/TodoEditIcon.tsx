const TodoEditIcon = () => (
  // 각 아이콘에 클릭이벤트 달아주면 되는데, 수정할거면 수정하는 ui도 추가해줘야하는데 복잡할 것 같은데
  <div className='flex items-center gap-2'>
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='cursor-pointer'
      viewBox='0 0 24 24'
      fill='#000000'
      width={24}
      height={24}
      onClick={() => console.log(1)}
    >
      <path d='M9.24264 18.9967H21V20.9967H3V16.754L12.8995 6.85453L17.1421 11.0972L9.24264 18.9967ZM14.3137 5.44032L16.435 3.319C16.8256 2.92848 17.4587 2.92848 17.8492 3.319L20.6777 6.14743C21.0682 6.53795 21.0682 7.17112 20.6777 7.56164L18.5563 9.68296L14.3137 5.44032Z'></path>
    </svg>
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='cursor-pointer'
      viewBox='0 0 24 24'
      fill='#000000'
      width={24}
      height={24}
      onClick={() => console.log(2)}
    >
      <path d='M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z'></path>
    </svg>
  </div>
);

export default TodoEditIcon;
