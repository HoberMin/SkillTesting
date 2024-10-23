import { useState } from 'react';

import Overlay from './Overlay';
import TutorialCard from './components/TutorialCard';
import CRUD from './components/dummy/CRUD';
import ExitUrl from './components/dummy/FlexNotDomainBox';
import ServerInputHttp from './components/dummy/ServerInputHttp';
import ServerInputHttps from './components/dummy/ServerInputHttps';
import TutorialLayout from './components/dummy/TutorialLayout';
import TutorialLayoutAddedDomain from './components/dummy/TutorialLayoutAddedDomain';

const TutorialPage = () => {
  const [currentStep, setCurrentStep] = useState(0);

  if (currentStep === 0)
    return (
      <>
        <Overlay />
        <TutorialLayout currentStep={currentStep}>
          <TutorialCard
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            className='right-12 top-24'
          />
          <ExitUrl />
        </TutorialLayout>
      </>
    );
  if (currentStep === 1)
    return (
      <>
        <Overlay />
        <TutorialLayout currentStep={currentStep}>
          <TutorialCard
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            className='left-[30%] top-[20%]'
          />
          <ServerInputHttp />
        </TutorialLayout>
      </>
    );
  else if (currentStep === 2)
    return (
      <>
        <Overlay />
        <TutorialLayout currentStep={currentStep}>
          <TutorialCard
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            className='right-[20%] top-[24%]'
          />
          <ServerInputHttps />
        </TutorialLayout>
      </>
    );
  else if (currentStep === 3)
    return (
      <>
        <Overlay />
        <TutorialLayoutAddedDomain currentStep={currentStep}>
          <TutorialCard
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            className='right-12 top-24'
          />
        </TutorialLayoutAddedDomain>
      </>
    );
  else if (currentStep === 4)
    return (
      <>
        <Overlay />
        <TutorialLayoutAddedDomain currentStep={currentStep}>
          <TutorialCard
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            className='right-40 top-24'
          />
          <CRUD currentStep={currentStep} />
        </TutorialLayoutAddedDomain>
      </>
    );
  else if (currentStep === 5)
    return (
      <>
        <Overlay />
        <TutorialLayoutAddedDomain currentStep={currentStep}>
          <TutorialCard
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            className='left-[42%] top-8'
          />
          <CRUD currentStep={currentStep} />
        </TutorialLayoutAddedDomain>
      </>
    );
  else if (currentStep === 6)
    return (
      <>
        <Overlay />
        <TutorialLayoutAddedDomain currentStep={currentStep}>
          <TutorialCard
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            className='right-10 top-24'
          />
          <CRUD currentStep={currentStep} />
        </TutorialLayoutAddedDomain>
      </>
    );
  return (
    <>
      <Overlay />
      <TutorialLayoutAddedDomain currentStep={currentStep}>
        <TutorialCard
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          className='bottom-24 left-20'
        />
        <CRUD currentStep={currentStep} />
      </TutorialLayoutAddedDomain>
    </>
  );
};

export default TutorialPage;
