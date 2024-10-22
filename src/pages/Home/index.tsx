import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('tutorial_end') !== 'end') navigate('/tutorial');
  }, []);

  return (
    <main className='flex h-full w-full flex-col justify-center'>
      <div className='mx-auto flex flex-col'>
        <span className='text-4xl font-bold'>SSAFY SANDBOX</span>
        <br />
        <p className='text-gray-500'>
          SSAFY Sandbox는 SSAFY 12기 서울 15반에서 백엔드 개발자를 희망하는
          <br />
          친구들이 협업 경험을 보다 쉽게, 그리고 효과적으로 쌓을 수 있도록 하기
          위해
          <br />
          시작되었습니다.
          <br />
          <br />
          이 서비스를 통해 백엔드 개발자들이 자신이 만든 기능을 직접 확인하고,
          <br />
          프론트엔드 개발자들과의 협업 과정에서 겪는 소통의 어려움을 줄이는 것을
          <br />
          목표로 하고 있습니다.
          <br />
          <br />
          UI를 통해 실시간으로 결과를 확인하며, 혼자서만 개발하는 것이 아니라
          <br />
          팀의 일원으로 함께 작업하는 경험을 쌓을 수 있기를 기대합니다.
        </p>
      </div>
    </main>
  );
};

export default Home;
